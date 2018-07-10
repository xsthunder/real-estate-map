import React from 'react';
import {Marker} from 'react-bmap';
import redImg from './red.png'
import greenImg from './green.png'
import {
	str, log, WANYUAN_UNIT
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
	const testDistrict = /区$/g
	if(testDistrict.test(title)){
		/*striped trailing 区*/
		title = title.substr(0 , title.length - 1);
	}
	return(
			<Marker position={o} title={o.title} map={map} >
				<div {...events} className="cluster-size" style={{
					background:`url(${focus?greenImg:redImg})`, 
				}}>
						<div className="cluster-size" style={{
						position:'absolute',
						marginTop: '8px',
						display:'block',
						textAlign:'center' ,
						color:'white',
						}} >
							{title/*striped trailing 区*/}
							<br/>
							{(o.avg/10000).toFixed(0)}{WANYUAN_UNIT}
							<br/>
							{o.total + "套"}
							<br/>
						</div>
				</div>
			</Marker>
	);
	}
}

export default Cluster;

