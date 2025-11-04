const express = require('express');
const app = express();
const PORT = 3000;
const connection = require('./connection.js')


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

const drinks = [
    {
    id: 1,
    name: 'tea drink',
    price: 2.50
    },

    {
    id: 2,
    name: 'pepsi drink',
    price: 3.00
    },
    {
    id: 3,
    name: 'water drink',
    price: 1.50
    },
    {
    id: 4,
    name: 'orange juice drink',
    price: 2.00
}  
]

//CRUD operations on entity "pizzas"

//Index
app.get('/api/pizzas', (req, res) => {
    const sql = 'SELECT * FROM pizzas'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: 'Database query failed'});
        res.json(results);
    })


})

//Show
app.get('/api/pizzas/:id', (req, res) => {
    const pizzaId = parseInt(req.params.id)
    const sql = 'SELECT * FROM pizzas WHERE id = ?'

    connection.query(sql, [pizzaId], (err, results) => {
        if (err) return res.status(404).json({error: 'Pizza item not found'}); 
        res.json(results)
    })

    // const pizza = menu.find(p => p.id === pizzaId)
    // if (pizza) {
    //     res.json(pizza)
    // } else {
    //     res.status(404).json({
    //         error: true,
    //         message: 'Pizza Not Found'
    //     })
    // }
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
    const { id } = req.params

    const sql = 'DELETE FROM pizzas WHERE id = ?'

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({error: 'Server Error: object was NOT deleted from db'});
        res.sendStatus(204)
    })
})


//CRUD operations on entity "drinks"

//Index
app.get('/api/drinks', (req, res) => {
    res.json(drinks)
})  

//Show
app.get('/api/drinks/:id', (req, res) => {
    const drink_id = parseInt(req.params.id)
    const drink = drinks.find(d => d.id === drink_id)

    if (!drink) {
        res.status(404).json({
            error: true,
            message: 'Drink not Found'
        })
    } else {
        res.json(drink)
    }
})