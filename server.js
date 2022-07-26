// ==== dependances
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const colors = require('colors')

const morgan = require('morgan')
const dotenv = require('dotenv').config()

//connect to database
connectDB()

// ==== Variables & initialisation
const PORT = process.env.PORT || 2000
const app = express()

app.use(morgan('dev'))
app.use(
  cors({
    origin: '*',
  }),
)
// ===============================================static Images Folder
app.use('/public/upload', express.static('./public/upload'))

// ==== Routes
app.use(express.urlencoded({ extended: false }))

//Root URL
app.get('/', (req, res) => {
  res.status(200).send({ message: `Bienvenue sur l'api de la SFAC` })
})

// Routes
app.use('/products', require('./routes/productRoutes'))
app.use('/kanbans', require('./routes/kanbanRoutes'))
app.use('/requests', require('./routes/requestRoutes'))
// app.use('/orders', require('./routes/orderRoutes'))



// ==== Start server
app.listen(PORT, () =>
  console.log(
    `✅✅  Server running in ${process.env.NODE_ENV} mode  ✅✅ go to the port => http://localhost:${PORT}/<`
      .bgCyan.red,
  ),
)
