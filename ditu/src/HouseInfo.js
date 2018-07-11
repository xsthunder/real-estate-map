import React from 'react';
import {
	str, log,WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
}from './util'
const wrapper = (f, v, e='')=>{
	if(!v)return null;
	return (<li> {`${f}${v}${e}`} </li>);
}
const style = {
	style:{
		cursor:'pointer',
	}
}
class HouseInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			expand:false,
		}
	}
	renderNormal(){
		const props = this.props;
		const {
			fold,focus
		} = props;
		const  {
			title,
		} = focus;
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
		return (
			<div>
				<h4>{title}</h4>
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
	handleClick = (prevState, props)=>{
		this.setState((prevState, props)=>
			{
				return {expand:!prevState.expand}
			} );
	}
	renderExpand(){
		const props = this.props;
		const {
			fold,focus
		} = props;
		const {
			title,
		} = focus;
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
		return (
			<div onClick={this.handleClick} {...style}>
				<div className="inline">-</div>
				<div className="inline">{title}</div>
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

	renderCollapse(){
		let{
			title,
		} = this.props.focus;
		log(title ,this.props.focus.content );
		if(title.length > 16){
			title = title.substr(0,16) + '...';
		}
		return (
		<div onClick={this.handleClick} {...style}>
			<div className="inline">+</div>
			<div className="inline">{title}</div>
		</div>);
	}
	render(){
		const props = this.props;
		const {
			fold,
		} = props;
		if(!fold)return this.renderNormal();
		if(this.state.expand){
			return this.renderExpand();
		}
		else {
			return this.renderCollapse();
		}
	}
}
export default HouseInfo;
