import React from 'react';
function Prediction (props){
	const {
		lng,lat,msg
	} = props;
	return (
		<div>
		<h4>
			经度:{lng} 纬度:{lat}
		</h4>
		<p>
			{msg}
		</p>
		</div>
	);
}

export default Prediction;
