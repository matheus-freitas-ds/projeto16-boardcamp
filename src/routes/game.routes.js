import { Router } from "express"
import { getGames, createGame } from "../controllers/games.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { validateCreateGame } from "../middlewares/games.middleware.js"
import { gameSchema } from "../schemas/game.schemas.js"

const gameRouter = Router()

gameRouter.get("/games", getGames)
gameRouter.post("/games", validateSchema(gameSchema), validateCreateGame, createGame)

export default gameRouter