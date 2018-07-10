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
	componentDidMount(){
		const p = this.props.promise;
		p&&p.then( (data)=>{
			this.setState({data,});
		});
	}
	renderSearch = ()=>{
		//TODO add keyword support as props from app
		return <Search focus={this.props.focus} data={this.state.data} handleChange={this.props.handleChange}/>
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
				{(this.renderType)[focus._type](focus)}
			</div>
		);
	}
}

export default SideBar;
