import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface InfoConfig extends PluginConfig {
  announceNameChange: boolean;
  annouceNamesCount: number;
}
export class Info extends Plugin<InfoConfig> {
  aliases = new Map<string, Map<string, Date>>()
  public activate() {
    this.on('playerJoin', this.handleJoin)
    this.onCommandWithTarget(Command.VoteKick, (player, targetPlayer, args: string[]) => {
      const auth = this.instance.playerIdToAuth.get(targetPlayer.id) as string;
      this.instance.notify(`${targetPlayer.name} previously known names:`, player.id)
      this.namesByLastUsed(auth).forEach(([name, time]: [string, Date]) => {
        if (name != targetPlayer.name) {
          const currentTime = new Date();
          this.instance.notify(`${name} ${(+currentTime - +time) / 1000 / 60 / 60} hours ago`, player.id)
        }
      })
    })
    if (this.config.announceNameChange) {
      this.on('changePlayerName', this.handleChangeName)
    }
  }

  private handleChangeName = ({detail: player}: CustomEvent<WLJoiningPlayer>):void => {
    const names = this.namesByLastUsed(player.auth).slice(0, this.config.annouceNamesCount)
    this.instance.room.getPlayerList().forEach(otherPlayer => {
      if (this.instance.playerIdToAuth.get(otherPlayer.id) != player.auth) {
        this.instance.notify(`${player.name} changed their name, last ${names.length} previously known names:`, otherPlayer.id)
        names.forEach(([name, date]: [string, Date]) => this.instance.notify(`${name} ${date.toString().substr(0,21)}`, otherPlayer.id))
      }
    })
  }

  private namesByLastUsed(auth: string): Array<[string, Date]> {
     const names = this.aliases.get(auth) as Map<string, Date>;
     return Array.from(names).sort((a,b) => b[1].getTime() - a[1].getTime())
  }

  private handleJoin = ({detail: player}: CustomEvent<WLJoiningPlayer>): void => {
    const prev = this.aliases.get(player.auth)
    if (prev) {
      if (!prev.get(player.name)) {
        this.instance.emit('changePlayerName', player)
      }
      prev.set(player.name, new Date())
    } else {
      this.aliases.set(player.auth, new Map<string, Date>([[player.name, new Date()]]));
      this.instance.emit('newPlayer', player)
    }
  }
}
