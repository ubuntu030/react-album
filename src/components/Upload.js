
import React from 'react';

function Upload(props) {
	const { onChangeHandler, onUploadHandler } = props;

	return (
		<div>
			<input type="file" id="file" name="file" onChange={(event) => onChangeHandler(event)} />
			<button onClick={onUploadHandler}>upload!</button>
		</div>
	)
}

export default Upload;



