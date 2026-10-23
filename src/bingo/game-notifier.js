const GameEvent = {
  System: 'system',
  End: 'gameEnd',
  Start: 'gameStart',
  NewScore: 'newScore',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    // Simulate chat messages that will eventually come over WebSocket
    setInterval(() => {
      const score = Math.floor(Math.random() * 50);
      const fill = Math.floor(Math.random() * 100);
      const date = new Date().toLocaleDateString();
      const userName = 'John';
      this.broadcastEvent(userName, GameEvent.NewScore, { name: userName, score: score, fill: fill, date: date });
    }, 5000);
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
