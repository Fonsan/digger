import { Instance } from './instance'
import { Command } from './command_registry'

type Vote = "y" | "n";
export class Election {
  private instance: Instance;
  private name: string;
  private votes = new Map<string, Vote>();
  private timeout: number;
  private callback: Function;
  private voteCommandHandler: Function;
  private ended = false;

  constructor(instance: Instance, name: string, initiatingPlayer: WLPlayer, callback: Function) {
    this.instance = instance
    this.name = name;
    this.callback = callback;
    this.instance.currentElection = this;
    const auth = this.instance.playerIdToAuth.get(initiatingPlayer.id) as string;
    this.votes.set(auth, 'y')
    const handlers = [
      this.instance.onCommand(Command.VoteYes, this.handleVote),
      this.instance.onCommand(Command.VoteNo, this.handleVote)
    ]
    this.voteCommandHandler = () => handlers.forEach(handler => handler())
    this.instance.on('playerLeave', this.reCount)
    this.instance.on('playerJoin', this.reCount)
    this.timeout = window.setTimeout(() => {
      this.instance.notify(`Vote: ${name} failed`);
      this.end();
    }, this.instance.config.voteTime) as number;
    this.instance.notify(`Vote: ${name} started, vote with !y or !n, current `);;
    this.reCount()
  }

  private handleVote = (player: WLPlayer, message: string) => {
    const playerAuth = this.instance.playerIdToAuth.get(player.id) as string;
    if (this.votes.get(playerAuth)) {
      this.instance.error("You have already voted in this election, you may be interested in !stopthecount", player.id)
    } else {
      this.votes.set(playerAuth, message[1] as Vote)
      this.reCount();
    }
  }

  private reCount = () => {
    const playerCount = Object.keys(this.instance.playerIdToAuth).length;
    const neededVotes = playerCount == 2 ? 2 : playerCount / 2;
    const voteCounts = Array.from(this.votes.values()).reduce((acc, vote) => { acc[vote] += 1; return acc; }, {y: 0, n: 0});
    const prefix = `Vote: ${this.name}, ${voteCounts.y}/${playerCount} in favour, ${voteCounts.n}/${playerCount} against. `
    if(voteCounts.y >= neededVotes) {
      this.instance.notify(`${prefix}Moving ahead with ${this.name}`);
      try {
        this.callback();
        this.end();
      } catch (e) {
        this.instance.log('Exception', e)
      }

    } else if(voteCounts.n >= neededVotes || voteCounts.n + voteCounts.y == playerCount) {
      this.instance.notify(`${prefix}Dismissed ${this.name}`);
      this.end();
    } else {
      this.instance.notify(`${prefix}, participate using !y or !n`);
    }
  }

  private end():void {
    if (this.ended) {
      return;
    }
    this.ended = true;
    this.instance.currentElection = undefined;
    this.voteCommandHandler()
    this.instance.off('playerLeave', this.reCount)
    this.instance.off('playerJoin', this.reCount)
    clearTimeout(this.timeout);
  }
}
