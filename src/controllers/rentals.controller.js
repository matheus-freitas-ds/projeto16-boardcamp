import { db } from "../database/database.js"
import dayjs from "dayjs"

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id;`)

        const displayRentals = rentals.map((rental) => {

            const formatRentals = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            }

            delete formatRentals.customerName
            delete formatRentals.gameName
            return formatRentals
        })

        res.send(displayRentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { pricePerDay } = res.locals

    try {
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, null, null);`, [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), pricePerDay * daysRented])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}