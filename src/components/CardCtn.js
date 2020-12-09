import { Card, Button, Form } from 'react-bootstrap';

// TODO btn like style, add heart icon
// TODO add water fall style
const CardCtn = (props) => {
	let {
		id,
		description: desc,
		alt_description: alt_desc,
		urls: {
			small: url
		},
		user: {
			name: author
		},
		isFavorite,
		onAddFavorite
	} = props;
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={url} />
			<Card.Body>
				<Card.Title>{author}</Card.Title>
				<Card.Text>
					{desc ? desc : alt_desc}
				</Card.Text>
				<Form>
					<Button variant="primary" id={id} onClick={() => { downloadImg(url) }} >Download</Button>{' '}
					<Button
						variant={isFavorite ? 'danger' : 'outline-danger'}
						onClick={() => onAddFavorite(id)}>
						Favorite</Button>
				</Form>
			</Card.Body>
		</Card>
	)
}
// FIXME: download
function downloadImg(url) {
	let file_path = url;
	let a = document.createElement('A');
	a.href = file_path;
	a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

export default CardCtn;