import { Router } from "express"
import { getCustomers, getCustomerById } from "../controllers/customers.controller.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", getCustomerById)

export default customerRouter