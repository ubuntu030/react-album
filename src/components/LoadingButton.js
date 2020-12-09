import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * @param  {Fucntion} props.onClickFn 
 * @param {Boolean} props.isLoading
 * @returns {Element} 
 */
const LoadingButton = props => {
	const { onClickFn, isLoading } = props;
	return (
		<Button
			onClick={isLoading ? null : onClickFn}
			disabled={isLoading}
			style={{
				position: "fixed",
				left: "50%",
				bottom: "0%",
				transform: "translate(-50%, -50%)"
			}}>
			{isLoading? 'Loading...': 'GET PIC!'}
		</Button>
	)
}

export default LoadingButton