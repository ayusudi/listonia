//LISTONIA
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const errHandler = require('./middlewares/errHandler')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))


mongoose.connect(process.env.ATLAS, {
    useNewUrlParser : true , useUnifiedTopology: true 
}, function(err){
    if(err) {
        console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

app.use('/', index)
app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Helloo livecode from port ${PORT}`);
})