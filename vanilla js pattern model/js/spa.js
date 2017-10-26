var spa = (function() {
	//module scope variables
	var config = {

			stateMap: {
				ele: null
			},
			settable: {
				ele: true
			}
		},
		init
	//module methods

	init = function(el) {
		//配置自己
		config.stateMap.ele = el
		//初始化自己
		//初始化 子模组
		spa.shell.configModule(config.stateMap)
		spa.shell.init()
		console.log('spa init')
	}
	return{init:init}
})()