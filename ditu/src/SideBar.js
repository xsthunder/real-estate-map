import React, {Component} from 'react';
import Loading from './Loading';
import {
	str, log,WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
}from './util'
import './App.css'
import ClusterInfo from './ClusterInfo';
import HouseInfo from './HouseInfo';
import PredictionInfo from './PredictionInfo';
import Select from './Select';
import searchData from './dev/search.json';
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
	renderSelect = (label,key,arr)=>{
		const k = key;//avoid use of key
		return <Select 
			{...{label, k, arr}} 
			handleChange={this.handleSelect}
			value=''//TODO pass as props from APP
						/>
	}
	renderSearch = ()=>{//ignore focus;
		const data = searchData;
		if(!data){
			return (<Loading/>)
		}
		const choices = data.choices;
		return (
			<form style={{height:'300px',overflowY:'auto'}}>
				<ul>
				{Object.entries(data).map( (entry)=>{
						const k = entry[0];
						const v = entry[1];
						if(!Array.isArray(v))return null;
						if(k === "choices")return null
						const children = this.renderSelect(k,k,v);
						return (
						<li>
							{children}
						</li>
					);
				})}
				</ul>
				{
					choices.map( (o)=> this.renderHouse(o))
				}
			</form>
		);
	}
	renderPrediction = (focus)=>{
		const {
			lng,lat,msg
		} = focus;
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
	renderCluster  = (focus)=>{
		return <ClusterInfo {...{focus}}/>
	}
	renderHouse(focus){
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
