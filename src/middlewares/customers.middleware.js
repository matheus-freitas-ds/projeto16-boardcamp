import { db } from "../database/database.js"

export async function validateGetCustomer(req, res, next) {
    const { id } = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])
        if (customer.rowCount === 0) return res.sendStatus(404)
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function validateCustomerCpf(req, res, next) {
    const { id } = req.params
    const { cpf } = req.body

    try {
        const cpfList = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])

        if (cpfList.rowCount === 0) return next()
        
        if (cpfList.rowCount > 0 && cpfList.rows[0].id === Number(id)) return next()

        return res.sendStatus(409)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function validateCreateCustomer(req, res, next) {
    const { cpf } = req.body

    try {
        const cpfList = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])

        if (cpfList.rowCount !== 0) return res.sendStatus(409)

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}