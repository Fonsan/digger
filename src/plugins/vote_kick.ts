import {Plugin, PluginConfig} from './plugin'
import { Command } from '../command_registry'
export interface VoteKickConfig extends PluginConfig {
  kickDuration: number;
}
export class VoteKick extends Plugin<VoteKickConfig> {
  public activate() {
    const minutes = Math.round(this.config.kickDuration / 1000 / 60)
    this.onCommandWithTarget(Command.VoteKick, (player, targetPlayer, args: string[]) => {
      this.instance.election(`Kick ${targetPlayer.name} for ${minutes} minutes`, player, () => {
        if (targetPlayer.admin) {
          this.instance.error(`${targetPlayer.name} is admin, will not kick`)
        } else {
          this.instance.temporaryBan(targetPlayer, "Vote kick", this.config.kickDuration)
        }
      })
    })
  }
}
