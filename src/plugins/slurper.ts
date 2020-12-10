import { Plugin, PluginConfig } from './plugin'
import { EventName } from '../instance'
import { ReconnectingWebSocket } from '../reconnecting_websocket'
export interface SlurperConfig extends PluginConfig {
  url?: string;
  events: EventName[];
}
export class Slurper extends Plugin<SlurperConfig> {
  webSocket?: ReconnectingWebSocket;
  private messageId = 0;
  public activate() {
    if (this.config.url) {
      this.webSocket = new ReconnectingWebSocket(this.config.url, this.instance.log)
    }
    this.config.events.forEach(eventName => {
      this.on(eventName, this.publish.bind(this));
    })
  }

  private publish = (event: CustomEvent) => {
    let message = {
      id: this.messageId++,
      time: Date.now(),
      serverId: this.instance.serverId,
      instanceId: this.instance.instanceId,
      gameId: this.instance.gameId,
      gameStart: this.instance.gameStart.getTime(),
      event: event.type,
    } as any
    if (event.detail !== undefined && event.detail !== null) {
      message.data = event.detail
    }
    if (this.webSocket) {
      this.webSocket.send(JSON.stringify(message))
    }
    this.instance.log(message)
  }
}
