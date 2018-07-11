import React from 'react';
import {
	WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
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
	renderDetail(content){
		const {
			age,
			unit,
			decoration,
			elevator,
			oriented,
			price,
			room_type,
			size,
		} = content;
		return (
						<ul>
							{wrapper('楼龄: ',age,'年')}
							{wrapper('房型: ',room_type)}
							{wrapper('装修: ',decoration)}
							{wrapper('电梯: ',elevator)}
							{wrapper('朝向: ',oriented)}
							{wrapper('单价: ',fix2(unit),WANYUAN_UNIT)}
							{wrapper('总价: ',fix2(price), WANYUAN)}
							{wrapper('面积: ',size,SQAURE_METER)}
						</ul>
		);
	}
	renderNormal(){
		const props = this.props;
		const focus = props.focus;
		const  {
			title,
			content,
		} = focus;
		return (
			<div>
				<h4>{title}</h4>
				{this.renderDetail(content)}
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
			focus
		} = props;
		const {
			title,
			content,
		} = focus;
		return (
			<div onClick={this.handleClick} {...style}>
				<div className="inline">-</div>
				<div className="inline">{title}</div>
				{this.renderDetail(content)}
			</div>
		);

	}

	renderCollapse(){
		let{
			title,
		} = this.props.focus;
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
