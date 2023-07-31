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


export async function validateDeleteRental(req, res, next) {
    const { id } = req.params

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])

    if (rental.rowCount === 0) return res.sendStatus(404)

    if (rental.rows[0].returnDate === null) return res.sendStatus(400)

    next()
}