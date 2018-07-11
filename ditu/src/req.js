import axios from 'axios'
import {
	str, log, WANYUAN_UNIT, base_url,warn
}from './util'
const wrapper = async(p,errMsg="some error occurs in axios, see console for detail")=>{
	try{
		let res = await(p);
		return res.data;
	}catch(err){
		warn(err);
		return {
			err:1,
			errMsg:errMsg,
		};
	}

}

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
		//TODO add err
	}
}
const getSearch = (obj)=>{
	const clear = {};
	Object.entries(obj).map((entry)=>{
		const k = entry[0]
		const v = entry[1]
		if(v)clear[k] = v;
	});
	return wrapper(
		axios.get( 
			`${base_url}/house/search`,
			{
				params:clear,
			})
		);
}
export {
	getPoints,
	getPredict,
	getSearch,
}
