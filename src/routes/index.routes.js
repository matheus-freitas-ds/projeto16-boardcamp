import { Router } from "express"
import gameRouter from "./game.routes.js"
import customerRouter from "./customer.routes.js"
import rentalRouter from "./rental.routes.js"

const router = Router()
router.use(gameRouter)
router.use(customerRouter)
router.use(rentalRouter)

export default router