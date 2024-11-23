import express, { Application } from 'express'
import cors from 'cors';
import productRouter from './app/modules/product/bike_router';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// Router
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

export default app;