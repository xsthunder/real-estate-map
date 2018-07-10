import React from 'react';
import searchData from './dev/search.json';
import Loading from './Loading';
import Select from './Select';
import HouseInfo from './HouseInfo';
import {
	log,
}from './util';
function Search (props){
	const data = props.data; 
	if(!data){
		return (<Loading/>)
	}
	const choices = data.choices;
	return (
		<form style={{height:'300px',overflowY:'auto'}}>
			<ul>
			{Object.entries(data).map( (entry)=>{
					const k = entry[0];
					const label = k;
					const arr = entry[1];
					log(arr, k);
					if(!Array.isArray(arr))return null;
					if(k === "choices")return null
					//TODO pass handle as props from APP
					//avoid use of key
					const children = (<Select 
							{...{label, k, arr}} 
							handleChange={()=>{}
						}
						value=''
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
