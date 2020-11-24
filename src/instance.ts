import { DeepNonNullable } from "ts-essentials"
import merge from "ts-deepmerge";
import { Election } from './election'
import { Plugin, PluginConfig } from './plugins/plugin'

import { Admin, AdminConfig } from './plugins/admin'
import { AFK, AFKConfig } from './plugins/afk'
import { Info, InfoConfig } from './plugins/info'
import { Connection, ConnectionConfig } from './plugins/connection'
import { List } from './plugins/list'
import { OnePlayer } from './plugins/one_player'
import { Scores } from './plugins/scores'
import { Slurper, SlurperConfig} from './plugins/slurper'
import { VoteMute, VoteMuteConfig} from './plugins/vote_mute'
import { VoteKick, VoteKickConfig} from './plugins/vote_kick'
import { VoteRestartMap } from './plugins/vote_restart_map'
import { VoteSkipMap } from './plugins/vote_skip_map'

export interface Config {
  configVersion: string;
  voteTime: number;
  voteTimeout: number;
  plugins: {
    admin: AdminConfig,
    afk: AFKConfig,
    info: InfoConfig,
    connection: ConnectionConfig,
    list: PluginConfig,
    onePlayer: PluginConfig,
    scores: PluginConfig,
    slurper: SlurperConfig,
    voteMutePlayer: VoteMuteConfig,
    voteKickPlayer: VoteKickConfig,
    voteRestartMap: PluginConfig,
    voteSkipMap: PluginConfig,
  };
}

enum EventEnum {
  captcha,
  changePlayerName,
  gameEnd,
  gameEnd2,
  gameStart,
  gameTick,
  newPlayer,
  playerActive,
  playerActivity,
  playerAdminChange,
  playerChat,
  playerInactive,
  playerJoin,
  playerKicked,
  playerKilled,
  playerLeave,
  playerScores,
  playerTeamChange,
  roomLink,
  teamScores,
}
export type EventName = keyof typeof EventEnum;
interface MuteConfig {
  time: Date,
  timeout: number
}
interface StrictInitOptions extends WLInitOptions {
  roomName: string
  maxPlayers: number
  public: boolean
  token: string
}
function isStrictInitOptions(options: WLInitOptions): options is StrictInitOptions {
  const so = (options as StrictInitOptions)
  return !!so.roomName && !!so.maxPlayers && so.public !== undefined && !!so.token;
}
export class Instance extends EventTarget {
  window: Window;
  fullRoom: WLRoom;
  initialSettings: WLGameSettings;
  config: Config;
  initOptions: StrictInitOptions;
  eventTarget: CustomEventTarget;
  currentElection?: Election;
  public readonly room: WLMinimalRoom;
  public readonly serverId: string;
  public readonly instanceId: string;
  public gameId!: string;
  public gameStartTime!: Date;
  public readonly commands = new Map<string, Function>()
  public readonly commandDescriptions = new Map<string, string>()
  public readonly playerIdToAuth = new Map<number, string>()
  public readonly mutedPlayers = new Map<string, MuteConfig>()
  public readonly activePlayers = new Map<number, boolean>()
  public readonly electionTimeouts = new Map<string, number>()
  public readonly plugins = new Map<string, Plugin<any>>()

  public static configVersion = '0.1.0';
  public static spectatorTeam = 0;
  public static motd = `Digger ${Instance.configVersion} loaded, write !h or !help in chat for commands`
  private static defaultConfig: Config = {
    configVersion: Instance.configVersion,
    voteTime: 30000,
    voteTimeout: 45000,
    plugins: {
      admin: {
        enabled: true,
        auths: [],
        muteDuration: 15 * 60 * 1000,
        kickDuration: 15 * 60 * 1000
      },
      afk: {
        enabled: true,
        timeout: 60000,
        graceTime: 10000,
        hotTimeout: 3000,
        kickAFKSpectatorWhenFull: true
      },
      info: {
        enabled: true,
        announceNameChange: true,
        annouceNamesCount: 4
      },
      connection: {
        enabled: true,
        maxConnectionsPerIP: 3
      },
      list: {enabled: true},
      onePlayer: {enabled: true},
      scores: {enabled: true},
      slurper: {
        enabled: true,
        events: [
          'captcha',
          'changePlayerName',
          'gameEnd',
          'gameEnd2',
          'gameStart',
          // 'gameTick', // Disabled for performance reasons
          'newPlayer',
          'playerActive',
          // 'playerActivity', // Disabled for performance reasons
          'playerAdminChange',
          'playerChat',
          'playerInactive',
          'playerJoin',
          'playerKicked',
          'playerKilled',
          'playerLeave',
          'playerScores',
          'playerTeamChange',
          'roomLink',
          'teamScores',
        ]
      },
      voteMutePlayer: {
        enabled: true,
        muteDuration: 15 * 60 * 1000
      },
      voteKickPlayer: {
        enabled: true,
        kickDuration: 15 * 60 * 1000
      },
      voteRestartMap: {enabled: true},
      voteSkipMap: {enabled: true}
    }
  }

