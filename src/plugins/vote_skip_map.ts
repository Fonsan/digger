import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export class VoteSkipMap extends Plugin<PluginConfig> {
  public activate() {
    this.onCommand(Command.VoteSkip, (player: WLPlayer, message: string) => {
      this.instance.election('Skip map', player, () => this.instance.room.endGame())
    })
  }
}
