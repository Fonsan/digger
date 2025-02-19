import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface VoteMuteConfig extends PluginConfig {
  ratio: number;
  muteDuration: number;
}
export class VoteMute extends Plugin<VoteMuteConfig> {
  static defaultConfig = {
    ratio: 0.51,
    muteDuration: 15 * 60 * 1000,
    ...Plugin.defaultConfig
  }
  public activate() {
    const minutes = this.config.muteDuration / 1000 / 60
    this.onCommandWithTarget(Command.VoteMute, (player, targetPlayer, args: string[]) => {
      this.instance.election(`Mute ${targetPlayer.name}`, this.config.ratio, player, () => {
        this.instance.mute(targetPlayer.id, this.config.muteDuration)
        this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes`)
      })
    })
  }
}
