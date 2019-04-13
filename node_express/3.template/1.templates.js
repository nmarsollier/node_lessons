const express = require('express')
const app = express()
const hbs = require('hbs')

app.set('view engine', 'hbs')

app.get('/about', (req, res) => {
    res.render('about', { catedra: 'Programacion avanzada' })
})

app.listen(3000, () => console.log('Server ready'))