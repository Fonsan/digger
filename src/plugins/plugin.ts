import {Instance, EventName} from '../instance'
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
    if (config.enabled) {
      this.enable()
      instance.log(`${this.constructor.name} enabled with ${JSON.stringify(config)}`)
    }
  }
  public abstract enable(): void;
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
  protected registerCommand(commands: string[], description: string, callback: (player: WLPlayer, message: string) => void):Function {
    const handler = this.instance.registerCommand(commands, description, callback);
    this.commandHandlers.push(handler)
    return handler;
  }
}

