import React from 'react';
import Loading from './Loading';
import {
	getPredict,
}from './req';
class Prediction extends React.Component{
	constructor(props){
		super(props);
		const {
			lng, lat
		} = props;
		this.state = {
			data:null,
		}
	}
	call(lng,lat){
		getPredict( {lng,lat})
			.then( (data)=>{
				this.setState({
					lng,
					lat,
					data,
				});
			});
	}
	componentDidMount(){
		const {
			lng,lat
		} = this.props;
		this.call(lng, lat);
	}
	render(){
		const {
			lng,lat
		} = this.props;
		let msg = null;
		if(!this.state.data){
			msg = (<Loading/>);
		}
		else {
			msg = (
				<p>
					{this.state.data.msg}
				</p>
			);
		}
		if(this.state.data && (this.state.lng !== lng || this.state.lat !== lat ) ){
			msg = (<Loading/>);
			this.call(lng,lat);
		}
		return (
			<div>
			<h4>
				经度:{lng} 纬度:{lat}
			</h4>
				{msg}
			</div>
		);
	}
}

export default Prediction;
