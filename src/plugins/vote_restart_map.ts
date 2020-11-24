import {Plugin, PluginConfig} from './plugin'
export class VoteRestartMap extends Plugin<PluginConfig> {
  public activate() {
    this.registerCommand(['!vr', '!voterestart'], 'Restart map vote', (player: WLPlayer, message: string) => {
      this.instance.election('Skip map', player, () => {
        this.instance.room.restartGame()
        this.instance.notify('Game restarted')
      })
    })
  }
}
