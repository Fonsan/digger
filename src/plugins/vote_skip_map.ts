import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface VoteSkipMapConfig extends PluginConfig {
  ratio: number
}
export class VoteSkipMap extends Plugin<VoteSkipMapConfig> {
  static defaultConfig = {
    ratio: 0.5,
    ...Plugin.defaultConfig
  }
  public activate() {
    this.onCommand(Command.VoteSkip, (player: WLPlayer, message: string) => {
      this.instance.election(
        'Skip map',
        this.config.ratio,
        player,
        () => this.instance.room.endGame()
      )
    })
  }
}
