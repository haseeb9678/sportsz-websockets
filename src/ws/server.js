import { WebSocket, WebSocketServer } from 'ws';

const matchSubscribers = new Map()

function subscribe(matchId, socket) {
    if (!matchSubscribers.has(matchId)) {
        matchSubscribers.set(matchId, new Set())
    }
    matchSubscribers.get(matchId).add(socket)
}

function unsubscribe(matchId, socket) {
    const subscribers = matchSubscribers.get(matchId)
    if (!subscribers) return

    subscribers.delete(socket)

    if (subscribers.size === 0) {
        matchSubscribers.delete(matchId)
    }
}

function cleanUpSubscriptions(socket) {
    for (const matchId of socket.subsriptions) {
        unsubscribe(matchId, socket)
    }
}

function handleMessage(socket, data) {
    let message
    try {
        message = JSON.parse(data)
    } catch (error) {
        sendJSON(socket, {
            type: 'error',
            message: "Invalid JSON format",
        })
    }

    if (message.type === 'subscribe' && Number.isInteger(message.matchId)) {
        subscribe(message.matchId, socket)
        socket.subsriptions = socket.subsriptions || new Set()
        socket.subsriptions.add(message.matchId)
        sendJSON(socket, {
            type: 'subscribed',
            matchId: message.matchId,
        })

        return

    }

    if (message.type === 'unsubscribe' && Number.isInteger(message.matchId)) {
        unsubscribe(message.matchId, socket)
        socket.subsriptions.delete(message.matchId)
        sendJSON(socket, {
            type: 'unsubscribed',
            matchId: message.matchId,
        })

        return
    }

    if (message.type === 'subscribe' && Number.isInteger(message.matchId)) {
        subscribe(message.matchId, socket)
        socket.subsriptions = socket.subsriptions || new Set()
        socket.subsriptions.add(message.matchId)
        sendJSON(socket, {
            type: 'subscribed',
            matchId: message.matchId,
        })

    }
}


function sendJSON(socket, payload) {
    if (socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(payload));
}

function broadcast(wss, payload) {
    for (const client of wss.clients) {
        if (client.readyState !== WebSocket.OPEN) continue

        client.send(JSON.stringify(payload));
    }
}

function broadcastToMatchSubscribers(matchId, payload) {
    const subscribers = matchSubscribers.get(matchId)
    if (!subscribers || subscribers.size === 0) return

    for (const socket of subscribers) {
        if (socket.readyState !== WebSocket.OPEN) continue
        sendJSON(socket, payload)
    }
}

export function attachWebSocketServer(server) {
    const wss = new WebSocketServer({
        server,
        path: '/ws',
        maxPayload: 1024 * 1024 * 10, // 10MB
    });

    wss.on("connection", (socket) => {

        socket.isAlive = true
        socket.subsriptions = new Set()

        socket.on("pong", () => {
            socket.isAlive = true
        })

        socket.on("message", (data) => {
            handleMessage(socket, data)
        })

        socket.on("error", (err) => {
            socket.terminate()
        })

        socket.on("close", () => {
            cleanUpSubscriptions(socket)
        })

        sendJSON(socket, {
            type: 'connected',
            message: "Connected to WebSocket server",
        });

        socket.on("error", console.error)
    })

    const interval = setInterval(() => {
        wss.clients.forEach((socket) => {
            if (socket.isAlive === false) {
                socket.terminate()
                console.log("socket terminated")
            }
            socket.isAlive = false
            socket.ping()

        })

    }, 3000)

    wss.on("close", () => {
        clearInterval(interval)
    })

    function broadcastMatchCreated(match) {
        broadcast(wss, {
            type: 'matchCreated',
            match,
        });
    }

    function broadcastMatchCommentary(matchId, comment) {
        broadcastToMatchSubscribers(matchId, {
            type: 'matchCommentary',
            data: comment,
        });
    }

    return {
        broadcastMatchCreated,
        broadcastMatchCommentary
    }
}