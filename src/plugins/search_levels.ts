import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface  SearchLevelsConfig extends PluginConfig {
  resultSize: number
}
export class SearchLevels extends Plugin<SearchLevelsConfig> {
  static defaultConfig = {
    resultSize: 4,
    ...Plugin.defaultConfig
  }
  public activate() {
    this.onCommand(Command.SearchLevels, (commandPlayer, message) => {
      const results = this.instance.levelIndex.search(message.substr(message.indexOf(' ') + 1))
      this.instance.notify(`Searching ${message.substr(message.indexOf(' ') + 1)}`)
      this.instance.notify(`Found: ${results.length} showing ${Math.min(results.length, this.config.resultSize)}`, commandPlayer.id);
      this.instance.notify('Levels: id, level', commandPlayer.id);
      results.slice(0, this.config.resultSize).forEach(result => {
        this.instance.notify(`${result.id},\t ${result.full}`, commandPlayer.id)
      })
    })
  }
}
