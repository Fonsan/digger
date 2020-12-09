import { DeepNonNullable } from "ts-essentials"
import merge from "ts-deepmerge";
import { Election } from './election'
import { Plugin, PluginConfig } from './plugins/plugin'
import { Command, Commands, CommandDefinition, CommandRegistry } from './command_registry'
import { LevelManager } from './level_manager'
import { LevelIndex } from './level_index'
import { DefaultPools } from './default_pools'

import { Admin, AdminConfig } from './plugins/admin'
import { AFK, AFKConfig } from './plugins/afk'
import { Doubler, DoublerConfig } from './plugins/doubler'
import { Info, InfoConfig } from './plugins/info'
import { Connection, ConnectionConfig } from './plugins/connection'
import { List } from './plugins/list'
import { OnePlayer } from './plugins/one_player'
import { NextMap } from './plugins/next_map'
import { Scores } from './plugins/scores'
import { SearchLevels, SearchLevelsConfig } from './plugins/search_levels'
import { Slurper, SlurperConfig} from './plugins/slurper'
import { VoteMap } from './plugins/vote_map'
import { VoteMute, VoteMuteConfig} from './plugins/vote_mute'
import { VoteKick, VoteKickConfig} from './plugins/vote_kick'
import { VoteRestartMap } from './plugins/vote_restart_map'
import { VoteSkipMap } from './plugins/vote_skip_map'

export interface Config {
  configVersion: number,
  voteTime: number,
  voteTimeout: number,
  levelBaseURL: string,
  levels: string[],
  pool?: string[]
  onGameEnd2?: Function,
  plugins: {
    admin: AdminConfig,
    afk: AFKConfig,
    doubler: DoublerConfig,
    info: InfoConfig,
    connection: ConnectionConfig,
    list: PluginConfig,
    nextMap: PluginConfig,
    onePlayer: PluginConfig,
    searchLevels: SearchLevelsConfig,
    scores: PluginConfig,
    slurper: SlurperConfig,
    voteMap: PluginConfig,
    voteMutePlayer: VoteMuteConfig,
    voteKickPlayer: VoteKickConfig,
    voteRestartMap: PluginConfig,
    voteSkipMap: PluginConfig,
  }
}
enum EventEnum {
  captcha,
  changePlayerName,
  gameEnd,
  gameEnd2,
  gameStart,
  gameTick,
  loadLevel,
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
  public room: WLMinimalRoom;
  public readonly serverId: string;
  public readonly instanceId: string;
  public gameId!: string;
  public gameStart!: Date;
  public commandRegistry: CommandRegistry;
  public levelManager: LevelManager;
  public levelIndex: LevelIndex;
  public readonly commands = new Map<string, Function>()
  public readonly playerIdToAuth = new Map<number, string>()
  public readonly mutedPlayers = new Map<string, MuteConfig>()
  public readonly activePlayers = new Map<number, boolean>()
  public readonly electionTimeouts = new Map<string, number>()
  public readonly plugins = new Map<string, Plugin<any>>()

