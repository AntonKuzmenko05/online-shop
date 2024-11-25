require('dotenv').config()
const express = require('express')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const sequelize = require('./db.js');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler) // Error in the end)

const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Server started successfully ${PORT}`))
    }catch (e){
    console.log(e);
    }
}
start();
