const express = require('express')
const app = express()


app.get('/', (req: Request, res) => {
    res.send('Hello World!')
})



export default app;