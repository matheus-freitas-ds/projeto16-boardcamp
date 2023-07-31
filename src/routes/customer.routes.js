import { Router } from "express"
import { getCustomers } from "../controllers/customers.controller.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)

export default customerRouter