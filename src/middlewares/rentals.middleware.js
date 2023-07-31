import { db } from "../database/database.js"

export async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const inexistentCustomer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])

        if (inexistentCustomer.rowCount === 0) return res.sendStatus(400)

        const inexistentGame = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])

        if (inexistentGame.rowCount === 0) return res.sendStatus(400)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
