import { config } from "dotenv"
import express from "express"
import matchesRouter from "./routes/matches.route.js"
import { errorMiddle } from "./middlewares/error.middleware.js"

config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
const api = "/api/v1"

//Routes
app.use(`${api}/matches`, matchesRouter)

//Global error
app.use(errorMiddle)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})