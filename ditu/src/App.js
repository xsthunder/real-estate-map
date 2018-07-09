import React, { Component } from 'react';
import {Map, Marker} from 'react-bmap';
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
			markers:[]
		});
	}
	handleView = (p1, p2, level)=>{
		this.updateMakers(p1, p2, level).then(
			(markers)=>{
				this.setState({markers});
			})
	}
	componentDidMount(){
		this.handleView();//init marker
	}
	updateMakers = async (p1, p2, level)=>{
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
		markers = markers.map(
			o=><Marker position={o} key={str(o.lng)+str(o.lat)} />
		);
    return (
			<Map center="上海市" zoom="12" enableScrollWheelZoom={true} className='map' style={{ height:'100%' }}>
			{markers}
			</Map>
		);
  }
}

export default App;
