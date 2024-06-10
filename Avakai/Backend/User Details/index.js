const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use('/register',require('./Routes/Register'))
app.use('/fetch',require('./Routes/Fetch'))
app.use('/update',require('./Routes/Update'))
app.use('/delete',require('./Routes/Delete'))
app.use('/api', require('./Routes/Login'));
app.listen(5000,()=>{
    console.log("server started")
})