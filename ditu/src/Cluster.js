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
	}
	render(){
	const o = this.props.obj;
	const map = this.props.map;
	return(
			<Marker position={o} title={o.title} map={map}>
				<div onClick={function(){alert(1)}} className="marker-size" style={{
						background:`url(${redImg})`, 
				}}>
						<div className="marker-size" style={{
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

