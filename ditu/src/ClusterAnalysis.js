import React from 'react';
import Loading from './Loading';
export default class extends React.Component {
	constructor(props){
		super(props);
		this.state= {
				data:null,
			};
	}
	componentDidMount(){
		const type = this.props.type;
	}
	render(){
		const type = this.props.type;
		const {
			data,
		}  = this.state;
		if(!data)return <Loading/>;

	}
}
