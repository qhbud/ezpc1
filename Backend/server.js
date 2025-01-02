const {Client} = require('pg')
const express = require('express');
const cors = require('cors');
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const app = express();

app.use(cors());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "pass",
    database: "postgres"
})

client.connect();

app.get('/api/data', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM "public"."Build"');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.use(express.json());

app.post('/api/data', async (req, res) => {
    try {
        console.log('Req: ' +req);
        console.log('Req Body: ' + req.body);
        const { gpu, cpu, cooler, ram, numram, drive, numstorage, mobo, psu } = req.body;
        console.log('gpu: ' + gpu);

        const newBuild = await prisma.build.create({
            data: {
                gpu,
                cpu,
                cooler,
                ram,
                numram,
                drive,
                numstorage,
                mobo,
                psu
            }
        });

        res.status(200).json(newBuild);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));