  constructor(window: Window, initOptions: WLInitOptions, initialSettings: WLGameSettings, config: DeepNonNullable<Config>) {
    super();
    this.window = window
    this.config = config;
    this.initialSettings = initialSettings;
    this.config = merge(Instance.defaultConfig, config)
    if (!isStrictInitOptions(initOptions)) {
      throw 'roomName, maxPlayers, public and token must be set'
    }
    if (this.config.configVersion != Instance.configVersion) {
      throw `Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger`
    }
    this.initOptions = initOptions;
    this.validateInitOptions()
    this.fullRoom = window.WLInit(initOptions);
    this.room = this.fullRoom as WLMinimalRoom;
    this.room.setSettings(initialSettings);
    this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase()
    this.instanceId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
    this.setNewGame();
    this.eventTarget = (this as CustomEventTarget);
    this.registerRoomCallbacks()
    this.on('gameStart', (e) => { this.setNewGame() })
    this.on('playerJoin', ({detail: player}:CustomEvent<WLJoiningPlayer>) => this.playerIdToAuth.set(player.id, player.auth))
    this.on('playerLeave', ({detail: player}) => this.playerIdToAuth.delete(player.id))
    this.on('playerChat', this.handlePlayerChat);
    this.on('playerTeamChange', this.handleActive);
    this.on('roomLink', ({detail: url}) => this.log(`Started: ${url}`))
    this.on('captcha', () => this.log('Failed to start: Faulty token'))
    this.on('playerJoin', ({detail: player}: CustomEvent<WLJoiningPlayer>) => this.notify(Instance.motd, player.id))
    this.registerCommand(['!h', '!help'], 'Display this help', this.handleHelp)
    this.registerCommand(['!stc', '!stopthecount'], 'Request to stop the count of a vote', this.handleStopTheCount)
    this.enablePlugins()
  }
  public log(...args: any[]):void  {
    console.log(...args.map(x => JSON.stringify(x)))
  }

  public on(name: EventName, listener: CustomEventListener):void {
    this.eventTarget.addEventListener(name, listener);
  }
  public once(name: EventName, listener: CustomEventListener):void {
    this.eventTarget.addEventListener(name, listener, { once: true });
  }
  public off(name: EventName, listener: CustomEventListener):void {
    this.eventTarget.removeEventListener(name, listener);
  }

  public emit(name: EventName, detail: any) {
    return this.eventTarget.dispatchEvent(
      new CustomEvent<any>(name, { detail, cancelable: true })
    )
  }

  public notify(message: string, target?: number) {
    this.room.sendAnnouncement(message, target, 0xFFFF00, "bold", 2)
  }

  public softNotify(message: string, target?: number) {
    this.room.sendAnnouncement(message, target, 0xDDDDDD)
  }

  public error(message: string, target?: number) {
    this.room.sendAnnouncement(message, target, 0xFF0000, "bold", 2)
  }

  public registerCommand(names: string[], description: string, callback: ((player: WLPlayer, message: string) => void) ):Function {
    this.commandDescriptions.set(names[0], [...names.map(name => name.padEnd(4, ' ')), description].join(" "))
    names.forEach(name => {
      if(name[0] != '!' || name.length < 2) {
        throw `${name} command not valid`
      }
      if(this.commands.get(name)) {
        throw `command already registered ${name}`
      }
      this.commands.set(name, callback)
    })
    return () => {
      this.commandDescriptions.delete(names[0])
      names.forEach(name => this.commands.delete(name))
    }
  }

