const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
require('dotenv/config');
const cors = require('cors');

app.use(cors({}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


const commentsRoute = require('./routes/comments');
const newsRoute = require('./routes/news');

app.use('/comments', commentsRoute);
app.use('/news', newsRoute)

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true,
        useUnifiedTopology: true},
    () => console.log('Connected to DB...')
);

app.listen(3000, () => {
    console.log('Server start on port 3000....');
});

module.exports = app;
