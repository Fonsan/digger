import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export class VoteRestartMap extends Plugin<PluginConfig> {
  public activate() {
    this.onCommand(Command.VoteRestart, (player: WLPlayer, message: string) => {
      this.instance.election('Skip map', player, () => {
        this.instance.room.restartGame()
        this.instance.notify('Game restarted')
      })
    })
  }
}
