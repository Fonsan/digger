import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export class NextMap extends Plugin<PluginConfig> {
  public activate() {
    this.onCommand(Command.NextMap, (player: WLPlayer, message: string) => {
      this.instance.notify(`Current map: ${this.instance.levelManager.currentName()}, Next map: ${this.instance.levelManager.peekName()}`, player.id);
    })
  }
}
