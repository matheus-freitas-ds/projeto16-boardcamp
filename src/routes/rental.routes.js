import { Router } from "express"
import { getRentals } from "../controllers/rentals.controller.js"

const rentalRouter = Router()

rentalRouter.get("/rentals", getRentals)

export default rentalRouter