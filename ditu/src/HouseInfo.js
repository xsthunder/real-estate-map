import React from 'react';
import {
	str, log,WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
}from './util'
const wrapper = (f, v, e='')=>{
	if(!v)return null;
	return (<li> {`${f}${v}${e}`} </li>);
}
function HouseInfo(props){
	const focus = props.focus;
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
export default HouseInfo;
