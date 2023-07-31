import { Router } from "express"
import { createRental, deleteRental, getRentals, returnRental } from "../controllers/rentals.controller.js"
import { validateDeleteRental, validateRental } from "../middlewares/rentals.middleware.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { rentalSchema } from "../schemas/rental.schemas.js"

const rentalRouter = Router()

rentalRouter.get("/rentals", getRentals)
rentalRouter.post("/rentals", validateSchema(rentalSchema), validateRental, createRental)
rentalRouter.post("/rentals/:id/return", returnRental)
rentalRouter.delete("/rentals/:id", validateDeleteRental, deleteRental)

export default rentalRouter