  public static configVersion = 1;
  public static spectatorTeam = 0;
  public static motd = `Digger loaded, write !h or !help in chat for commands`
  private static defaultConfig: Config = {
    configVersion: Instance.configVersion,
    voteTime: 30000,
    voteTimeout: 45000,
    levels: [],
    levelBaseURL: "https://webliero.gitlab.io/webliero-maps",
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
      doubler: {
        enabled: true,
        threshold: 8
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
      nextMap: {enabled: true},
      onePlayer: {enabled: true},
      searchLevels: {
        enabled: true,
        resultSize: 4
      },
      scores: {enabled: true},
      slurper: {
        enabled: false,
        events: [
          'captcha',
          'changePlayerName',
          'gameEnd',
          'gameEnd2',
          'gameStart',
          'loadLevel',
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
      voteMap: { enabled: true },
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
    this.initialSettings = initialSettings;
    if (config.configVersion != Instance.configVersion) {
      throw `Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger`
    }
    this.config = merge(Instance.defaultConfig, config)
    if (!isStrictInitOptions(initOptions)) {
      throw 'roomName, maxPlayers, public and token must be set'
    }
    this.initOptions = initOptions;
    window.digger = this;
    this.commandRegistry = new CommandRegistry(this);
    this.levelIndex = new LevelIndex(this.config.levelBaseURL, this.config.levels);
    this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase()
    this.instanceId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
    this.eventTarget = (this as CustomEventTarget);
    this.setNewGame();
    if (config.levels.length == 0) {
      throw 'You must set levels to await (await fetch("https://webliero.gitlab.io/webliero-maps/pools/index.json").json()'
    }
    if (initialSettings.levelPool) {
      const pool = DefaultPools.get(initialSettings.levelPool)
      if (!pool) {
        throw `levelPool not found: ${initialSettings.levelPool}`
      }
      this.levelManager = new LevelManager(this.levelIndex, pool);
    } else {
      if (!this.config.pool) {
        throw 'Missing levelManager pool in digger config'
      }
      this.levelManager = new LevelManager(this.levelIndex, this.config.pool);
    }
    this.on('gameStart', this.setNewGame)
    this.on('playerJoin', ({detail: player}:CustomEvent<WLJoiningPlayer>) => this.playerIdToAuth.set(player.id, player.auth))
    this.on('playerLeave', ({detail: player}) => this.playerIdToAuth.delete(player.id))
    this.on('playerChat', this.handlePlayerChat);
    this.on('playerTeamChange', this.handleActive);
    this.on('roomLink', ({detail: url}) => this.log(`Started: ${url}`))
    this.on('captcha', () => this.log('Failed to start: Faulty token'))
    this.on('playerJoin', ({detail: player}: CustomEvent<WLJoiningPlayer>) => this.notify(Instance.motd, player.id))
    this.onCommand(Command.Help, this.handleHelp)
    this.onCommand(Command.StopTheCount, this.handleStopTheCount)
    this.room = {} as WLMinimalRoom;
    this.fullRoom = {} as WLRoom;
  }

  public start() {
    this.fullRoom = window.WLInit(this.initOptions);
    this.room = this.fullRoom as WLMinimalRoom;
    this.room.setSettings(this.initialSettings);
    this.registerRoomCallbacks(this.fullRoom)
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

  public emit(name: EventName, detail?: any) {
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

  public onCommand(command: Command, callback: ((player: WLPlayer, message: string) => void) ):Function {
    return this.commandRegistry.on(command, callback)
  }

  public findPlayer(token: string): WLPlayer | undefined {
    const players = this.room.getPlayerList()
    const playerById = players.find(player => this.shortId(player.id).toString() == token)
    return playerById || players.find(player => player.name == token)
  }

  public findLevel(token: string): string | undefined {
    if (this.levelIndex.levels.indexOf(token) != -1) {
      return token;
    } else if (token.match(/^\d+$/)) {
      const index = parseInt(token, 10)
      return this.levelIndex.levels[index]
    } else {
      const firstMatch = this.levelIndex.search(token)[0]
      if (firstMatch) {
        return firstMatch.full
      }
    }
  }

  public setPool(pool: string[], baseURL?:string) {
    this.levelManager = new LevelManager(this.levelIndex, pool)
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
          case 'doubler':
            this.registerPlugin(
              name,
              new Doubler(this, this.config.plugins.doubler)
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
          case 'nextMap':
            this.registerPlugin(
              name,
              new NextMap(this, this.config.plugins.nextMap)
            )
            break;
          case 'searchLevels':
            this.registerPlugin(
              name,
              new SearchLevels(this, this.config.plugins.searchLevels)
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
          case 'voteMap':
            this.registerPlugin(
              name,
              new VoteMap(this, this.config.plugins.voteMap)
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

  private handleHelp = (player: WLPlayer, message:string) => {
    this.notify("Available commands:", player.id);
    Array.from(this.commandRegistry.activeCommands.keys()).sort().forEach((command) => {
      const definition = Commands.get(command) as CommandDefinition
      if (!definition.hidden && (!definition.admin || player.admin)) {
        if(definition.description) {
          this.notify(`${command}, ${definition.verboseCommand} ${definition.description}`, player.id)
        }
      }
    })
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
      this.commandRegistry.handleCommand(player, message)
      event.preventDefault()
    }
    const auth = this.playerIdToAuth.get(player.id) as string;
    const muteConfig = this.mutedPlayers.get(auth)
    if (muteConfig) {
      const minutes = Math.round((muteConfig.time.getTime() - Date.now()) / 1000 / 60)
      this.error(`You have been muted for ${minutes} minutes more`, player.id);
      event.preventDefault()
    }
  }

  private async handleGameEnd2() {
    const next = this.levelManager.peekName();
    try {
      const level = await this.levelManager.pop()
      this.emit('loadLevel', level.name);
      this.room.loadLev(level.name, level.data);
    } catch(e) {
      this.error(`Failed to load ${next}, restarting current level, next level will be: ${this.levelManager.peekName()}`)
      this.room.restartGame()
    }
  }

  private setNewGame = () => {
    this.gameStart = new Date();
    this.gameId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
  }

  private handleStopTheCount(player: WLPlayer, message:string):void {
    if (this.currentElection) {
      this.notify(`${player.name} has requested to stop the count, we of course ignore it and the counting of votes will continue`)
    } else {
      this.notify(`${player.name} has requested to stop the count, the vote is over and we ignore it`)
    }
  }

  private registerRoomCallbacks(room: WLRoom):void {
    room.onPlayerJoin = (player : WLJoiningPlayer) => this.emit('playerJoin', player)
    room.onPlayerLeave = (player : WLPlayer) => this.emit('playerLeave', player)
    room.onPlayerKicked = (
        player : WLPlayer, reason : string, ban : boolean, byPlayer : WLPlayer
      ) => this.emit('playerKicked', {player, reason, ban, byPlayer})
    room.onPlayerChat = (player : WLPlayer, message : string) => this.emit('playerChat', {player, message})
    room.onPlayerTeamChange = (player : WLPlayer, byPlayer : WLPlayer) => this.emit('playerTeamChange', {player, byPlayer})
    room.onPlayerAdminChange = (player : WLPlayer, byPlayer : WLPlayer) => this.emit('playerAdminChange', {player, byPlayer})
    room.onGameTick = () => this.emit('gameTick')
    room.onPlayerActivity = (player : WLPlayer) => this.emit('playerActivity', player)
    room.onRoomLink = (link: string) => this.emit('roomLink', link)
    room.onGameStart = () => this.emit('gameStart', room.getSettings())
    room.onGameEnd = () => this.emit('gameEnd')
    const originalGameEnd2 = room.onGameEnd2;
    room.onGameEnd2 = () => {
      this.handleGameEnd2().then(() => this.emit('gameEnd2'))
    }
    room.onPlayerKilled = (killed : WLPlayer, killer : WLPlayer) => this.emit('playerKilled', {killed, killer})
    room.onCaptcha = () => this.emit('captcha')
  }

  private generateId():string {
     return `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`
  }
}

