import React from 'react';
import Loading from './Loading';
import Err from './Err';
import {
BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
	log,fix2,WANYUAN_UNIT
}from './util';
import {
	notReq,getDistrictAnalysis,
}from './req';
export default class extends React.Component {
	constructor(props){
		super(props);
		this.state= {
				data:null,
			};
		this.req = {
			'street':notReq,
			'district':getDistrictAnalysis,
		}
	}
	componentDidMount(){
	}
	render(){
		const {
			type,
			title,
		} = this.props;
		const req = this.req[type];
		let {
			data,
		}  = this.state;
		req(title).then(
			(data)=>{
				this.setState({data,});
			}
		);
		if(!data)return <Loading/>;
		if(data.err)return <Err {...data}/>
			//const min = data[0].min;
		  //const max = data[data.length-1].max;
		data = data.map( o=>({
			name:`[${fix2(o.min)},${fix2(o.max)}]`,
			count: o.total,
		}));
		//log(min,max)
  	return (
    	<BarChart width={350} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name" tick={false} label={`价格区间，单位${WANYUAN_UNIT}`}/>
       <YAxis />
       <Tooltip/>
       <Legend />
       <Bar unit="套" name="数量" dataKey="count" fill="#8884d8" />
      </BarChart>
    );
	}
}
