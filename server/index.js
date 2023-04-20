const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/auth')
const profileRouter = require('./routes/profile');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cookieParser());
dotenv.config();
app.use(cors());

//Mongo
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port, () => console.log(`Server port: ${port}`));
}).catch((error) => console.log(`${error} did not connect`));

app.use('/auth/',userRouter);

app.use('/profile/', profileRouter);

app.get('/',(req, res)=>{
    res.status(200).json('Server is Live');
})

module.exports = app;
