import React from 'react';
import searchData from './dev/search.json';
import Loading from './Loading';
import Select from './Select';
import HouseInfo from './HouseInfo';
import Err from './Err';
import {
	log,
}from './util';
function Search (props){
	const {
		data ,
		handleChange ,
		focus
	} = props;

	if(!data){
		return (<Loading/>)
	}
	if(data.err){
		return (<Err {...data}/>);
	}
	const choices = data.choices;
	return (
		<form style={{height:'300px',overflowY:'auto'}}>
			<ul>
			{Object.entries(data).map( (entry)=>{
					const k = entry[0];
					const label = k;
					const arr = entry[1];
					if(!Array.isArray(arr))return null;
					if(k === "choices")return null
					//TODO pass handle as props from APP
					//avoid use of key
					const children = (<Select 
							value={focus[k]}
							{...{label, k, arr}} 
							handleChange={handleChange}
					/>);
					return (
					<li>
						{children}
					</li>
				);
			})}
			</ul>
			{
				choices.map( (o)=> (<HouseInfo focus={o}/>))
			}
		</form>
	);
}
export default Search;
