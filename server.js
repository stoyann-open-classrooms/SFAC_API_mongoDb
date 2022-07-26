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
app.get('/kanban/api/v1', (req, res) => {
  res.status(200).send({ message: `Bienvenue sur l'api kanban V1` })
})

// Routes
app.use('/kanban/api/v1/products', require('./routes/productRoutes'))
app.use('/kanban/api/v1/kanbans', require('./routes/kanbanRoutes'))
app.use('/kanban/api/v1/requests', require('./routes/requestRoutes'))
app.use('/kanban/api/v1/orders', require('./routes/orderRoutes'))

// ==== Start server
app.listen(PORT, () =>
  console.log(
    `✅✅  Server running in ${process.env.NODE_ENV} mode  ✅✅ go to the port => http://localhost:${PORT}/<`
      .bgCyan.red,
  ),
)
