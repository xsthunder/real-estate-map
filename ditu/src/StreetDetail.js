import React from 'react';
import Loading from './Loading';
import Err from './Err';
import HouseInfo from './HouseInfo';
import {
BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {
	log,fix2,WANYUAN_UNIT
}from './util';
import {
	getStreetDetail,
}from './req';
export default class extends React.Component {
	constructor(props){
		super(props);
		this.state= {
				data:null,
				title:'',
			};
	}
	call(req,title){
		req(title).then(
			(data)=>{
				this.setState({data,title});
			}
		);
	}
	render(){
		const {
			type,
			title,
		} = this.props;
		const req = getStreetDetail;
		let {
			data,
		}  = this.state;
		if(!data || this.state.title !== title ){
			this.call(req,title)
			return <Loading/>;
		}
		if(data.err)return (<Err {...data}/>)
		return (<div>
				{data.map(
					(o)=> (<HouseInfo key={o.content.title} fold={true}  focus={o}/>)
				)}
	</div>);
		
	}
}
