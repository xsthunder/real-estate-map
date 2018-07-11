import React from 'react';
import searchData from './dev/search.json';
import Loading from './Loading';
import Select from './Select';
import HouseInfo from './HouseInfo';
import Err from './Err';
import './App.css';
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
		// get a copy of state 
		const prevState = Object.assign({},this.state); //immutatble

		const prevData = prevState.data;//immutatble
		const query = {};
		searchLevel.forEach(o=>query[o]=prevState[o])
		log(e,query);
		if(key){
			const val = e.target.value;
			query[key] = val;
			const level = (searchLevel.indexOf(key))
			const toBeRm = searchLevel.slice(level + 1)
			log('tobeRm',toBeRm);
			toBeRm.forEach( (o)=>query[o]='' );
		}
		getSearch(query).then(
			(data)=>{
				if(key && prevData){
				//update only lower level
					const level = (searchLevel.indexOf(key))
					const unChange = searchLevel.slice(0,level + 1)
					unChange.forEach( (o)=>data[o]=prevData[o] );
				}
				this.setState({...query,data})
			}
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
			<form className="scroll">
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
