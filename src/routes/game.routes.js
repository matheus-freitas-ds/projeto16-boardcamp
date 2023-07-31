import { Router } from "express"
import { getGames, createGame } from "../controllers/games.controller.js"
import { validateCreateGame } from "../middlewares/games.middleware.js"

const gameRouter = Router()

gameRouter.get("/games", getGames)
gameRouter.post("/games", validateCreateGame, createGame)

export default gameRouter