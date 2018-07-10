import React, {Component} from 'react';
import {
	str, log
}from './util'
import './App.css'
import ClusterInfo from './ClusterInfo';
import HouseInfo from './HouseInfo';
import PredictionInfo from './PredictionInfo';
import Search from './Search';
class SideBar extends Component{
	constructor (props){
		super(props);
		this.renderType = {
			cluster:this.renderCluster,
			prediction:this.renderPrediction,
			house:this.renderHouse,
			search:this.renderSearch,
		}
		this.state = {
			data:null // data to be loaded from props.promise
		}
	}
	renderSearch = ()=>{
		//TODO add keyword support as props from app
		return <Search />
			//		if(!data){
			//			return (<Loading/>)
			//		}
			//		const choices = data.choices;
			//
			//		return (
			//			<form style={{height:'300px',overflowY:'auto'}}>
			//				<ul>
			//				{Object.entries(data).map( (entry)=>{
			//						const k = entry[0];
			//						const v = entry[1];
			//						if(!Array.isArray(v))return null;
			//						if(k === "choices")return null
			//						const children = this.renderSelect(k,k,v);
			//						return (
			//						<li>
			//							{children}
			//						</li>
			//					);
			//				})}
			//				</ul>
			//				{
			//					choices.map( (o)=> this.renderHouse(o))
			//				}
			//			</form>
			//		);
	}
	renderPrediction = (focus)=>{
		// TODO add async support
		const {
			lng,lat,msg
		} = focus;
		return <PredictionInfo {...{lng,lat,msg}} />
	}
	renderCluster  = (focus)=>{
		// TODO add analyse and async support
		return <ClusterInfo {...{focus}}/>
	}
	renderHouse(focus){
		// TODO and detail and async support
		return <HouseInfo {...{focus}}/>
	}
	render(){
		const focus = this.props.focus;
		if(!focus)return null; 
		return (
			<div className="side-bar">
				{(this.renderType)[focus.type](focus)}
			</div>
		);
	}
}

export default SideBar;