  public findPlayer(token: string): WLPlayer | undefined {
    const players = this.room.getPlayerList()
    const playerById = players.find(player => this.shortId(player.id).toString() == token)
    return playerById || players.find(player => player.name == token)
  }

  public mute(playerId: number, duration: number):void {
    const minutes = Math.round(duration / 1000 / 60)
    this.error(`You have been muted for ${minutes} minutes`, playerId)
    const auth = this.playerIdToAuth.get(playerId) as string;
    this.mutedPlayers.set(auth, {
      time: new Date(Date.now() + duration),
      timeout: window.setTimeout(() => this.unMute(playerId), duration)
    })
  }

  public temporaryBan(player: WLPlayer, reason: string, duration: number): void {
    const minutes = Math.round(duration / 1000 / 60)
    this.room.kickPlayer(player.id, reason, true)
    this.notify(`${player.name} has been kicked for ${minutes} minutes`)
    setTimeout(() => this.room.clearBan(player.id), duration)
  }

  public unMute(playerId: number):void {
    this.error(`You have been unmuted`, playerId)
    const auth = this.playerIdToAuth.get(playerId) as string;
    this.mutedPlayers.delete(auth)
  }

  public clearMutes():void {
    this.mutedPlayers.clear()
  }

  public shortId(playerId: number): number {
    return playerId % 1000
  }

  public election(name:string, player: WLPlayer, callback: Function) {
    const auth = this.playerIdToAuth.get(player.id) as string;
    if (this.electionTimeouts.get(auth)) {
      this.error(`You may only start a vote once every ${this.config.voteTimeout / 1000} seconds`, player.id);
      return;
    }
    if (this.currentElection) {
      this.error("Another vote is already active, wait your turn", player.id);
      return;
    }
    this.electionTimeouts.set(
      auth,
      window.setTimeout(() => this.electionTimeouts.delete(auth), this.config.voteTimeout)
    )
    new Election(this, name, player, () => {
      this.currentElection = undefined;
      callback()
    })
  }

  private registerPlugin(name: string, plugin: Plugin<any>) {
    this.plugins.set(name, plugin);
    plugin.enable();
  }

  private enablePlugins():void {
    Object.entries(this.config.plugins).forEach(([name, pluginConfig]) => {
      if (pluginConfig.enabled) {
        switch(name) {
          case 'admin':
            this.registerPlugin(
              name,
              new Admin(this, this.config.plugins.admin)
            )
            break;
          case 'afk':
            this.registerPlugin(
              name,
              new AFK(this, this.config.plugins.afk)
            )
            break;
          case 'info':
            this.registerPlugin(
              name,
              new Info(this, this.config.plugins.info)
            )
            break;
          case 'connection':
            this.registerPlugin(
              name,
              new Connection(this, this.config.plugins.connection)
            )
            break;
          case 'list':
            this.registerPlugin(
              name,
              new List(this, this.config.plugins.list)
            )
            break;
          case 'onePlayer':
            this.registerPlugin(
              name,
              new OnePlayer(this, this.config.plugins.onePlayer)
            )
            break;
          case 'scores':
            this.registerPlugin(
              name,
              new Scores(this, this.config.plugins.scores)
            )
            break;
          case 'slurper':
            this.registerPlugin(
              name,
              new Slurper(this, this.config.plugins.slurper)
            )
            break;
          case 'voteMutePlayer':
            this.registerPlugin(
              name,
              new VoteMute(this, this.config.plugins.voteMutePlayer)
            )
            break;
          case 'voteKickPlayer':
            this.registerPlugin(
              name,
              new VoteKick(this, this.config.plugins.voteKickPlayer)
            )
            break;
          case 'voteRestartMap':
            this.registerPlugin(
              name,
              new VoteRestartMap(this, this.config.plugins.voteRestartMap)
            )
            break;
          case 'voteSkipMap':
            this.registerPlugin(
              name,
              new VoteSkipMap(this, this.config.plugins.voteSkipMap)
            )
            break;
        }
      }
    })
  }

