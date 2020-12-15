export class ReconnectingWebSocket {
  static delay = 3000;
  static maxQueueSize = 5000;
  static flushDelay = 500;
  public readonly url: string;
  private callback?: Function;
  private webSocket!: WebSocket;
  private delay: number;
  private messageQueue: string[];
  private alive = true;
  private timeout:number;
  constructor(url: string, callback?: (ev: MessageEvent) => any, delay?:number) {
    this.url = url
    this.callback = callback;
    this.delay = delay || ReconnectingWebSocket.delay
    this.messageQueue = []
    this.timeout = NaN;
    this.reconnect();
  }

  public send = (message:string) => {
    if (!this.alive) {
      return;
    }
    if (this.webSocket.readyState == WebSocket.OPEN) {
      this.messageQueue.push(message)
      this.checkFlush()
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

  private checkFlush = () => {
    if (this.timeout && this.webSocket.readyState == WebSocket.OPEN) {
      this.timeout = NaN;
      this.flush()
    } else {
      this.timeout = window.setTimeout(this.checkFlush, ReconnectingWebSocket.flushDelay)
    }
  }

  private reconnect = () => {
    if (!this.alive) {
      return;
    }
    if (this.webSocket) {
      this.webSocket.onopen = null;
      this.webSocket.onclose = null;
      this.webSocket.onerror = null;
      this.webSocket.onmessage = null;
      this.webSocket.close()
    }
    this.webSocket = new WebSocket(this.url)
    this.webSocket.onopen = this.flush
    this.webSocket.onclose = this.scheduleReconnect
    this.webSocket.onerror = this.scheduleReconnect
    this.webSocket.onmessage = this.callback && this.callback.bind(this.webSocket);
  }

  private scheduleReconnect = () => {
    setTimeout(this.reconnect, this.delay / 2 + Math.random() * this.delay)
  }

  private flush = () => {
    if (this.messageQueue.length > 0) {
      this.webSocket.send(this.messageQueue.join("\n"))
      this.messageQueue = []
    }
  }
}
