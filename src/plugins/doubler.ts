import {Plugin, PluginConfig} from './plugin'
export interface DoublerConfig extends PluginConfig {
  threshold: number
}
export class Doubler extends Plugin<DoublerConfig> {
  public activate() {
    this.on('gameEnd', this.updateDouble)
  }

  private updateDouble = () => {
    const activePlayers = this.instance.room.getPlayerList().filter(player => player.team != 0)
    const currentSettings = this.instance.room.getSettings();
    const double = activePlayers.length >= this.config.threshold;
    if (double != currentSettings.expandLevel) {
      this.instance.notify(`${double ? 'More' : 'Less'} than ${this.config.threshold} active players, next map ${!double && 'not' || ''} will be expanded`)
      this.instance.room.setSettings({expandLevel: double})
    }
  }
}