  private handleHelp(player: WLPlayer, message:string) {
    this.notify("Available commands:", player.id);
    const commands = Array.from(this.commandDescriptions.values()).sort()
    commands.filter((command) => player.admin || !(command.substr(0,2) == '!a'))
      .forEach(command => this.notify(command, player.id))
  }

  private handleActive = ({detail: {player, byPlayer}}: CustomEvent<PlayerChange>) => {
    if (player.team == 0) {
      this.emit('playerInactive', player)
      this.activePlayers.delete(player.id)
    } else {
      if (!this.activePlayers.get(player.id)) {
        this.emit('playerActive', player)
        this.activePlayers.set(player.id, true)
      }
    }
  }

  private handlePlayerChat = (event: CustomEvent<PlayerChat>) => {
    let {player, message} = event.detail;
    message = message.trim();
    if(message[0] == '!') {
      const firstSpaceIndex = message.indexOf(' ');
      const commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
      const callback = this.commands.get(commandName)
      if (callback) {
        callback.apply(this, [player, message])
      } else {
        const response = `"${commandName}" not recognized command`
        this.room.sendAnnouncement(response, player.id, 0xFF0000, "bold", 2);
      }
      event.preventDefault()
    }
    const auth = this.playerIdToAuth.get(player.id) as string;
    const muteConfig = this.mutedPlayers.get(auth)
    if (muteConfig) {
      const minutes = Math.round((muteConfig.time.getTime() - Date.now()) / 1000 / 60)
      this.room.sendAnnouncement(`You are muted for ${minutes} minutes more`, player.id, 0xFF0000, "bold", 2);
      event.preventDefault()
    }
  }

  private setNewGame = () => {
    this.gameStartTime = new Date();
    this.gameId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
  }

  private handleStopTheCount(player: WLPlayer, message:string):void {
    if (this.currentElection) {
      this.notify(`${player.name} has requested to stop the count, we of course ignore it and the counting of votes will continue`)
    } else {
      this.notify(`${player.name} has requested to stop the count, the vote is over and we ignore it`)
    }
  }

  private registerRoomCallbacks():void {
    this.log(this.fullRoom)
    this.fullRoom.onPlayerJoin = (player : WLJoiningPlayer) => this.emit('playerJoin', player)
    this.fullRoom.onPlayerLeave = (player : WLPlayer) => this.emit('playerLeave', player)
    this.fullRoom.onPlayerKicked = (
        player : WLPlayer, reason : string, ban : boolean, byPlayer : WLPlayer
      ) => this.emit('playerKicked', {player, reason, ban, byPlayer})
    this.fullRoom.onPlayerChat = (player : WLPlayer, message : string) => this.emit('playerChat', {player, message})
    this.fullRoom.onPlayerTeamChange = (player : WLPlayer, byPlayer : WLPlayer) => this.emit('playerTeamChange', {player, byPlayer})
    this.fullRoom.onPlayerAdminChange = (player : WLPlayer, byPlayer : WLPlayer) => this.emit('playerAdminChange', {player, byPlayer})
    this.fullRoom.onGameTick = () => this.emit('gameTick', null)
    this.fullRoom.onPlayerActivity = (player : WLPlayer) => this.emit('playerActivity', player)
    this.fullRoom.onRoomLink = (link: string) => this.emit('roomLink', link)
    this.fullRoom.onGameStart = () => this.emit('gameStart', null)
    this.fullRoom.onGameEnd = () => this.emit('gameEnd', null)
    this.fullRoom.onGameEnd2 = () => this.emit('gameEnd2', null)
    this.fullRoom.onPlayerKilled = (killed : WLPlayer, killer : WLPlayer) => this.emit('playerKilled', {killed, killer})
    this.fullRoom.onCaptcha = () => this.emit('captcha', null)
  }

  private validateInitOptions() {
    if (!this.initOptions.roomName) {
      throw 'you must set a roomName'
    }
    if (!this.initOptions.maxPlayers) {
      throw 'you must set maxPlayers'
    }
  }

  private generateId():string {
     return `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
  }
}

