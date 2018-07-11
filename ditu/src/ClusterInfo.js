import React from 'react';
import ClusterAnalysis from './ClusterAnalysis';
import {
	WANYUAN_UNIT ,SQAURE_METER,WANYUAN,fix2,testDistrict,
}from './util'
function ClusterInfo(props){
	const {
		avg,
		title,
		max,
		min,
	} = props;
	const type = testDistrict(title)?'district':'street';
	const inline = {
		display:'inline',
		paddingLeft:'10px',
	};
		return (
			<div className="scroll">
				<div style={{...inline}}>
					<div style={{...inline, fontSize:'x-large'}}>{title}</div>
					<div style={{...inline}}>均价: {fix2(avg)+WANYUAN_UNIT}</div>
				</div>
				{/*<h5>
						最低价:{fix2(min)+WANYUAN_UNIT} 
				</h5>
				<h5>
						最高价:{fix2(max)+WANYUAN_UNIT} 
				</h5>*/}
				<ClusterAnalysis type={type} title={title}/>
			</div>
		);
}
export default ClusterInfo;
