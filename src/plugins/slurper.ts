import { Plugin, PluginConfig } from './plugin'
import { EventName } from '../instance'
import { ReconnectingWebSocket } from '../reconnecting_websocket'
export interface SlurperConfig extends PluginConfig {
  url?: string;
  log: boolean,
  events: EventName[];
}
export class Slurper extends Plugin<SlurperConfig> {
  static defaultConfig = {
    enabled: false,
    log: false,
    events: [
      'captcha',
      'changePlayerName',
      'gameEnd',
      'gameEnd2',
      'gameStart',
      'loadLevel',
      // 'gameTick', // Disabled for performance reasons
      'newPlayer',
      'playerActive',
      // 'playerActivity', // Disabled for performance reasons
      'playerAdminChange',
      'playerChat',
      'playerInactive',
      'playerJoin',
      'playerKicked',
      'playerKilled',
      'playerLeave',
      'playerScores',
      'playerTeamChange',
      'roomLink',
      'teamScores',
    ]
  } as SlurperConfig;
  webSocket?: ReconnectingWebSocket;
  private messageId = 0;
  public activate() {
    if (this.config.url) {
      if (this.config.url.match(/^wss?\:\/\/.+\//)) {
        throw 'slurper url should not include path'
      }
      const url = `${this.config.url}/slurp/${this.instance.serverId}`
      this.instance.log(`Slurper connecting to ${url}`)
      this.webSocket = new ReconnectingWebSocket(
        url,
        this.instance.log
      )
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
    if (this.config.log) {
      this.instance.log(message)
    }
    if (this.webSocket) {
      this.webSocket.send(JSON.stringify(message))
    }
  }
}
