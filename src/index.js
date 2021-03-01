const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config()
const path = require('path');
const cors = require('cors');
//All Routes import
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')
const pageRoutes = require('./routes/admin/page')
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const homePageRoutes = require('./routes/admin/homePageBanner')

const app = express()
app.use(cors())
app.use(express.json())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public',express.static(path.join(__dirname, 'uploads')))



//All Routes Use
app.use('/api', userRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)
app.use('/api', pageRoutes)
app.use('/api', addressRoutes)
app.use('/api', orderRoutes)
app.use('/api', homePageRoutes)


//Mogodb Database Connected
mongoose.connect(
    `mongodb+srv://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PASS}@cluster0.viqsx.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
)
.then(() => console.log("MongoDb connected"))
.catch(err => console.log(err));


app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hello Worlkd"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})