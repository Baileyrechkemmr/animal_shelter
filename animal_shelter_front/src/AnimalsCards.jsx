import { useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/Button";
import './App.css'

const AnimalsCards = (props) => {
	const [newEditName, setNewEditName] = useState('')
	const [newEditSpecies, setNewEditSpecies] = useState('')
	const [newEditImage, setNewEditImage] = useState('')
	const [newEditReservedForAdoption, setNewEditReservedForAdoption] =
		useState(false)

	// event handler for name
	const handleNewEditNameChange = (e) => {
		setNewEditName(e.target.value)
	}

	// event handle for  species
	const handleNewEditSpeciesChange = (e) => {
		setNewEditSpecies(e.target.value)
	}

	// event handle for image
	const handleNewEditImageChange = (e) => {
		setNewEditImage(e.target.value)
	}

	// event handle for adoption
	const handleNewEditReservedForAdoptionChange = (e) => {
		setNewEditReservedForAdoption(e.target.value)
	}



	const handleEditAnimal = (e, animalData) => {
		e.preventDefault()
		axios
			.put(`http://localhost:3000/animals/${animalData._id}`, {
				name: newEditName || animalData.name,
				species: newEditSpecies || animalData.species,
				image: newEditImage || animalData.image,
				reservedForAdoption:
					newEditReservedForAdoption || animalData.reservedForAdoption,
			})
			.then(
				() => {
					props.setUpdated(!props.updated)
				},
				(err) => err
			)
	}
	console.log(props)
	return props.animals.reservedForAdoption ? (
		<></>
	) : (
		
			<Col >
				<Card style={{ width: '18rem' }}>
					<Card.Img variant='top' src={props.animals.image} alt='' />
					<Card.Body>
						<Card.Title className='card-title'>{props.animals.name}</Card.Title>
						<ListGroup variant='flush'>
							<ListGroup.Item className='card-list-text'>
								Species: {props.animals.species}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-check-box'>
								reserved for adoption: <input type='checkbox' disabled />
							</ListGroup.Item>
							<Button
								onClick={(e) => {
									props.handleDelete(props.animals)
								}}
							>
								Delete
							</Button>
							<Container className='container'>
								<Col>
									<Form onSubmit={(e)=>{ handleEditAnimal(e, props.animals)}}>
										<Form.Group className='form'>
											<Form.Label className='name'>Name</Form.Label>
											<Form.Control
												type='text'
												onChange={handleNewEditNameChange}
											/>
										</Form.Group>
										<Form.Group className='form'>
											<Form.Label className='species'>Species</Form.Label>
											<Form.Control
												type='text'
												onChange={handleNewEditSpeciesChange}
											/>
										</Form.Group>
										<Form.Group className='form'>
											<Form.Label className='image'>URL Image</Form.Label>
											<Form.Control
												type='text'
												onChange={handleNewEditImageChange}
											/>
										</Form.Group>
										<Form.Group className='form'>
											<Form.Label className='reservedForAdoption'>
												Is Reserved For Adoption
											</Form.Label>
											<input
												type='checkbox'
												name='reservedForAdoption'
												onChange={handleNewEditReservedForAdoptionChange}
											
											/>
											<br />
										</Form.Group>
										<Button className='btn' type='submit'>
											Submit
										</Button>
									</Form>
								</Col>
							</Container>
						</ListGroup>
					</Card.Body>
				</Card>
			</Col>
		
	)
}

export default AnimalsCards
