import { Router } from "express"
import { createRental, getRentals } from "../controllers/rentals.controller.js"
import { validateRental } from "../middlewares/rentals.middleware.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { rentalSchema } from "../schemas/rental.schemas.js"

const rentalRouter = Router()

rentalRouter.get("/rentals", getRentals)
rentalRouter.post("/rentals", validateSchema(rentalSchema), validateRental, createRental)

export default rentalRouter