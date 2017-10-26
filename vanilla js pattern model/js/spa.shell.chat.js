spa.shell.chat = (function() {
	var config = {
			main_html: '<div class = "spa-chat">' +
				'<div class="spa-chat-head">' +
				'<div class="spa-chat-head-toggle">-' +
				'</div>' +
				'<div class="spa-chat-head-title">' +
				'title' +
				'</div>' +
				'<div class="spa-chat-head-closer">' +
				'x' +
				'</div>' +
				'</div>' +
				'<div class="spa-chat-sizer">' +
				'<div class="spa-chat-msgs">' +
				'</div>' +
				'</div>' +
				'<div class="spa-chat-box">' +
				'<input type="text" name="chat-input" id="chat-input" value="" />' +
				'<button>send</button>' +
				'</div>',
			stateMap: {
				ele: null,
				toggle: null,
				anchor: {
					chat: 'close',
					text: 'anyway'
				}
			},
			anchor: {
				chat: {
					open: true,
					close: false
				},
				text: {
					shit: true,
					fuck: false
				}
			},
			settable: {
				ele: true
			},
			hidden_height: '2em',
			open_height: undefined,
			//resize
			min_height:'20em',
			slider_open_em:22,
			window_height_min_em:25
		},
		//methods
		init, configModule, changeAnchor, hasChangeHandler, onToggleClick, toggleChat,removeChat,
		handleResize
	//dom method
	/*handleResize 改变视窗大小*/
	handleResize=function(){
		
	}
	/*removeChat 需要删除 dom 容器 以及释放初始化和配置信息 ，就是清空闭包的意思*/
	removeChat=function(){
		config.stateMap.ele.innerHTML=''
		for(var keys in config.settable){
			config.stateMap[keys]=null
		}
		
		//但是各种 listener都还在工作啊？ 哦，难怪书上要把这些listener放到shell里面，只留toggle在 chat
	}
	toggleChat = function() {
		var height
		if(getAnchorValue('chat') == 'open') {
			height = config.open_height
		} else {
			height = config.hidden_height;
		}
		config.stateMap.ele.style.height = height
	}

	/* getAnchorValue*/ //取某个锚的值
	var getAnchorValue = function(key) {
		var reg = new RegExp(key + "=(\\w*)", 'g');
		var match = window.location.hash.match(reg),
			val = RegExp.$1
		return val
	}
	/* changeAnchor*/ //多个状态 除了 chat  的open close 要考虑别的 比如 color 等等。多参数锚 输入的是可以识别的锚数据
	//	stateMap-> window.anchor
	changeAnchor = function(anchor_config) {
		//读写一体，变量修改无用 
		var whash = window.location.hash
		var format = function(hash) {
			for(var keyName in anchor_config) {
				//				console.log(keyName)
				//				console.log('original' + hash)
				//#chat=open&fuck=yes 有就更新
				if(hash.match(keyName)) {
					var val = getAnchorValue(keyName)
					//					console.log(val)
					if(val != config.stateMap.anchor[keyName]) {
						console.log('dif', config.stateMap.anchor[keyName], val)
						hash = hash.replace(val, config.stateMap.anchor[keyName])
					}

				} else { //没有就添加进去
					val = config.stateMap.anchor[keyName]
					if(hash.match(/#/)) {
						hash += '&' + keyName + '=' + val
					} else {
						hash += '#' + keyName + '=' + val
					}
				}

			}
			return hash
		}
		//改变stateMap.anchor 重写 whash
		window.location.hash = format(whash)
	}
	//event methods /* hashChangeHandler*/
	hashChangeHandler = function() {
		toggleChat()
	}
	onToggleClick = function() {
		if(config.stateMap.anchor.chat == 'open') {
			config.stateMap.anchor.chat = 'close'
		} else {
			config.stateMap.anchor.chat = 'open'
		}
		changeAnchor(config.anchor)
	}
	//public method
	configModule = function(input) { //代理函数，暴露这个接口，引入参数，在当前context下操作
		spa.util.setConfig({
			input: input,
			settable: config.settable,
			config: config
		})
	}

	init = function() {
		//配置自己
		config.stateMap.ele.innerHTML = config.main_html
		//容器 用完之后ele变成自己
		config.stateMap.ele = config.stateMap.ele.querySelector('.spa-chat')
		config.stateMap.toggle = config.stateMap.ele.querySelector('.spa-chat-head-toggle')
		window.onhashchange = hashChangeHandler
		config.stateMap.toggle.onclick = onToggleClick
		//初始化自己
		config.open_height=getComputedStyle(config.stateMap.ele).height
		
		changeAnchor(config.anchor)
		//初始化完毕
		console.log('spa shell chat init')
	}
	return {
		init: init,
		configModule: configModule,
		removeChat:removeChat
	}

})()