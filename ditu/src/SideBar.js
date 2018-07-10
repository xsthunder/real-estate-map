import React, {Component} from 'react';
import {
	str, log
}from './util'

import './App.css'


function Prediction(props){

}

class SideBar extends Component{
	constructor (props){
		super(props);
		this.renderType = {
			cluster:this.renderCluster,
			prediction:this.renderPrediction,
			house:this.renderHouse,
		}
		this.state = {
			data:{}
		}
	}
	renderPrediction(focus){
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
	renderCluster(focus){
		return (
			<div>
				<h4>{focus.title}</h4>
			</div>
		);
	}
	renderHouse(focus){
		return (
			<div>
				<h4>{focus.title}</h4>
			</div>
		);
	}
	render(){
		const focus = this.props.focus;
		if(!focus)return null; 
		log(focus);
		return (
			<div className="side-bar">
				{(this.renderType)[focus.type](focus)}
			</div>
		);
	}
}

export default SideBar;
