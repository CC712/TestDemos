spa.shell=(function(){
	//module
	var config={
			stateMap:{ele:null},
			settable:{ele:true},
			
	},init,configModule
	//controler
	
	//scope  methods
	configModule=function(input){
		spa.util.setConfig({
			input:input,
			settable:config.settable,
			config:config
		})
	}
	init=function(){
		//配置自己
		//初始化自己
		//配置自组件
			spa.shell.chat.configModule(config.stateMap)
			spa.shell.chat.init()
			console.log('spa shell init')
		}
	return{ init:init,
	configModule:configModule}
})()
