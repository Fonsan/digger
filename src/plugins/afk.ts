import {Plugin, PluginConfig} from './plugin'
import {Instance} from '../instance'
export interface AFKConfig extends PluginConfig {
  timeout: number;
  graceTime: number;
  hotTimeout: number;
  kickAFKSpectatorWhenFull: boolean;
}
export class AFK extends Plugin<AFKConfig> {
  static defaultConfig = {
    timeout: 60000,
    graceTime: 10000,
    hotTimeout: 3000,
    kickAFKSpectatorWhenFull: true,
    ...Plugin.defaultConfig
  }
  private readonly playingPlayers = new Map<number, number>();
  private readonly hotPlayers = new Map<number, number>();
  private readonly kickCandidates = new Map<number, Date>();
  private timeout: number;
  private graceTime: number;
  private hotTimeout: number;
  private warnTimeout: number;

  constructor(instance: Instance, config: AFKConfig) {
    super(instance, config)
    this.timeout = config.timeout;
    this.graceTime = config.graceTime;
    this.hotTimeout = config.hotTimeout;
    this.warnTimeout = this.timeout - this.graceTime;
  }

  public activate() {
    this.on('playerJoin', this.handleMotd)
    if (this.config.kickAFKSpectatorWhenFull) {
      this.on('playerJoin', this.purgeInactiveSpectators)
    }
    this.on('playerTeamChange', this.handleTeamChange)
    this.on('playerActivity', this.activatePlayer)
    this.on('playerLeave', this.handleLeave)
  }

  private handleMotd = ({detail: player}: CustomEvent<WLJoiningPlayer>):void => {
    const motd = `AFK detection loaded, players are moved to spectators after ${this.timeout / 1000} seconds of inactivity`
    this.instance.notify(motd, player.id)
  }

  private handleTeamChange = ({detail: {player, byPlayer}}: CustomEvent<PlayerChange>):void => {
    if (player.team == Instance.spectatorTeam) {
      this.clearPlayerTimeout(player.id)
    } else {
      this.kickCandidates.delete(player.id)
      this.resetPlayerTimeout(player.id)
    }
  }

  private handleLeave = ({detail: player}:CustomEvent<WLPlayer>) => {
    this.kickCandidates.delete(player.id)
    this.clearPlayerTimeout(player.id)
  }

  private activatePlayer = ({detail: player}:CustomEvent<WLPlayer>):void => {
    if (!this.hotPlayers.get(player.id)) {
      this.hotPlayers.set(player.id, window.setTimeout(() => this.hotPlayers.delete(player.id), this.hotTimeout))
      if (this.playingPlayers.get(player.id)) {
        this.resetPlayerTimeout(player.id)
      }
    }
  }

  private resetPlayerTimeout(playerId:number):void {
    this.clearPlayerTimeout(playerId)
    this.playingPlayers.set(playerId, window.setTimeout(() => this.evictPlayer(playerId), this.warnTimeout))
  }

  private clearPlayerTimeout(playerId: number):void {
    const timeout = this.playingPlayers.get(playerId)
    if (timeout) {
      clearTimeout(timeout)
    }
    this.playingPlayers.delete(playerId)
  }

  private evictPlayer(playerId: number): void {
    const message = `You will be moved to spectators due too inactivity in ${this.graceTime / 1000} seconds, please move`
    this.instance.notify(message, playerId)
    const currentTimeout = this.playingPlayers.get(playerId)
    setTimeout(() => {
      const player = this.instance.room.getPlayer(playerId)
      if (player && player.team != Instance.spectatorTeam && this.playingPlayers.get(playerId) == currentTimeout) {
        this.instance.softNotify(`Moving ${player.name} to spectators due to inactivity`)
        const reason = `You were afk for more than ${this.timeout / 1000} seconds, moving you to spectators`
        this.instance.error(reason, playerId)
        this.instance.room.setPlayerTeam(playerId, 0)
        this.kickCandidates.set(playerId, new Date())
      }
    }, this.graceTime)
  }

  private purgeInactiveSpectators = ({detail: player}: CustomEvent<WLJoiningPlayer>):void => {
    const list = this.instance.room.getPlayerList();
    if (list.length >= this.instance.initOptions.maxPlayers) {
      const oldestPlayerPair = Array.from(this.kickCandidates).reduce((acc, el) => acc[1] < el[1] ? acc : el)
      if (oldestPlayerPair) {
        const oldestPlayer = this.instance.room.getPlayer(oldestPlayerPair[0]) as WLPlayer;
        this.instance.softNotify(`Server full, kicking oldest afk spectator ${oldestPlayer.name}`)
        this.instance.room.kickPlayer(oldestPlayerPair[0], 'Server full, kicking oldest afk spectator', false)
      }
    }
  }
}
