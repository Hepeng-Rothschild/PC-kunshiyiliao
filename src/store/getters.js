/**
 * @file getters
 */
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
};
