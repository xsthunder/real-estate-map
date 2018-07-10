import React from 'react';
import {Marker} from 'react-bmap';
import {
	str, log
}from './util'
class Cluster  extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			focus: false,
		}
		this.events = {
			onMouseEnter: this.mouseover,
			onMouseLeave: this.mouseout,
			onClick: this.props.handleClick,
		}
	}
	handleMouse = (focus,e)=>{
		this.setState({focus});
	}
	mouseover = (e)=>{
		this.handleMouse(true,e);
	}
	mouseout = (e)=>{
		this.handleMouse(false,e);
	}
	onclick = (e)=>{
		// open a info window
	}
	render(){
	const o = this.props.obj;
	const map = this.props.map;
	const events =this.events;
	const focus = this.state.focus;
	let title = o.title;
	return(
			<Marker position={o} title={o.title} map={map} >
				<div {...events} className={focus?'map-house-focus':'map-house'} >
							{(o.avg/10000).toFixed(0)}万元/㎡
				</div>
			</Marker>
	);
	}
}

export default Cluster;

