import React, { Component } from 'react';
import {Map} from 'react-bmap';
import Cluster from './Cluster';
import House from './House';
import './App.css';
import {
	getPoints,
}from './req'
import {
	str, log
}from './util'

class App extends Component {
	constructor(props){
		super(props);
		this.state = ({
			markers:[],
			focus:null,
		});
		this.events = {
			zoomend:this.handleView,
			dragend:this.handleView,
		}
	}
	handleFocus = (focus)=>{
		this.setState({focus});
	}
	handleView = (e)=>{
		let p;
		if( e ){
			const mp = e.target;
			const level = mp.getZoom();
			const bound = mp.getBounds();
			const p1 = bound.getSouthWest();
			const p2 = bound.getNorthEast();
			p = this.updateMakers(p1, p2, level)
		}
		else {
			p = this.updateMakers();
		}
		p.then(
			(markers)=>{
				this.setState({markers});
			})
	}
	componentDidMount(){
		this.handleView();//init marker
	}
	updateMakers = async (p1, p2, level)=>{
//		log(p1,p2,level);
		try {
			let res = await getPoints(p1,p2,level);
			return res.data;
		}
		catch (err){
			alert('Failed to fectch Points');
			log(err);
			return [];
		}
	}
	render() {
		let markers = this.state.markers;
		log(markers);
		markers = markers.map(
			(o,i)=>{
				const props = {
					obj:o,
					key:i,
					handleClick:()=>{this.handleFocus(o)}
				}
				if(!o.content)
					return (<Cluster {...props}/>)
				else 
					return (<House {...props}/>)
			}
		);
		return (
			<Map center="上海市" zoom="12" enableScrollWheelZoom={true} style={{
				heigth:"100%"
			}} 
				events={this.events}>
			{markers}
			</Map>
		);
  }
}

export default App;
