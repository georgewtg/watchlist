const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    
    ssl: {
        require: true,
    }
});

pool.connect().then(() => {
    console.log("💡 Account Connected to PostgreSQL database");
});

async function addData(req, res) {
    const {title, status, current, total} = req.body

    try {
        const result = await pool.query(
            `INSERT INTO watchlist (title, status, current, total)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, status, current, total]
        );
        const newData = result.rows[0];
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

async function removeData(req, res) {
    try {
        const result = await pool.query(
            `DELETE FROM watchlist WHERE id = ${req.params.id}`
        );
        
        res.status(201).json({message: "Event deleted"})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

async function getList(req, res) {
    try {
        const result = await pool.query(
            `SELECT * FROM watchlist`
        );

        if (!result) {
            res.json({msg: "Watchlist is empty"});
        } else {
            res.json(result.rows);
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    addData,
    removeData,
    getList,
};