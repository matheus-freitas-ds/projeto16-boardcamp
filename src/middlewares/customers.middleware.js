import { db } from "../database/database.js"
import dayjs from "dayjs"

export async function validateCreateCustomer(req, res, next) {
    const { name, phone, cpf, birthday } = req.body

    try {
        const cpfList = await db.query(`SELECT * FROM games WHERE name = $1;`, [cpf])

        if (!name || Number(phone).length !== 10 || Number(phone).length !== 11|| Number(cpf).length !== 11 || dayjs(birthday).isValid() === false) return res.sendStatus(400)

        if (cpfList.rowCount !== 0) return res.sendStatus(409)

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}