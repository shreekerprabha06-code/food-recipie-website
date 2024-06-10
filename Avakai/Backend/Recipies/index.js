const express = require('express')
const PORT = 2000
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/fetch',require('./Routes/fetch'))
app.use('/register',require('./Routes/register'))
app.use('/fetchbyname',require('./Routes/fetchbyname'))
app.use('/delete',require('./Routes/delete'))

app.listen(PORT,()=>{
    console.log(`server loading.... ${PORT}`)
})
