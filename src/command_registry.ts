import {Instance} from './instance'
export enum Command {
  AdminHelp = '!a',
  AdminBan = '!ab',
  AdminClearBan = '!acb',
  AdminDefcon6 = '!ad6',
  AdminKick = '!ak',
  AdminMute = '!am',
  AdminUnMute = '!aum',
  AdminRestart = '!ar',
  AdminSkip = '!as',
  Help = '!h',
  Info = '!i',
  PlayerList = '!l',
  StopTheCount = '!stc',
  VoteMute = '!vm',
  VoteNo = '!n',
  VoteRestart = '!vr',
  VoteKick = '!vk',
  VoteSkip = '!vs',
  VoteYes = '!y',
}
export type CommandDefinition = {
  verboseCommand?: string,
  description?: string,
  admin?: boolean,
  hidden?: boolean,
  arguments?: boolean,
}
export const Commands = new Map<Command, CommandDefinition>([
  [
    Command.AdminHelp,
    {
      verboseCommand: '!adminhelp',
      description: '!a[s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t], for detailed usage !a kick',
      admin: true,
    }
  ],
  [
    Command.AdminBan,
    {
      verboseCommand: '!adminban',
      description: 'Ban by name or id',
      admin: true,
      hidden: true,
      arguments: true
    }
  ],
  [
    Command.AdminClearBan,
    {
      verboseCommand: '!adminclearban',
      description: 'Clear ban by name or id',
      admin: true,
      hidden: true,
      arguments: true
    }
  ],
  [
    Command.AdminDefcon6,
    {
      verboseCommand: '!admindefcon6',
      description: 'Admin defcon6',
      admin: true,
      hidden: true
    }
  ],
  [
    Command.AdminKick,
    {
      verboseCommand: '!adminkick',
      description: 'Kick by name or id',
      admin: true,
      hidden: true,
      arguments: true
    }
  ],
  [
    Command.AdminMute,
    {
      verboseCommand: '!adminmute',
      description: 'Mute by name or id',
      admin: true,
      hidden: true,
      arguments: true
    }
  ],
  [
    Command.AdminUnMute,
    {
      verboseCommand: '!adminunmute',
      description: 'Unmute by name or id',
      admin: true,
      hidden: true,
      arguments: true
    }
  ],
  [
    Command.AdminRestart,
    {
      verboseCommand: '!adminrestart',
      description: 'Restart map',
      admin: true,
      hidden: true
    }
  ],
  [
    Command.AdminSkip,
    {
      verboseCommand: '!adminskip',
      description: 'Skip map',
      admin: true,
      hidden: true
    }
  ],
  [
    Command.Help,
    {
      verboseCommand: '!help',
      description: 'Display this help'
    }
  ],
  [
    Command.Info,
    {
      verboseCommand: '!info',
      description: 'Check the previously known aliases of a player',
      arguments: true,
    }
  ],
  [
    Command.PlayerList,
    {
      verboseCommand: '!playerlist',
      description: 'List the players showing an id and name'
    }
  ],
  [
    Command.StopTheCount,
    {
      verboseCommand: '!stopthecount',
      description: 'Request to stop the count of a vote'
    }
  ],
  [
    Command.VoteMute,
    {
      verboseCommand: '!votemute',
      description: 'Mute player vote, type !vm for Usage'
    }
  ],
  [
    Command.VoteKick,
    {
      verboseCommand: '!votekick',
      description: 'Kick player vote, type !vk for Usage'
    }
  ],
  [
    Command.VoteNo,
    {
      hidden: true
    }
  ],
  [
    Command.VoteRestart,
    {
      verboseCommand: '!voterestart',
      description: 'Restart map vote'
    }
  ],
  [
    Command.VoteSkip,
    {
      verboseCommand: '!voteskip',
      description: 'Skip map vote'
    }
  ],
  [
    Command.VoteYes,
    {
      hidden: true
    }
  ],
])

const VerboseToCommand = new Map<string, Command>(
  Array.from(Commands).filter(
    ([command, definition]:[Command, CommandDefinition]) => definition.verboseCommand
  ).map(
    ([command, definition]:[Command, CommandDefinition]) => [definition.verboseCommand as string, command]
  )
)
export class CommandRegistry {
  public readonly activeCommands = new Map<Command, (player: WLPlayer, message: string) => void>()
  private instance: Instance;

  constructor(instance: Instance) {
    this.instance = instance
  }

  public on(command: Command, callback: ((player: WLPlayer, message: string) => void) ):Function {
    if(this.activeCommands.get(command)) {
      throw `command already registered ${command}`
    }
    this.activeCommands.set(command, callback)
    return () => {
      this.activeCommands.delete(command)
    }
  }

  public handleCommand = (player: WLPlayer, message: string) => {
    const firstSpaceIndex = message.indexOf(' ');
    const commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
    const callback = this.activeCommands.get(commandName as Command) || this.activeCommands.get(VerboseToCommand.get(commandName) as Command)
    if (callback) {
      callback.apply(this, [player, message])
    } else {
      this.instance.error(`"${commandName}" not recognized command`, player.id)
    }
  }
}
