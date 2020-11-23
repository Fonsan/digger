import {Plugin, PluginConfig} from './plugin'
import {Instance} from '../instance'
export interface  AdminConfig extends PluginConfig {
  auths: string[];
  muteDuration: number;
  kickDuration: number;
}
export class Admin extends Plugin<AdminConfig> {
  auths: Set<string>;
  constructor(instance: Instance, config: any) {
    super(instance, config)
    this.auths = new Set(config.auths)
  }

  public enable() {
    this.on('playerJoin', this.handleJoin)
    this.registerCommand(['!a'], 'Admin: !a s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t', (player: WLPlayer, message: string) => {
      if (!player.admin) {
        this.instance.error('Not admin', player.id)
        return
      }
      const parts = message.replace(/ +/, ' ').split(' ')
      if (parts.length == 2) {
        switch(parts[1][0]) {
          case 's': this.instance.room.endGame();
          case 'r': this.instance.room.restartGame();
          case 'd': this.instance.error('Not yet implemented', player.id)
          default: return this.respondWithUsage(player.id);
        }
      } else if(parts.length >= 3) {
        const targetPlayer = this.instance.findPlayer(parts[2])
        if (!targetPlayer) {
          this.instance.notify(`Could not find targetPlayer: ${parts[2]}, use !list`, player.id)
          return;
        }
        switch(parts[2][0]) {
          case 'm': this.mute(player, targetPlayer)
          case 'u': this.unMute(player, targetPlayer)
          case 'k': this.instance.room.kickPlayer(targetPlayer.id, `You have been kicked ${parts[3]}`, false)
          case 'b': this.instance.temporaryBan(
            targetPlayer,
            `You have been kicked for ${Math.round(this.config.kickDuration / 1000 / 60)} minutes ${parts[3]}`,
            this.config.kickDuration
          )
          case 'c': this.instance.room.clearBan(targetPlayer.id)
          default: return this.respondWithUsage(player.id);
        }
      } else {
        this.respondWithUsage(player.id)
      }
    })
  }

  private mute(admin: WLPlayer, targetPlayer: WLPlayer) {
    const minutes = this.config.muteDuration / 1000 / 60
    this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes, use "!a unmute ${this.instance.shortId(targetPlayer.id)}" to unmute`)
    this.instance.mute(targetPlayer.id, this.config.muteDuration)
  }

  private unMute(admin: WLPlayer, targetPlayer: WLPlayer) {
    this.instance.notify(`${targetPlayer.name} has been ungagged`)
    this.instance.unMute(targetPlayer.id)
  }

  private respondWithUsage(playerId: number):void {
    this.instance.notify(`Usage:`, playerId)
    this.instance.notify("!a s or !a skip", playerId)
    this.instance.notify("!a r or !a restart", playerId)
    this.instance.notify("!a d or !a defcon6", playerId)
    this.instance.notify("!a m 123 or !a mute 123", playerId)
    this.instance.notify("!a u 123 or !a unmute 123", playerId)
    this.instance.notify("!a k 123 or !a kick 123", playerId)
    this.instance.notify("!a b 123 or !a ban 123", playerId)
    this.instance.notify("!a c 123 or !a cban 123", playerId)
  }

  private handleJoin({detail: player}: CustomEvent<WLJoiningPlayer>):void {
    if (this.auths.has(player.auth) ) {
      this.instance.room.setPlayerAdmin(player.id, true);
    }
  }
}
