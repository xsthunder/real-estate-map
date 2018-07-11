import React from 'react';
import DistrictAnalysis from './DistrictAnalysis';
import StreetDetail from './StreetDetail';
import {
	WANYUAN_UNIT ,fix2,testDistrict,
}from './util'
function ClusterInfo(props){
	const {
		avg,
		title,
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
				{
					type==='district'?
						(<DistrictAnalysis title={title}/>)
						:(<StreetDetail title={title}/>)
				}
			</div>
		);
}
export default ClusterInfo;
