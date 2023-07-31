import { db } from "../database/database.js"

export async function validateCreateCustomer(req, res, next) {
    const { name, phone, cpf, birthday } = req.body

    try {
        const cpfList = await db.query(`SELECT * FROM customers WHERE cpf = $3;`, [cpf])

        if (cpfList.rowCount !== 0) return res.sendStatus(409)

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}