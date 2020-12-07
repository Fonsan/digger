import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export class VoteMap extends Plugin<PluginConfig> {
  public activate() {
    this.onCommand(Command.VoteMap, (player: WLPlayer, message: string) => {
      const token = message.substr(message.indexOf(' ') + 1)
      const level = this.instance.findLevel(token)
      if (!level) {
        this.instance.error(`No such level: ${token}`, player.id)
        return
      }
      this.instance.election(`Next map ${level}`, player, () => {
        this.instance.notify(`Next map set to ${level}`)
        this.instance.levelManager.setNext(level)
      })
    })
  }
}
