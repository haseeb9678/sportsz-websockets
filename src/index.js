import { config } from "dotenv"
import express from "express"
import matchesRouter from "./routes/matches.route.js"
import { errorMiddle } from "./middlewares/error.middleware.js"
import http from "http"
import { attachWebSocketServer } from "./ws/server.js"

config()

const app = express()
const httpServer = http.createServer(app)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

app.use(express.json())
const api = "/api/v1"

const { broadcastMatchCreated } = attachWebSocketServer(httpServer)

//Locals
app.locals.broadcastMatchCreated = broadcastMatchCreated

//Routes
app.use(`${api}/matches`, matchesRouter)

//Global error
app.use(errorMiddle)

httpServer.listen(PORT, HOST, () => {
    const baseURL = HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `${HOST}:${PORT}`
    console.log(`Server is running on ${baseURL}`)
    console.log(`WebSocket server is running on ${baseURL.replace("http", "ws")}/ws`)
})