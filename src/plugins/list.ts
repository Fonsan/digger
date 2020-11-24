import {Plugin, PluginConfig} from './plugin'
export class List extends Plugin<PluginConfig> {
  public activate() {
    this.registerCommand(['!l', '!list'], 'List the players showing an id and name', (commandPlayer, message) => {
      this.instance.notify('Players: id, name', commandPlayer.id);
      this.instance.room.getPlayerList().forEach(player => {
        this.instance.notify(`${this.instance.shortId(player.id)}\t${player.name}`, commandPlayer.id);
      })
    })
  }
}
