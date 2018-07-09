import axios from 'axios'
const getPoints = (p1 = {"lng":121.460418,"lat":31.173785}, p2 = {"lng":121.504686,"lat":31.29186}, level = 13)=>{
	return axios.get(
		`http://139.224.114.96/house/list?x1=${p1.lng}&y1=${p1.lat}&x2=${p2.lng}&y2=${p2.lat}&l=${level}`
	);
}
export {
	getPoints,
}
