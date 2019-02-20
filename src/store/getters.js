/**
 * @file getters
 */
import cookie from "../utils/cookie";
export default {
	getProvinceList:(state)=>{
		let tmpProvinceList = [];
		for(let item of state.address){
			if(item.parent == undefined){
				item.id = parseInt(item.value);
				tmpProvinceList.push(item)
			}
		}
		return tmpProvinceList;
	},
	getCityList:(state)=>(parent)=>{
		let tmpCityList = [];
		for(let item of state.address){
			if(item.parent != undefined){
				let vals = item.value.split("_");
				let times = item.parent.split("_").length-1;
				if(times == 0 && vals[0] == parent){
					item.id = parseInt(vals[1]);
					tmpCityList.push(item);
				}
			}
		}
		return tmpCityList;
	},
	getAreaList:(state)=>(parent)=>{
		let tmpAreaList = [];
		for(let item of state.address){
			if(item.parent != undefined){
				let vals = item.value.split("_");
				let times = item.parent.split("_").length-1;
				if(times == 1 && vals[1] == parent){
					item.id = parseInt(vals[2]);
					tmpAreaList.push(item);
				}
			}
		}
		return tmpAreaList;
	},
	getProvinceById:(state)=>(id)=>{
		let province;
		for(let item of state.address){
			if(item.parent == undefined){
				if(id == parseInt(item.value)){
					item.id = parseInt(item.value);
					province = item;
				}
			}
		}
		return province;
	},
	getCityById:(state)=>(id)=>{
		let city;
		let reg = /_/;
		for(let item of state.address){
			if(item.parent != undefined && !reg.test(item.parent)){
				let vals = item.value.split("_");
				if(id == parseInt(vals[1])){
					item.id = parseInt(vals[1]);
					city = item;
				}
			}
		}
		return city;
	},
	getAreaById:(state)=>(id)=>{
		let area;
		let reg = /_/;
		for(let item of state.address){
			if(item.parent != undefined && reg.test(item.parent)){
				let vals = item.value.split("_");
				if(id == parseInt(vals[2])){
					item.id = parseInt(vals[2]);
					area = item;
				}
			}
		}
		return area;
	},
	getProvinceByCityId:(state)=>(id)=>{
		let province,provinceId;
		let reg = /_/;
		for(let item of state.address){
			if(!reg.test(item.parent) && item.parent != undefined){
				let vals = item.value.split("_");
				if(id == parseInt(vals[1])){
					provinceId = vals[0]
				}
			}
		}
		for(let item of state.address){
			if(item.parent == undefined){
				if(provinceId == parseInt(item.value)){
					item.id = parseInt(item.value);
					province = item;
				}
			}
		}
		return province;
	},
	getCityByAreaId:(state)=>(id)=>{
		let city,cityId;
		let reg = /_/g;
		for(let item of state.address){
			if(item.parent != undefined){
				if((item.parent.match(reg) != undefined) && item.parent.match(reg).length>=1){
					let vals = item.value.split("_");
					if(id == parseInt(vals[2])){
						cityId = vals[1]
					}
				}
			}
		}
		for(let item of state.address){
			if(item.parent != undefined && item.parent.match(reg) == undefined){
				let vals = item.value.split("_");
				if(cityId == parseInt(vals[1])){
					item.id = parseInt(vals[1]);
					city = item;
				}
			}
		}
		return city;
	},
	getIdentity:(state)=>{
		return cookie.getCookie("idtt");
	},
	getIdentityCoding:(state)=>{
		return cookie.getCookie("idttC");
	},
	getOwnArea:(state)=>{
		return cookie.getCookie("ownArea");
	}
};
