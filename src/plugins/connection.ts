import {Plugin, PluginConfig} from './plugin'
export interface ConnectionConfig extends PluginConfig {
  maxConnectionsPerIP: number
}
export class Connection extends Plugin<ConnectionConfig> {
  connectionMap = new Map<string, Map<number, Date>>();
  playerIdToConn = new Map<number, string>();

  public activate() {
    this.on('playerJoin', this.addPlayer)
    this.on('playerLeave', this.removePlayer);
  }

  private addPlayer({detail: player}:CustomEvent<WLJoiningPlayer>):void {
    this.playerIdToConn.set(player.id, player.conn)
    const connectionPlayers = this.connectionMap.get(player.conn)
    if (connectionPlayers) {
      if (connectionPlayers.size >= this.config.maxConnectionsPerIP) {
        const playerPair = Array.from(connectionPlayers).reduce((acc, el) => acc[1] < el[1] ? acc : el)
        this.instance.room.kickPlayer(playerPair[0], 'Too many connections', false)
        connectionPlayers.delete(playerPair[0])
      }
      connectionPlayers.set(player.id, new Date())
    } else {
      this.connectionMap.set(player.conn, new Map<number, Date>([[player.id, new Date()]]))
    }
  }

  private removePlayer({detail: player}:CustomEvent<WLPlayer>) {
    const conn = this.playerIdToConn.get(player.id) as string;
    const connectionPlayers = this.connectionMap.get(conn) as Map<number, Date>;
    connectionPlayers.delete(player.id)
    this.playerIdToConn.delete(player.id)
  }
}
