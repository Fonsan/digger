import {Instance, EventName} from '../instance'
import { Command, Commands, CommandDefinition } from '../command_registry'
export class PluginConfig {
  enabled = true
}
interface Listener {
  name: EventName;
  listener: CustomEventListener;
}
export abstract class Plugin<ConfigType extends PluginConfig> {
  instance: Instance;
  config: ConfigType;
  listeners: Listener[] = [];
  commandHandlers: Function[] = [];

  constructor(instance: Instance, config: ConfigType) {
    instance.log(`${this.constructor.name} loaded`)
    this.instance = instance;
    this.config = config;
  }
  public enable():void {
    this.activate();
    this.instance.log(`${this.constructor.name} enabled with ${JSON.stringify(this.config)}`)
  }
  public abstract activate(): void;
  public disable(): void {
    this.instance.log(`${this.constructor.name} disabled`)
    this.listeners.forEach(({name, listener}) => {
      this.instance.off(name, listener)
    })
    this.commandHandlers.forEach(handler => handler())
  }
  protected on(name: EventName, listener: CustomEventListener):void {
    this.listeners.push({name, listener})
    this.instance.on(name, listener)
  }
  protected onCommand(command: Command, callback: (player: WLPlayer, message: string) => void):Function {
    const handler = this.instance.onCommand(command, callback);
    this.commandHandlers.push(handler)
    return handler;
  }
  protected onCommandWithTarget(command: Command, callback: (player: WLPlayer, targetPlayer: WLPlayer, args: string[]) => void):Function {
    return this.onCommand(command, (player: WLPlayer, message: string) => {
      const [commandName, target, ...args] = message.split(' ')
      const targetPlayer = this.instance.findPlayer(target)
      if (!targetPlayer) {
        this.instance.error(`Could not find targetPlayer: ${target}, use !list`, player.id)
        const definition = Commands.get(commandName as Command) as CommandDefinition
        if (definition.description) {
          this.instance.error(definition.description, player.id)
        }
        return;
      }
      callback(player, targetPlayer, args)
    })
  }
}

