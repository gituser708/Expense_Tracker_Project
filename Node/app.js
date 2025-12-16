require('dotenv').config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRoute');
const errorHandler = require('./middlewares/errHandler');

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser());

app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);
app.use('/', errorHandler);


mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log('MongoDB Connected...');
}).catch((error) => {
    console.log('Error to connect to MongoDB');
    console.error(error);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
