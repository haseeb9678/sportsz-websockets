import { Router } from "express"
import { createMatchSchema } from "../validation/matches.js"
import { createMatch, getMatches } from "../controllers/matches.controller.js"
import { validateMiddle } from "../middlewares/validate.middleware.js"

const matchesRouter = Router()

//GET
matchesRouter.get("/", getMatches)

//POST
matchesRouter.post("/", validateMiddle(createMatchSchema), createMatch)

export default matchesRouter