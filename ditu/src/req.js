import axios from 'axios'
import {
	str, log, WANYUAN_UNIT, base_url,
}from './util'

const getPoints = (p1 = {"lng":121.460418,"lat":31.173785}, p2 = {"lng":121.504686,"lat":31.29186}, level = 13)=>{
	return axios.get(
		`${base_url}/house/list?x1=${p1.lng}&y1=${p1.lat}&x2=${p2.lng}&y2=${p2.lat}&l=${level}`
	);
}
const getPredict =async (p)=> {
	try{
		let res = await axios.get(
			`${base_url}/house/prediction?x=${p.lng}&y=${p.lat}`
		);
		res = res.data;
		p.type = 'prediction';
		return {
			...p,
			msg:res.status?'数据不足，预测失败，请选择其他点':`该预测房价为${res.data.toFixed(2)} ${WANYUAN_UNIT}`
		}
	}
	catch(err){
		return {
			...p,
			msg:'请求失败，请检查网络'
		}
	}
}
const analyseDistrict = async (district)=>{
	try{
		let res = await axios.get(
			`${base_url}/house/analysis?district=${district}`
		);
	}
	catch(err){

	}
}
export {
	getPoints,
	getPredict,
}
