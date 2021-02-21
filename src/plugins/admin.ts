import {Plugin, PluginConfig} from './plugin'
import {Instance} from '../instance'
import { Command, Commands, CommandDefinition } from '../command_registry'
export interface  AdminConfig extends PluginConfig {
  auths: string[];
  muteDuration: number;
  kickDuration: number;
}
export class Admin extends Plugin<AdminConfig> {
  static defaultConfig = {
    auths: [],
    muteDuration: 15 * 60 * 1000,
    kickDuration: 15 * 60 * 1000,
    ...Plugin.defaultConfig
  }
  auths: Set<string>;
  constructor(instance: Instance, config: AdminConfig) {
    super(instance, config)
    this.auths = new Set(config.auths)
  }

  protected onCommand(command: Command, callback: (player: WLPlayer, message: string) => void):Function {
    return super.onCommand(command, (player: WLPlayer, message: string) => {
      if (!player.admin) {
        this.instance.error('Not admin', player.id)
        return;
      }
      callback(player, message)
    })
  }

  public activate() {
    this.on('playerJoin', this.handleJoin)
    this.onCommand(Command.AdminHelp, (player: WLPlayer, message: string) => {
      this.respondWithUsage(player.id)
    })
    this.onCommand(Command.AdminSkip, (player: WLPlayer, message: string) => {
      this.instance.room.endGame();
      this.instance.notify(`Admin: ${player.name}, ended game`)
    })
    this.onCommand(Command.AdminShuffle, (player: WLPlayer, message: string) => {
      this.instance.notify(`Admin: ${player.name}, shuffled map pool`)
      this.instance.levelManager.shuffle()
    })
    this.onCommand(Command.AdminRestart, (player: WLPlayer, message: string) => {
      this.instance.room.endGame();
      this.instance.notify(`Admin: ${player.name}, restared game`)
    })
    this.onCommand(Command.AdminDefcon6, (player: WLPlayer, message: string) => {
      this.instance.error('Not yet implemented', player.id);
    })
    this.onCommand(Command.AdminNextMap, (player: WLPlayer, message: string) => {
      const token = message.substr(message.indexOf(' ') + 1)
      const level = this.instance.findLevel(token)
      if (!level) {
        this.instance.error(`${token} not found`, player.id)
        return
      }
      this.instance.notify(`Admin ${player.name} set next map: ${level}`)
      this.instance.levelManager.setNext(level)
    })
    this.onCommandWithTarget(Command.AdminClearBan, (player: WLPlayer, targetPlayer: WLPlayer) => {
      this.instance.room.clearBan(targetPlayer.id);
      this.instance.notify(`Clearing ban for player with previous id ${targetPlayer.id}`)
    })
    this.onCommandWithTarget(Command.AdminMute, this.mute)
    this.onCommandWithTarget(Command.AdminUnMute, this.unMute)
    this.onCommandWithTarget(Command.AdminKick, (player: WLPlayer, targetPlayer: WLPlayer, args: string[]) => {
      this.instance.room.kickPlayer(targetPlayer.id, `You have been kicked ${args[0] || ''}`, false);
    })
    this.onCommandWithTarget(Command.AdminBan, (player: WLPlayer, targetPlayer: WLPlayer, args: string[]) => {
      this.instance.temporaryBan(
        targetPlayer,
        `You have been kicked for ${Math.round(this.config.kickDuration / 1000 / 60)} minutes ${args[0] || ''}`,
        this.config.kickDuration
      );
    })
  }

  private mute = (admin: WLPlayer, targetPlayer: WLPlayer) => {
    const minutes = this.config.muteDuration / 1000 / 60
    this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes, use "!a unmute ${this.instance.shortId(targetPlayer.id)}" to unmute`, admin.id)
    this.instance.mute(targetPlayer.id, this.config.muteDuration)
  }

  private unMute = (admin: WLPlayer, targetPlayer: WLPlayer) => {
    this.instance.notify(`${targetPlayer.name} has been ungagged`, admin.id)
    this.instance.unMute(targetPlayer.id)
  }

  private respondWithUsage(playerId: number):void {
    this.instance.notify(`Usage:`, playerId)
    Array.from(this.instance.commandRegistry.activeCommands.keys()).sort().forEach((command) => {
      const definition = Commands.get(command) as CommandDefinition
      if (!definition.hidden && definition.admin) {
        if(definition.description) {
          if (definition.arguments) {
            this.instance.notify(`${command} 123 ${definition.verboseCommand ? `or ${definition.verboseCommand} 123` : ''}`)
          } else {
            this.instance.notify(`${command} ${definition.verboseCommand ? `or ${definition.verboseCommand}` : ''}`)
          }
        }
      }
    })
  }

  private handleJoin = ({detail: player}: CustomEvent<WLJoiningPlayer>):void => {
    if (this.auths.has(player.auth) ) {
      this.instance.room.setPlayerAdmin(player.id, true);
    }
  }
}
