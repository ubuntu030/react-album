import React from 'react';

import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Unsplash from './unsplash';

import CardCtn from './CardCtn';

class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			fmtPhotos: {},
			favorite: [],
			view: 'home'
		}
		this.handleAddFavorite = this.handleAddFavorite.bind(this);
		this.handleAddFavorite = this.handleAddFavorite.bind(this);
		this.handleChangeView = this.handleChangeView.bind(this);
	}


	componentDidMount() {
		getImage.call(this);
	}

	handleAddFavorite(id) {
		const self = this;
		let newData = Object.assign({}, self.state.fmtPhotos);

		newData[id].isFavorite = newData[id].isFavorite? false: true;
		this.setState({
			fmtPhotos: newData
		});
		// console.log(self.state.fmtPhotos)
		
	}

	handleChangeView(param) {
		this.setState({
			view: param ? param : 'home'
		})
		console.log('set view:' + param);
	}

	render() {
		let state = this.state;
		return (
			<div>
				<Navibar onChangeView={this.handleChangeView} />
				<Container>
					<Row>
						{
							Object.keys(state.fmtPhotos).map(key => {
								if (state.view === 'favorite' && state.fmtPhotos[key].isFavorite) {
									return (
										<Col xs={6} md={4} key={key}>
											<CardCtn onAddFavorite={this.handleAddFavorite} {...this.state.fmtPhotos[key]} />
										</Col>
									)
								} else {
									return (
										<Col xs={6} md={4} key={key}>
											<CardCtn onAddFavorite={this.handleAddFavorite} {...this.state.fmtPhotos[key]} />
										</Col>
									)
								}
							})
						}
					</Row>
					<Button onClick={() => getImage.call(this)}>Get pic!</Button>
				</Container>
			</div>
		);
	}
}

function Navibar(params) {
	const { onChangeView } = params;
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Album</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#home" onClick={() => onChangeView('home')}>Home</Nav.Link>
					<Nav.Link href="#link" onClick={() => onChangeView('favorite')}>Favorite</Nav.Link>
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
			formatPhotos.call(self, self.state.photos);
		})
}

function formatPhotos() {
	const self = this;
	let fmtPhotos = {};
	this.state.photos.forEach(data => {
		fmtPhotos[data.id] = data;
		fmtPhotos[data.id].isFavorite = false;
	})
	self.setState({ fmtPhotos: fmtPhotos })
	// console.log(self.state.fmtPhotos);
}

// TODO	favorite btn in card
// TODO download btn in card
// TODO filter, use searching bar 


export default Album;