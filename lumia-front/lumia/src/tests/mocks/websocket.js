import React from 'react';

// Mock SockJS
const MockSocket = function (url) {
    this.url = url;
    this.readyState = 1; // OPEN
    this.onopen = null;
    this.onclose = null;
    this.onmessage = null;
    this.onerror = null;

    setTimeout(() => {
        if (this.onopen) this.onopen();
    }, 0);
};

MockSocket.prototype.send = jest.fn();
MockSocket.prototype.close = jest.fn(function () {
    if (this.onclose) this.onclose({ code: 1000, reason: 'Normal closure' });
});

// Mock STOMP Client
const mockSubscribe = jest.fn(() => ({ unsubscribe: jest.fn() }));
const mockPublish = jest.fn();
const mockActivate = jest.fn();
const mockDeactivate = jest.fn();

class MockStompClient {
    constructor(config) {
        this.config = config;
        this.connected = false;
        this.onConnect = null;
        this.onDisconnect = null;
        this.onStompError = null;
    }

    activate() {
        mockActivate();
        this.connected = true;
        setTimeout(() => {
            if (this.onConnect) this.onConnect({ headers: {} });
        }, 0);
    }

    deactivate() {
        mockDeactivate();
        this.connected = false;
        if (this.onDisconnect) this.onDisconnect();
    }

    subscribe(destination, callback) {
        return mockSubscribe(destination, callback);
    }

    publish(params) {
        mockPublish(params);
    }
}

module.exports = {
    SockJS: MockSocket,
    Client: MockStompClient,
    mockSubscribe,
    mockPublish,
    mockActivate,
    mockDeactivate,
};
