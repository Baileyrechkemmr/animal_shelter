const mongoose = require('mongoose')

const animalsSchema = new mongoose.Schema({
	name: String,
	species: String,
	image: String,
	reservedForAdoption: Boolean,
})

const Animals = mongoose.model('Animals', animalsSchema)

module.exports = Animals
