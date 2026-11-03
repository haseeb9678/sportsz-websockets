import { config } from "dotenv"
import express from "express"

config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//Routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})