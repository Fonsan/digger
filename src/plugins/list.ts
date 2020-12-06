import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export class List extends Plugin<PluginConfig> {
  public activate() {
    this.onCommand(Command.PlayerList, (commandPlayer, message) => {
      this.instance.notify('Players: id, name', commandPlayer.id);
      this.instance.room.getPlayerList().forEach(player => {
        this.instance.notify(`${this.instance.shortId(player.id)}\t${player.name}`, commandPlayer.id);
      })
    })
  }
}
