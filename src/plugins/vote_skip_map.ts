import {Plugin, PluginConfig} from './plugin'
export class VoteSkipMap extends Plugin<PluginConfig> {
  public enable() {
    this.registerCommand(['!vs', '!voteskip'], 'Skip map vote', (player: WLPlayer, message: string) => {
      this.instance.election('Skip map', player, () => this.instance.room.endGame())
    })
  }
}
