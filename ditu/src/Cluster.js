import React from 'react';
import {Marker} from 'react-bmap';
import redImg from './red.png'
import greenImg from './green.png'
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
		log(e);
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
	return(
			<Marker position={o} title={o.title} map={map} >
				<div onClick={function(){alert(1)}}  {...events} className="cluster-size" style={{
					background:`url(${focus?greenImg:redImg})`, 
				}}>
						<div className="cluster-size" style={{
						position:'absolute',
						marginTop: '8px',
						display:'block',
						textAlign:'center' ,
						color:'white',
						}} >
							{o.title}
							<br/>
							{(o.avg/10000).toFixed(0)}万元/㎡
							{o.total>1?<br/>:null}
							{o.total>1?(o.total + "套"):null}
							<br/>
						</div>
				</div>
			</Marker>
	);
	}
}

export default Cluster;

