import React from 'react';

import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Unsplash from './unsplash';

import CardCtn from './CardCtn';

class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: []
		}
	}

	componentDidMount() {
		getImage.call(this);
	}

	render() {
		return (
			<div>
				<Navibar />
				<Container>
					<Row>
						{
							this.state.photos.map((data, index) => (
								<Col xs={6} md={4} key={data.id}>
									<CardCtn {...data}/>
								</Col>
							))
						}
					</Row>
					<Button onClick={() => getImage.call(this)}>Get pic!</Button>
				</Container>
			</div>
		);
	}
}

function Navibar() {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Album</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#link">Favorite</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	)
}

// 取得相片
function getImage() {
	const self = this;
	return Unsplash.photos.getRandom({ count: 2, width: 800, query: 'nature' })
		.then(rsp => {
			if (rsp.type === 'success') {
				return rsp.response;
			} else {
				throw new Error('Something went wrong ...');
			}
		})
		.then(data => {
			self.setState(state => ({
				photos: state.photos.concat(data)
			}))
		})
}

// TODO	favorite btn in card
// TODO download btn in card
// TODO filter, use searching bar 


export default Album;