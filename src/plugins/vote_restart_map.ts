import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface VoteRestartMapConfig extends PluginConfig {
  ratio: number
}
export class VoteRestartMap extends Plugin<VoteRestartMapConfig> {
  static defaultConfig = {
    ratio: 0.5,
    ...Plugin.defaultConfig
  }
  public activate() {
    this.onCommand(Command.VoteRestart, (player: WLPlayer, message: string) => {
      this.instance.election('Skip map',
        this.config.ratio,
        player,
        () => {
          this.instance.room.restartGame()
          this.instance.notify('Game restarted')
        }
      )
    })
  }
}
