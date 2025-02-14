export default class EventBus {
    listeners: Map<string, any[]>;

    constructor() {
        this.listeners = new Map();
    }

    on(event: string, callback: unknown): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event)!.push(callback);
    }

    off(event: string, callback: unknown): void {
        if (!this.listeners.has(event)) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners.set(
            event,
            this.listeners.get(event)!.filter((listener) => listener !== callback)
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners.has(event)) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners.get(event)!.forEach((listener) => {
            listener(...args);
        });
    }
}
