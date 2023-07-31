import { db } from "../database/database.js"

export async function validateRental(req, res, next) {
    const { customerId, gameId } = req.body

    try {
        const inexistentCustomer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if (inexistentCustomer.rowCount == 0) return res.sendStatus(400)

        const inexistentGame = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])
        if (inexistentGame.rowCount == 0) return res.sendStatus(400)

        const GameStock = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [gameId])
        if (GameStock.rowCount >= inexistentGame.rows[0].stockTotal) return res.sendStatus(400)

        res.locals.pricePerDay = inexistentGame.rows[0].pricePerDay
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}