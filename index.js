const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Pizzeria API's service at http://localhost${PORT}`)
})


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Pizzeria API service')
})