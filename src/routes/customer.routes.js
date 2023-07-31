import { Router } from "express"
import { getCustomers, getCustomerById, createCustomer, updateCustomer } from "../controllers/customers.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customer.schemas.js"
import { validateCreateCustomer, validateCustomerCpf, validateGetCustomer } from "../middlewares/customers.middleware.js"

const customerRouter = Router()

customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", validateGetCustomer, getCustomerById)
customerRouter.post("/customers", validateSchema(customerSchema), validateCreateCustomer, createCustomer)
customerRouter.put("/customers/:id", validateSchema(customerSchema), validateCustomerCpf, updateCustomer)

export default customerRouter