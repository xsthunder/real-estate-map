import React from 'react';
import ClusterAnalysis from './ClusterAnalysis';
import {
	WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2
}from './util'
function ClusterInfo(props){
	const focus = props.focus;
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
				<ClusterAnalysis/>
			</div>
		);
}
export default ClusterInfo;
