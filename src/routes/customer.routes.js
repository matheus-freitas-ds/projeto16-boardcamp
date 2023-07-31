import { Router } from "express"
import { getCustomers, getCustomerById, createCustomer } from "../controllers/customers.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customer.schemas.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", getCustomerById)
customerRouter.post("/customers", validateSchema(customerSchema), createCustomer)

export default customerRouter