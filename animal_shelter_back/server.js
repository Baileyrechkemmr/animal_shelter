// Requirements
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const AnimalsModel = require('./models/animals.js')

// Middleware
app.use(express.json())
app.use(cors())

// Routes
// index
app.get('/animals', async (req, res) => {
	const allAnimals = await AnimalsModel.find({})
	res.json(allAnimals)
})

// create
app.post('/animals', async (req, res) => {
	const createdAnimal = await AnimalsModel.create(req.body)
	res.json(createdAnimal)
})
// delete
app.delete('/animals/:id', async (req, res) => {
	const deletedAnimals = await AnimalsModel.findByIdAndRemove(req.params.id)
	res.json(deletedAnimals)
})
// update
app.put('/animals/:id', async (req, res) => {
	const updatedAnimals = await AnimalsModel.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)
	res.json(updatedAnimals)
})

// Mongoose / MongoDB
const mongoURI =
	'mongodb+srv://admin:Bojangles60@cluster0.cem210o.mongodb.net/animals?retryWrites=true&w=majority'

const db = mongoose.connection

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log('connection to mongo is established')
	})
	.catch((err) => {
		console.log('failed to connect to mongo:', err)
	})

// Listen - Broadcast
app.listen(3000, () => {
	console.log('listening...')
})
