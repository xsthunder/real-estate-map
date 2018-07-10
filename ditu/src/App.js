import React, { Component } from 'react';
import {Map} from 'react-bmap';
import Cluster from './Cluster';
import House from './House';
import SideBar from'./SideBar';
import './App.css';
import searchIcon from './search-icon.png';
import {
	getPoints,
	getPredict,
	getSearch,
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
			search:{},
		});
		this.events = {
			zoomend:this.handleView,
			dragend:this.handleView,
			rightclick:this.predict,
		}
	}
	predict = (e)=>{
		const point = e.point;
		getPredict(point).then(
			(focus)=>{
				this.handleFocus(focus);
			}
		)
	}
	handleSearch = (key,e)=>{
		if(key&&e){
			const val = e.target.value;
			this.setState({
				[key]:val
			});
		}
	}
	handleFocus = (focus)=>{
		log(focus);
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
				this.setState({
					markers,
					focus:null,
				});
				log(markers)
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
			(o,i)=>{
				const props = {
					obj:o,
					key:o.title,
					handleClick:(e)=>{
						this.handleFocus(o)
					}
				}
				if(!o.content){
					o.type = 'cluster';
					return (<Cluster {...props}/>)
				}
				else {
					o.type = 'house';
					return (<House {...props}/>)
				}
			}
		);
		return (
				<Map center="上海市" zoom="12" enableScrollWheelZoom={true} style={{
					heigth:"100%"
				}} events={this.events}>
				{markers}
				<SideBar focus={this.state.focus} promise={new getSearch()}/>
				<img 
					onClick={()=>{
						this.handleFocus({type:'search'})
					}} 
							className='search-icon' src={`${searchIcon}`}/>
				</Map>
		);
  }
}

export default App;
