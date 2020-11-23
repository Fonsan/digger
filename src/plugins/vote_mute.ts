import {Plugin, PluginConfig} from './plugin'
export interface VoteMuteConfig extends PluginConfig {
  muteDuration: number;
}
export class VoteMute extends Plugin<VoteMuteConfig> {
  public enable() {
    const minutes = this.config.muteDuration / 1000 / 60
    this.registerCommand(['!vm', '!votemute'], 'Mute player vote, type !vm for Usage', (player, message) => {
      const parts = message.split(' ')
      if (parts.length < 2) {
        this.instance.error(`Usage: !vm 123 or !vm playerName`, player.id)
        return
      }
      const lastPart = parts[parts.length - 1];
      const targetPlayer = this.instance.findPlayer(lastPart)
      if (!targetPlayer) {
        this.instance.error(`Could not find player`, player.id);
        this.instance.error(`Usage: !vm 123 or !vm playerName`, player.id);
        return
      }
      this.instance.election(`Mute ${targetPlayer.name}`, player, () => {
        this.instance.mute(targetPlayer.id, this.config.muteDuration)
        this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes`)
      })
    })
  }
}
