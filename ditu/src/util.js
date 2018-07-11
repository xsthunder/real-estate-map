const log = console.log;
const warn = console.warn;
const str = JSON.stringify;
const WANYUAN_UNIT = '万元/㎡'
const WANYUAN= '万元'
const base_url = 'http://139.224.114.96';
const SQAURE_METER = '㎡';
const reDistrict = /.*区$/
const reNewDistrict = /.*新区$/
const fix2 = (e)=>{
	if(!e)return null;
	return (e/10000).toFixed(2);
}
const fix0 = (e)=>{
	if(!e)return null;
	return (e/10000).toFixed(0);
}
const searchLevel = [
			'province',
			'city',
			'district',
			'street',
			'type',
		];
const testDistrict = (title)=>{
	return reDistrict.test(title)||reNewDistrict.test(title);
}
export{
	log,
	warn,
	str,
	WANYUAN_UNIT,
	WANYUAN,
	base_url,
	SQAURE_METER,
	fix2,
	fix0,
	searchLevel,
	reDistrict,
	reNewDistrict,
	testDistrict,
};

