spa.util = (function() {
	var setConfig,makeError
	//用来设置参数的方法 cascade   联级
	setConfig = function(inputMap) {
		var input = inputMap.input,     //input 数据
			settable = inputMap.settable, // Input 里面可以 用的
			config = inputMap.config, //被配置的对象
			error
		for(var keyName in input) {
			if(settable.hasOwnProperty(keyName) && input.hasOwnProperty(keyName)) {
				config.stateMap[keyName] = input[keyName]
			}else{
				error=makeError('bad input','setting |'+keyName+'| is not supported')
				throw error
			}
		}
	makeError=function(err_name,msg,data){
		var error=new Error()
		error.name=err_name
		error.message=msg
		if(data){
			error.data=data
		}
		return error
	}
		//return true?
	}
	
	return {
		setConfig: setConfig,
		makeError:makeError
	}
})()