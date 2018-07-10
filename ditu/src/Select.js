import React from 'react';
import {
	log
}from './util';
function Select(props){
	const {
		label, k, arr, handleChange, value
	} = props;

	return (
	<label key={label}>
		{label}
		<select value={value}  onChange={e=>handleChange(k,e)}>
				{
					arr.map( (o)=>
						(<option value={o} key={o}>{o}</option>)
					)
				}
			</select>
	</label>
	);
}
export default Select;
