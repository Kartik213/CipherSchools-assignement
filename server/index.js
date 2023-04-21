const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/profile');

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


//Mongo
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port, () => console.log(`Server port: ${port}`));
}).catch((error) => console.log(`${error} did not connect`));

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/',(req, res)=>{
    res.status(200).json('Server is Live');
})

module.exports = app;
