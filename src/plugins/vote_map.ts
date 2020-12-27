import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface VoteMapConfig extends PluginConfig {
  ratio: number
}
export class VoteMap extends Plugin<VoteMapConfig> {
  public activate() {
    this.onCommand(Command.VoteMap, (player: WLPlayer, message: string) => {
      const token = message.substr(message.indexOf(' ') + 1)
      const level = this.instance.findLevel(token)
      if (!level) {
        this.instance.error(`No such level: ${token}`, player.id)
        return
      }
      this.instance.election(`Next map ${level}`, this.config.ratio, player, () => {
        this.instance.notify(`Next map set to ${level}`)
        this.instance.levelManager.setNext(level)
      })
    })
  }
}
