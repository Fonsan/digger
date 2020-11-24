import {Plugin, PluginConfig} from './plugin'
export class OnePlayer extends Plugin<PluginConfig> {
  playingPlayers = new Map<String, WLJoiningPlayer>();
  idToAuth = new Map<number, string>();

  public activate() {
    this.on('playerJoin', this.addPlayer)
    this.on('playerLeave', this.removePlayer);
  }

  private removePlayer({detail: player}:CustomEvent<WLPlayer>) {
    this.idToAuth.delete(player.id)
    const auth = this.idToAuth.get(player.id)
    if (auth) {
      this.playingPlayers.delete(auth)
    }
  }

  private addPlayer({detail: player}:CustomEvent<WLJoiningPlayer>):void {
    this.idToAuth.set(player.id, player.auth)
    const existingPlayer = this.playingPlayers.get(player.auth)
    if (existingPlayer) {
      this.instance.room.kickPlayer(existingPlayer.id, 'Only one connection allowed', false)
    }
    this.playingPlayers.set(player.auth, player)
  }
}
