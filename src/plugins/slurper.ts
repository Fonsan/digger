import {Plugin, PluginConfig} from './plugin'
import {EventName} from '../instance'
export interface SlurperConfig extends PluginConfig {
  url?: string;
  events: EventName[];
}
export class Slurper extends Plugin<SlurperConfig> {
  webSocket?: WebSocket;
  public activate() {
    if (this.config.url) {
      this.webSocket = new WebSocket(this.config.url)
    }
    this.config.events.forEach(eventName => {
      this.on(eventName, this.publish.bind(this));
    })
  }

  private publish(event: CustomEvent) {
    let message = {
      time: Date.now(),
      serverId: this.instance.serverId,
      instanceId: this.instance.instanceId,
      gameId: this.instance.gameId,
      gameStart: this.instance.gameStart.getTime(),
      event: event.type,
    } as any
    if (event.detail !== undefined) {
      message.detail = event.detail
    }
    if (this.webSocket && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(message))
    }
    this.instance.log(message)
  }
}
