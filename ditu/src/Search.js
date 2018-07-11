import React from 'react';
import searchData from './dev/search.json';
import Loading from './Loading';
import Select from './Select';
import HouseInfo from './HouseInfo';
import Err from './Err';
import {
	log,warn, searchLevel
}from './util';
import {
	getSearch,
}from './req';
class Search extends React.Component{
	constructor(props){
		super(props);
		const state = {};
		searchLevel.forEach( (o)=>state[o] = '');
		state['data'] = null;
		this.state = state;
	}
	componentDidMount(){
	}
	handleChange = (key,e)=>{
		// TODO add cancel
		// FIXME assume promise finished in sequence
		// FIXME depend on previous state, use updater instead
		const query = {};
		const state = this.state;
		searchLevel.forEach( (o)=>{
			if(state[o])query[o] = state[o]
		});
		log(e,query);
		if(key){
			const val = e.target.value;
			query[key] = val;
		}
		//TODO clear lower level;
		getSearch(query).then(
			(data)=>this.setState({...query,data})
		);
	}
	render(){
		const {
			data,
		} = this.state;
		const query = this.state
		const handleChange = this.handleChange;
		if(!data){
			this.handleChange();
			return (<Loading/>)
		}
		if(data.err){
			return (<Err {...data}/>);
		}
		const choices = data.choices;
		log(data)
		return (
			<form style={{height:'300px',overflowY:'auto'}}>
			<ul>
				{Object.entries(data).map( (entry)=>{
					const k = entry[0];
					const label = k;
					let arr = entry[1];
					if(!Array.isArray(arr))return null;
					if(k === "choices")return null
					arr = arr.concat(['']);
					//avoid use of key
					const children = (<Select 
						value={query[k]}
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
				choices?choices.map( (o)=> (<HouseInfo focus={o}/>)):null
			}
			</form>
		);
	}
}
export default Search;
