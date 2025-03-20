import EventBus from '../../utils/event-bus/event-bus.ts';

export class WSTransport extends EventBus {
    static WSTransportEvent = {
        CONNECTED: 'connected',
        CLOSE: 'close',
        ERROR: 'error',
        MESSAGE: 'message'
    };

    private _socket?: WebSocket;
    private _pingInterval?: ReturnType<typeof setTimeout>;
    private readonly _pingIntervalTime = 30000;
    private _url: string;

    constructor(url: string) {
        super();
        this._url = url;
    }

    public send(data: string | number | object) {
        if (!this._socket) {
            throw new Error('Socket is not connected');
        }

        this._socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        if (this._socket) {
            throw new Error('Socket is already connected');
        }

        this._socket = new WebSocket(this._url);
        this.subscribe(this._socket);
        this.setupPing();

        return new Promise((resolve, reject) => {
            this.on(WSTransport.WSTransportEvent.ERROR, reject);
            this.on(WSTransport.WSTransportEvent.CONNECTED, () => {
                this.off(WSTransport.WSTransportEvent.ERROR, reject);
                resolve();
            });
        });
    }

    public close(): void {
        this._socket?.close();
        clearInterval(this._pingInterval);
    }

    public subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransport.WSTransportEvent.CONNECTED);
        });

        socket.addEventListener('close', () => {
            this.emit(WSTransport.WSTransportEvent.CLOSE);
        });

        socket.addEventListener('error', () => {
            this.emit(WSTransport.WSTransportEvent.ERROR);
        });

        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);
                if (['pong', 'user connected'].includes(data.type)) {
                    return;
                }
                this.emit(WSTransport.WSTransportEvent.MESSAGE, data);
            } catch (e) {
                //
            }
        });
    }

    public setupPing(): void {
        this._pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
        }, this._pingIntervalTime);

        this.on(WSTransport.WSTransportEvent.CLOSE, () => {
            clearInterval(this._pingInterval);
            this._pingInterval = undefined;
        });
    }
}
