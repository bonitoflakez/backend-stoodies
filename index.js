import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`App running on:  http://localhost:${process.env.PORT}`)
})
