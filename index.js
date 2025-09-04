const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Pizzeria API's service at http://localhost:${PORT}`)
})


//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Pizzeria API service')
})

const menu = [
    {
      id: 1,
      name: "Margherita",
      image: "imgs/margherita.webp",
      ingredients: ["pomodoro", "mozzarella"],
    }, 
    {
      id: 2,
      name: "Marinara",
      image: "imgs/marinara.jpeg",
      ingredients: ["pomodoro", "aglio", "origano"],
    }, {
      id: 3,
      name: "Diavola",
      image: "imgs/diavola.jpeg",
      ingredients: ["pomodoro", "mozzarella", "salame piccante"],
    }, {
      id: 4,
      name: "Bufalina",
      image: "imgs/bufalina.jpeg",
      ingredients: ["pomodoro", "mozzarella di bufala"],
    }, {
      id: 5,
      name: "4 formaggi",
      image: "imgs/4_formaggi.jpeg",
      ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
    }
  ]

//CRUD operations

//Index
app.get('/api/pizzas', (req, res) => {
    res.json(menu)
})

//Show
app.get('/api/pizzas/:id', (req, res) => {
    const pizzaId = parseInt(req.params.id)
    const pizza = menu.find(p => p.id === pizzaId)
    if (pizza) {
        res.json(pizza)
    } else {
        res.status(404).json({
            error: true,
            message: 'Pizza Not Found'
        })
    }
})

//Store
app.post('/api/pizzas', (req, res)=> {
    res.send('Create a new pizza')
})

//Update
app.put('/api/pizzas/:id', (req, res)=> {
    res.send('Update the single pizza with id ' + req.params.id)
})

//Modify
app.patch('/api/pizzas/:id', (req, res)=> {
    res.send('Partial update the single pizza with id ' + req.params.id)
})

//Destroy
app.delete('/api/pizzas/:id', (req, res)=> {
    res.send('Delete the single pizza with id ' + req.params.id)
})