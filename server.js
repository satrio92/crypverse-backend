const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user_model')

// import Routes
const userRoute = require('./router/user_route')
const authRoute = require('./router/auth_route')
const emailVerif = require('./router/verif_route')

mongoose.connect('mongodb+srv://kukuh_satrio:kukuhsatrio123@cluster0.jf4gbun.mongodb.net/crypverse?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

const app = express()

app.use(cors())

app.set('view engine', 'ejs')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.json({project: "Crypverse"})
})

app.use('/user', userRoute)

app.use('/me', authRoute)

app.use('/email-activation', emailVerif)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});