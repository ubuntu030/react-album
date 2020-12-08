import { Card, Button } from 'react-bootstrap';

// TODO btn like style, add heart icon

const CardCtn = (props) => {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="/20201108-IMG_6029.jpg" />
			<Card.Body>
				<Card.Title>Card Title</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the bulk of
					the card's content.
    </Card.Text>
				<Button variant="primary">Go somewhere</Button>{' '}
				<Button variant="outline-danger">Danger</Button>
			</Card.Body>
		</Card>
	)
}

export default CardCtn;