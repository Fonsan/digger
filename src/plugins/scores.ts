import {Plugin, PluginConfig} from './plugin'
export class Scores extends Plugin<PluginConfig> {
  public enable() {
    this.on('gameEnd', this.handleGameEnd)
  }

  private handleGameEnd():void {
    const players = this.instance.room.getPlayerList()
    const teams = new Map<number, boolean>();
    const playerScores = Array<{player: WLPlayer, score: {kills: number, deaths: number, score: number}}>();
    players.forEach(player => {
      teams.set(player.team, true);
      const score = this.instance.room.getPlayerScore(player.id)
      if(score) {
        playerScores.push({
          player: player,
          score: score
        })
      }
    })
    this.instance.emit('playerScores', playerScores)
    if(this.instance.room.getSettings().gameMode == 'tdm') {
      let teamScores = Array<{team: number, score: number}>();
      Object.keys(teams).map(teamIdstring => {
        const teamId = parseInt(teamIdstring, 10);
        if (teamId > 0) {
          const teamScore = this.instance.room.getTeamScore(teamId)
          teamScores.push({team: teamId, score: teamScore})
        }
      })
      this.instance.emit('teamScores', teamScores)
    }
  }
}
