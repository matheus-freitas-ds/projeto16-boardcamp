import { Router } from "express"
import { getCustomers, getCustomerById, createCustomer, updateCustomer } from "../controllers/customers.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customer.schemas.js"
import { validateCreateCustomer } from "../middlewares/customers.middleware.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", getCustomerById)
customerRouter.post("/customers", validateSchema(customerSchema), validateCreateCustomer, createCustomer)
customerRouter.put("/customers/:id", validateSchema(customerSchema), validateCreateCustomer, updateCustomer)

export default customerRouter