require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:edward_1@cluster0-gywpj.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (error) => {
    console.error('Error connecting to mongo', error);
});

app.get('/',requireAuth, (req, res) =>{
    res.send(`Your email: ${req.user.email}`);
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});