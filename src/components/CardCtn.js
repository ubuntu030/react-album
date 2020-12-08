import { Card, Button } from 'react-bootstrap';

// TODO btn like style, add heart icon
// TODO add water fall style
const CardCtn = (props) => {
	console.log(props)
	let {
		id: id,
		description: desc,
		alt_description: alt_desc,
		urls: {
			small: url
		},
		user: {
			name: author
		}
	} = props;
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={url} />
			<Card.Body>
				<Card.Title>{author}</Card.Title>
				<Card.Text>
					{desc ? desc : alt_desc}
				</Card.Text>
				<Button variant="primary">Download</Button>{' '}
				<Button variant="outline-danger">Favorite</Button>
			</Card.Body>
		</Card>
	)
}

export default CardCtn;