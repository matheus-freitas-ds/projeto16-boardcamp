import { db } from "../database/database.js"

export async function validateCreateGame(req, res, next) {
    const { name } = req.body

    try {
        const game = await db.query(`SELECT * FROM games WHERE name = $1;`, [name])

        if (game.rowCount !== 0) return res.sendStatus(409)

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}