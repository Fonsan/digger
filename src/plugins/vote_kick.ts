import {Plugin, PluginConfig} from './plugin'
export interface VoteKickConfig extends PluginConfig {
  kickDuration: number;
}
export class VoteKick extends Plugin<VoteKickConfig> {
  public activate() {
    const minutes = Math.round(this.config.kickDuration / 1000 / 60)
    this.registerCommand(['!vk', '!votekick'], 'Kick player vote, type !vk for Usage', (player, message) => {
      const parts = message.split(' ')
      if (parts.length < 2) {
        this.instance.error(`Usage: !vk 123 or !vk playerName`, player.id)
        return
      }
      const lastPart = parts[parts.length - 1];
      const targetPlayer = this.instance.findPlayer(lastPart)
      if (!targetPlayer) {
        this.instance.error(`Could not find player`, player.id);
        this.instance.error(`Usage: !vk 123 or !vk playerName`, player.id);
        return
      }
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
