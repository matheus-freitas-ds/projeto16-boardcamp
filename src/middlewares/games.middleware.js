import { db } from "../database/database.js"

export async function validateCreateGame(req, res, next) {
    const { name, stockTotal, pricePerDay } = req.body

    try {
        const game = await db.query(`SELECT * FROM games WHERE name = $1;`, [name])

        if (name === '' || stockTotal === 0 || pricePerDay === 0) return res.sendStatus(400)

        if (game.rowCount !== 0) return res.sendStatus(409)

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}