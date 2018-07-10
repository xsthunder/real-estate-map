import React, {Component} from 'react';
import {
	str, log,WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
}from './util'
import './App.css'
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
			data:{}
		}
	}
	renderSelect(arr, cur){

	}
	renderSearch(){

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
				<h4 >{focus.title}</h4>
				<h5 >
						均价: {fix2(focus.avg)+WANYUAN_UNIT}
				</h5>
				<h5>
						最低价:{fix2(focus.min)+WANYUAN_UNIT} 
				</h5>
				<h5>
						最高价:{fix2(focus.max)+WANYUAN_UNIT} 
				</h5>
			</div>
		);
	}
	renderHouse(focus){
		const {
			age,
			decoration,
			elevator,
			oriented,
			price,
			room_type,
			size,
		} = focus.content
		const unit = focus.avg;
		const wrapper = (f, v, e='')=>{
			if(!v)return null;
			return (<li> {`${f}${v}${e}`} </li>);
		}
		return (
			<div>
				<h4>{focus.title}</h4>
				<ul>
					{wrapper('楼龄: ',age,'年')}
					{wrapper('装修: ',decoration)}
					{wrapper('电梯: ',elevator)}
					{wrapper('朝向: ',oriented)}
					{wrapper('单价: ',fix2(unit),WANYUAN_UNIT)}
					{wrapper('总价: ',fix2(price), WANYUAN)}
					{wrapper('面积: ',size,SQAURE_METER)}
				</ul>
			</div>
		);
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
