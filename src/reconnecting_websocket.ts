export class ReconnectingWebSocket {
  static delay = 3000;
  static maxQueueSize = 5000;
  public readonly url: string;
  private callback?: Function;
  private webSocket!: WebSocket;
  private delay: number;
  private messageQueue: string[];
  private alive = true;
  constructor(url: string, callback?: (ev: MessageEvent) => any, delay?:number) {
    this.url = url
    this.callback = callback;
    this.delay = delay || ReconnectingWebSocket.delay
    this.messageQueue = []
    this.reconnect();
  }

  public send = (message:string) => {
    if (!this.alive) {
      return;
    }
    if (this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(message)
    } else {
      if (this.messageQueue.length > ReconnectingWebSocket.maxQueueSize) {
        console.log("Max message queue for slurper exceeded shutting down slurper")
        this.alive = false;
        return;
      } else {
        this.messageQueue.push(message)
      }
    }
  }

  private reconnect = () => {
    if (!this.alive) {
      return;
    }
    if (this.webSocket) {
      this.webSocket.close()
    }
    this.webSocket = new WebSocket(this.url)
    this.webSocket.onopen = this.onopen
    this.webSocket.onclose = this.scheduleReconnect
    this.webSocket.onerror = this.scheduleReconnect
    this.webSocket.onmessage = this.callback && this.callback.bind(this.webSocket);
  }

  private scheduleReconnect = () => {
    setTimeout(this.reconnect, this.delay / 2 + Math.random() * this.delay)
  }

  private onopen = () => {
    this.messageQueue.forEach(message => this.webSocket.send(message))
    this.messageQueue = []
  }
}
