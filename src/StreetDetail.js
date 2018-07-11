import React from 'react';
import Loading from './Loading';
import Err from './Err';
import HouseInfo from './HouseInfo';
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
					(o)=> (<HouseInfo key={o.title} fold={true}  focus={o}/>)
				)}
	</div>);
		
	}
}
