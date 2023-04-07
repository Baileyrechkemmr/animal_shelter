import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AnimalsCards from './AnimalsCards';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

function App() {
	//import for the feild values
	const [newName, setNewName] = useState('')
	const [newSpecies, setNewSpecies] = useState('')
	const [newImage, setNewImage] = useState('')
	const [newReservedForAdoption, setNewReservedForAdoption] = useState(false)

	//edit feild 
	// const [newEditName, setNewEditName] = useState('')
	// const [newEditSpecies, setNewEditSpecies] = useState('')
	// const [newEditImage, setNewEditImage] = useState('')
	// const [newEditReservedForAdoption, setNewEditReservedForAdoption] =
	// 	useState(false)
	const [updated, setUpdated] = useState(false)
	///for array data
	const [animals, setAnimals] = useState([])

	// event handler for name
	const handleNewNameChange = (e) => {
		setNewName(e.target.value)
	}

	// event handle for  species
	const handleNewSpeciesChange = (e) => {
		setNewSpecies(e.target.value)
	}

	// event handle for image
	const handleNewImageChange = (e) => {
		setNewImage(e.target.value)
	}

	// event handle for image
	const handleNewReservedForAdoptionChange = (e) => {
		setNewReservedForAdoption(e.target.value)
	}

	// handel for delete button
	const handleDelete = (animalData) => {
		axios.delete(`http://localhost:3000/animals/${animalData._id}`).then(() => {
			axios.get('http://localhost:3000/animals').then((response) => {
				setAnimals(response.data)
			})
		})
	}


	const callApi = () => {
		axios.get('http://localhost:3000/animals').then((response) => {
			setAnimals(response.data)
		})
	}

	// const handleEditAnimal = (e, animalData) => {
	// 	e.preventDefault()
	// 	axios
	// 		.put(`http://localhost:3000/animals/${animalData._id}`, {
	// 			name: newEditName || animalData.name,
	// 			species: newEditSpecies || animalData.species,
	// 			image: newEditImage || animalData.image,
	// 			reservedForAdoption:newEditReservedForAdoption || animalData.reservedForAdoption,
	// 		})
	// 		.then(
	// 			() => {
	// 				setUpdated(!updated)
	// 			},
	// 			(err) => err
	// 		)
	// }
	// event handler for posting the data base
	const handleNewAnimalFormSubmit = (e) => {
		e.preventDefault()
		axios
			.post('http://localhost:3000/animals', {
				name: newName,
				species: newSpecies,
				image: newImage,
				reservedForAdoption: newReservedForAdoption,
			})
			.then(
				() => {
					setUpdated(!updated)
				},
				(err) => err
			)
	}

	useEffect(() => {
		callApi()
	}, [updated])

	return (
		<>
			<h1 className='title'>Sunny Animal Shelter</h1>
			<section>
				<Container className='container'>
					<Col>
						<Form onSubmit={handleNewAnimalFormSubmit}>
							<Form.Group className='form'>
								<Form.Label className='name'>Name</Form.Label>
								<Form.Control type='text' onChange={handleNewNameChange} />
							</Form.Group>
							<Form.Group className='form'>
								<Form.Label className='species'>Species</Form.Label>
								<Form.Control type='text' onChange={handleNewSpeciesChange} />
							</Form.Group>
							<Form.Group className='form'>
								<Form.Label className='image'>URL Image</Form.Label>
								<Form.Control type='text' onChange={handleNewImageChange} />
							</Form.Group>
							{/* make below false by default for every animal */}
							Is Reserved For Adoption:{' '}
							<input
								type='checkbox'
								name='reservedForAdoption'
								onChange={handleNewReservedForAdoptionChange}
								disabled
							/>
							<br />
							<Button className='btn' type='submit'>
								Submit
							</Button>
						</Form>
					</Col>
				</Container>
			</section>
			<section>
				<h2>animals</h2>
				<div className='animalsCards'>
				<Row xs={2} md={3} >
					{animals.map((animals, i) => {
						return (
							// <li key={animals._id}>
							// 	{animals.reservedForAdoption ? (
							// 		<strike>{animals.name}</strike>
							// 	) : (
							// 		animals.name
							// 	)}
							// </li>
							<AnimalsCards
								key={i}
								animals={animals}
								handleDelete={handleDelete}
								updated={updated}
								setUpdated={setUpdated}
							/>
						)
					})}
					</Row>
					
					
				</div>
			</section>
		</>
	)
}

export default App;
