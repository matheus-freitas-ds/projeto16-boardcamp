import { Router } from "express"
import { getCustomers, getCustomerById, createCustomer } from "../controllers/customers.controller.js"
import { validateCreateCustomer } from "../middlewares/customers.middleware.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", getCustomerById)
customerRouter.post("/customers", validateCreateCustomer, createCustomer)

export default customerRouter