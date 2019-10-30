//WEB编辑器
class Editor{
	constructor(id,config){ 
		this.id = id; 
		this.loadDefaultConfig();
		this.createEditor();
		//有自定义配置的话用自定义的配置
		if(config != undefined)
		{
			this.config=config;
		}
		this.rightClicks = new Array();//内容右键事件数组
		this.comEnableCalls = new Array();//命令按钮生效处理事件数组
		this.loadCommandBtn();
		this.loadFootBtn();
		this.loadContextRightClick();
	}
	//创建编辑器
	createEditor(){
        this.editor = document.getElementById(this.id);
		this.editor.setAttribute('unselectable','on');
        this.editor.className = "editor";
		this.createToolbar();
		this.createContext();
		this.createSource();
		this.createFoot();
		this.createPlugins();
		this.createShield();
    }
	//创建工具栏
	createToolbar(){
        this.toolbar = document.createElement("div");
		this.toolbar.setAttribute('unselectable','on');
        this.toolbar.className = "editorTool";
		this.editor.appendChild(this.toolbar);
    }
	//创建内容编辑框
	createContext(){
		this.context = document.createElement("div");
		this.context.id = this.id+'_context'
		this.contextId = this.context.id;
        this.context.contentEditable = true;
        this.context.className = "editorContext";
		this.context.innerHTML = '\u200B';
		this.editor.appendChild(this.context);
	}
	//创建源码编辑框
	createSource(){
		this.source = document.createElement("textarea");
		this.source.id = this.id+'_source'
		this.sourceId = this.source.id;
        this.source.className = "editorSource";
		this.source.style.display='none';
		this.source.style.resize='none'; 
		this.editor.appendChild(this.source);
	}
	//创建尾部
	createFoot(){
        this.foot = document.createElement("div");
		this.foot.setAttribute('unselectable','on');
		this.foot.className = "editorFoot";
		this.editor.appendChild(this.foot);
    }
	//创建插件容器
	createPlugins(){
		this.plugins = document.createElement("div");
		this.plugins.setAttribute('unselectable','on');
		this.plugins.className = 'editorPluginsDiv';
		this.plugins.setAttribute('unselectable','on');
		this.editor.appendChild(this.plugins);
	}
	//遮罩层
	createShield(){
		this.shield = document.createElement("div");
		this.shield.setAttribute('unselectable','on');
		this.shield.className='editorShield';
		this.shield.style.display='none';
		this.editor.appendChild(this.shield);
	}
	//加载默认配置
	loadDefaultConfig(){
		//配置
		this.config=[
			{name:'source',title:'HTML代码'},
			{name:'bold',title:'加粗'},
			{name:'italic',title:'斜体'},
			{name:'underline',title:'下划线'},
			{name:'strikeThrough',title:'删除线'},
			{name:'superscript',title:'上标'},
			{name:'subscript',title:'下标'},
			{name:'fontsize',title:'字号',items:['1','2','3','4','5','6','7']},
			{name:'fontsizestyle',title:'像素字号',items:['8px','16px','24px','32px','64px']},
			{name:'fontname',title:'字体',items:['','monospace','標楷體','幼圆']},
			{name:'align',title:'对齐',items:['铺满','居中','靠左','靠右']},
			{name:'forecolor',title:'文字颜色',
				items:[['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
						['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
						['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
						['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']]},
			{name:'backcolor',title:'文字背景颜色',
				items:[['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
						['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
						['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
						['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']]},
			{name:'removeFormat',title:'清除格式'},
			{name:'indent',title:'增加缩进'},
			{name:'outdent',title:'减少缩进'},
			{name:'insertOrderedList',title:'有序列表'},
			{name:'insertUnorderedList',title:'无序列表'},
			{name:'insertImage',title:'插入图片',items:[['图片设置']]},
			{name:'insertAudio',title:'插入音频'},
			{name:'insertVideo',title:'插入视频'},
			{name:'insertAnchor',title:'锚点'},
			{name:'createLink',title:'超链接',items:[['超链接设置']]},
			{name:'unlink',title:'取消超链接'},
			{name:'insertHr',title:'插入直线'},
			{name:'table',title:'插入表格',
				items:[['配置表格'],
						['前面加一行', '后面加一行', '删除行'],
						['前面加一列', '后面加一列', '删除列'],
						['向下合并单元格','向右合并单元格', '拆分单元格'],
						['添加单元格','删除单元格','设置选中的单元格背景']]},
			{name:'insertHTML',title:'插入HTML'},
			{name:'formatpagebreak',title:'插入分页标记'},
			{name:'print',title:'打印'},
			{name:'fullscreen',title:'全频'},
			{name:'test',title:'测试'}
		];
	}
	//加载命令按钮
	loadCommandBtn(){
		//加载命令按钮
		Array.from(this.config).map(item=>{
			let button = new CommandBtn(this,item).button;
			if(item.name=='source')
			{
				button = new ShowSource(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='italic')
			{
				button = new Italic(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='bold')
			{
				button = new Bold(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='underline')
			{
				button = new Underline(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='strikeThrough')
			{
				button = new StrikeThrough(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='superscript')
			{
				button = new Superscript(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='subscript')
			{
				button = new Subscript(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='fontsize')
			{
				button = new FontSize(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='fontsizestyle')
			{
				button = new FontSizeStyle(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='fontname')
			{
				button = new FontName(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='align')
			{
				button = new Align(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='forecolor')
			{
				button = new ForeColor(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='backcolor')
			{
				button = new BackColor(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='removeFormat')
			{
				button = new RemoveFormat(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='indent')
			{
				button = new Indent(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='outdent')
			{
				button = new Outdent(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertOrderedList')
			{
				button = new InsertOrderedList(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertUnorderedList')
			{
				button = new InsertUnorderedList(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertImage')
			{
				button = new InsertImage(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertAudio')
			{
				button = new InsertAudio(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertVideo')
			{
				button = new InsertVideo(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertAnchor')
			{
				button = new InsertAnchor(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='createLink')
			{
				button = new CreateLink(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='unlink')
			{
				button = new Unlink(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertHr')
			{
				button = new InsertHr(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='table')
			{
				button = new Table(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='insertHTML')
			{
				button = new InsertHTML(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='formatpagebreak')
			{
				button = new Formatpagebreak(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='print')
			{
				button = new Print(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='fullscreen')
			{
				button = new Fullscreen(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
			if(item.name=='test')
			{
				button = new Test(this,item).button;
				this.registerCommandBtn(item.name,button);
			}
		});
		
	}
	//加载底部控件
	loadFootBtn(){
		/**/
		let button = document.createElement("button");
		button.innerText = '提交';
		this.registerFootBtn(button);
		
	}
	//加载内容事件
	loadContextRightClick(){
		let _this = this;
		//内容右建事件
		this.context.onmouseup = function(e){
			if(e.button===2){       //如果button=1（鼠标中间键），button=2（鼠标右键），button=0（鼠标左键）
				Array.from(_this.rightClicks).map(call=>{
					call();
				});
			}
			else
			{
			}
		}
		//内容单击事件
		this.context.onclick = function() {  
			//隐藏插件
			Array.from(_this.plugins.childNodes).map(div=>{
				div.style.display='none';
			});
			_this.commandBtnIsOpen();
		}  
		//键盘按键抬起事件
		this.context.onkeyup = function() {  
			_this.commandBtnIsOpen();
		}  
	}
	//命令按钮启用判断
	commandBtnIsOpen(){
		let _this = this;
		Array.from(_this.comEnableCalls).map(call=>{
			call();
		});
	}
	//获取内容
	getContext(){
		let context;
		Array.from(this.toolbar.children).map(button=>{
			if(button.className=='source')
			{
				context = this.context.innerHTML;
			}
			else if(button.className=='source_open')
			{
				context = this.source.value;
			}
		});
		return context;
	}
	//设置内容
	setContext(context){
		Array.from(this.toolbar.children).map(button=>{
			if(button.className=='source')
			{
				this.context.innerHTML = context;
			}
			else if(button.className=='source_open')
			{
				this.source.value = context;
			}
		});
	}
	//注册工具栏命令按钮
	registerCommandBtn(name,button){
		//加载命令按钮
		Array.from(this.config).map(item=>{
			if(item.name==name)
			{
				this.toolbar.appendChild(button);
				this.context.style.top = this.toolbar.offsetHeight;
				this.source.style.top = this.toolbar.offsetHeight;
			}
		});
	}
	//注册内容右键事件
	registerContextRightClick(call){
		this.rightClicks.push(call);
	}
	//注册底部控件
	registerFootBtn(button){
		this.foot.appendChild(button);
		this.context.style.bottom = this.foot.offsetHeight;
		this.source.style.bottom = this.foot.offsetHeight;
	}
	//注册按钮启用事件
	registerEnableCall(call){
		this.comEnableCalls.push(call);
	}
}

//命令按钮基类
class CommandBtn{
	constructor(editor,item){
		this.editor = editor;
		this.config = item;
		this.createCommandBtn();
	}
	//生成按钮
	createCommandBtn() {
        let button = document.createElement("button");
		button.setAttribute('unselectable','on');
        button.className = this.config.name;
        button.title = this.config.title;
		let _this = this;
		button.onclick = function(e){
			_this.click(e,_this.button);
		};
		this.button = button;
		let enableCall = function(){
			_this.isEnableCall();
		}
		this.editor.registerEnableCall(enableCall); 
    }
	//按钮生效回返事件
	isEnableCall(){
	}
	//单击事件
	click(e,button){
		alert('您点击了按钮：'+button.className);
	}
}
//选择项控件基类
class Select{
	constructor(editor,items,button){
		this.editor = editor;
		this.items = items;
		this.button = button;
		this.loadItem();
	}
	//加载选项
	loadItem(){
		this.select = document.createElement("div");
		this.select.setAttribute('unselectable','on');
		this.select.className='select';
		this.select.id = this.select.className+"_"+this.button.className;
		this.select.style.display='none';
		if(this.items!=null)
		{
			Array.from(this.items).map(item=>{
				let g = document.createElement("div");
				g.setAttribute('unselectable','on');
				let node = document.createElement("button");
				node.className='selectitem';
				node.setAttribute('unselectable','on');
				node.innerText=item;
				this.configItemNode(node,item);
				let _this = this;
				node.onclick = function(e){
					_this.select.style.display='none';
					Array.from(_this.select.childNodes).map(n=>{
						n.className='selectitem';
					});
					g.className='selectitemOn';
					_this.click(item);
				};
				g.appendChild(node);
				this.select.appendChild(g);
				
			});
		}
		this.editor.plugins.appendChild(this.select);
	}
	//工具栏按钮执行的事件
	btnClick(e,button){
		Array.from(this.editor.plugins.childNodes).map(div=>{
			if(div.id!=this.select.id)
			{
				div.style.display='none';
			}
		});
		if(this.select.style.display=='block')
		{
			this.select.style.display='none';
		}
		else
		{
			this.select.style.display='block';
			this.select.style.left = button.offsetLeft;
			this.select.style.top = button.offsetTop+button.offsetHeight;
		}
	}
	//项目样式设置，由子类实现
	configItemNode(node,item){
	}
	//选项单击事件，由子类实现
	click(item){
		alert("选项命令事件，由子类实现");
	}
}
//分组选择控件
class GroupSelect extends Select{
	//加载选项
	loadItem(){
		this.select = document.createElement("div");
		this.select.setAttribute('unselectable','on');
		this.select.className='groupselect';
		this.select.id = this.select.className+"_"+this.button.className;
		this.select.style.display='none';
		if(this.items!=null)
		{
			Array.from(this.items).map(group=>{
				let len = group.length;
				let index = 0;
				let g = document.createElement("div");
				g.setAttribute('unselectable','on');
				this.configGroupNode(g,group);
				Array.from(group).map(item=>{
					let node = document.createElement("button");
					node.setAttribute('unselectable','on');
					node.className='groupselectitem';
					node.title = item;
					this.configItemNode(node,item);
					let _this = this;
					node.onclick = function(e){
						_this.select.style.display='none';
						Array.from(_this.select.childNodes).map(divs=>{
							Array.from(divs.childNodes).map(n=>{
								n.className='groupselectitem';
							});
						});
						node.className='groupselectitemOn';
						_this.click(item);
					};
					g.appendChild(node);
				});
				this.select.appendChild(g);
			});
		}
		this.editor.plugins.appendChild(this.select);
	}
	//组样式实现，由子类实现
	configGroupNode(g,group){
	}
}
//右键菜单
class RightMenu extends GroupSelect{
	constructor(editor,items,button,tag){
		super(editor,items,button);
		this.tag = tag;
		this.contextRightClick();
	}
	//加载选项
	loadItem(){
		this.select = document.createElement("div");
		this.select.setAttribute('unselectable','on');
		this.select.className='rightmenu';
		this.select.id = this.select.className+"_"+this.button.className;
		this.select.style.display='none';
		if(this.items!=null)
		{
			Array.from(this.items).map(group=>{
				let len = group.length;
				let index = 0;
				let g = document.createElement("div");
				g.setAttribute('unselectable','on');
				this.configGroupNode(g,group);
				Array.from(group).map(item=>{
					let div = document.createElement("div");
					div.setAttribute('unselectable','on');
					let node = document.createElement("button");
					node.setAttribute('unselectable','on');
					node.className='rightmenuitem';
					node.innerText = item;
					this.configItemNode(node,item);
					let _this = this;
					node.onclick = function(e){
						_this.select.style.display='none';
						_this.click(item);
					};
					div.appendChild(node);
					g.appendChild(div);
				});
				this.select.appendChild(g);
			});
		}
		this.editor.plugins.appendChild(this.select);
	}
	//为指定的标签添加右键事件
	rightClick(){
		let _this = this;
		let tags = this.editor.context.getElementsByTagName(this.tag);
		for(let i=0;i<tags.length;i++)
		{
			tags[i].oncontextmenu = function(e){
				_this.select.style.display='block';
				_this.select.style.left = e.clientX-_this.editor.editor.offsetLeft;
				_this.select.style.top = e.clientY-_this.editor.editor.offsetTop;
				_this.tag = tags[i];
				return false;//禁止鼠标右键菜单显示
			}     
		}
	}
	//为内容添加右键事件
	contextRightClick(){
		let _this = this;
		let rightClick = function(){
			_this.rightClick();
		}
		this.editor.registerContextRightClick(rightClick); 
	}
}
//窗体
class BasicWindow{
	constructor(editor,id,title){
		this.editor = editor;
		this.id = id;
		this.title=title;
		this.labWidth = "80px";
		this.formItemWidth = "200px";
		this.createWindow();
	}
	//创建窗体
	createWindow(){
		this.basicWindow = document.createElement("div");
		this.basicWindow.setAttribute('unselectable','on');
		this.basicWindow.className='window';
		this.basicWindow.id = this.basicWindow.className+"_"+this.id;
		this.basicWindow.style.display='none';
		this.editor.plugins.appendChild(this.basicWindow);
		this.createToolbar();
		this.createContext();
		this.createFoot();
	}
	//创建窗体工具栏
	createToolbar(){
		this.toolbar = document.createElement("div");
		this.toolbar.setAttribute('unselectable','on');
		this.toolbar.className='windowToolbar';
		let titleSpan = document.createElement("span");
		titleSpan.setAttribute('unselectable','on');
		titleSpan.innerText=this.title;
		let btnClose = document.createElement("button");
		btnClose.setAttribute('unselectable','on');
		btnClose.title = '关闭';
		btnClose.className = 'windowCloseButton';
		let _this = this;
		btnClose.onclick = function(e){
			_this.close();
		}
		this.toolbar.appendChild(titleSpan);
		this.toolbar.appendChild(btnClose);
		this.basicWindow.appendChild(this.toolbar);
	}
	//创建窗体内容栏
	createContext(){
		this.context = document.createElement("div");
		this.context.setAttribute('unselectable','on');
		this.context.className='windowContext';
		this.loadContext(this.context);
		this.basicWindow.appendChild(this.context);
	}
	//创建窗体底部
	createFoot(){
		this.foot = document.createElement("div");
		this.foot.setAttribute('unselectable','on');
		this.foot.className='windowFoot';
		let btnSubmit = document.createElement("button");
		btnSubmit.innerText = '提交';
		btnSubmit.className='windowSubmitButton';
		let _this = this;
		btnSubmit.onclick = function(e){
			_this.basicWindow.blur();
			_this.editor.context.focus();
			let stats = _this.click();
			if(stats)
			{
				_this.close();
			}
		}
		this.foot.appendChild(btnSubmit);
		this.basicWindow.appendChild(this.foot);
	}
	//显示窗体
	show(isShield){
		this.setDefaultValue();
		this.basicWindow.style.display='block';
		if(isShield)
		{
			this.editor.shield.style.display='block';
		}
	}
	//设置当前要处理的标签
	setTag(tag){
		this.tag = tag;
	}
	//设置当前操作的选区
	setRange(range){
		this.range = range;
	}
	//关闭窗体
	close(){
		this.basicWindow.style.display='none';
		this.editor.shield.style.display='none';
	}
	//设置窗体宽度
	setWidth(width){
		this.basicWindow.style.width = width;
	}
	//设置窗体内容宽度
	setContextHeight(height){
		this.context.style.height = height;
	}
	//设置标签宽度
	setLabWidth(width){
		this.labWidth = width;
	}
	//设置表单项宽度
	setFormItemWidth(width){
		this.formItemWidth = width;
	}
	//添加表单
	addForm(container,action,method){
		let form = document.createElement("form");
		form.setAttribute('unselectable','on');
		form.action = action;
		form.method = method;
		container.appendChild(form);
		return form;
	}
	//添加分组
	addGroup(container,text){
		let group = document.createElement("div");
		group.setAttribute('unselectable','on');
		group.style.margin = "1px";
		group.style.padding = "1px";
		let groupName = document.createElement("div");
		groupName.setAttribute('unselectable','on');
		groupName.innerText = text;
		let groupContext = document.createElement("div");
		groupContext.setAttribute('unselectable','on');
		groupContext.className = "windowGroupContext";
		group.appendChild(groupName);
		group.appendChild(groupContext);
		container.appendChild(group);
		return groupContext;
	}
	//添加项
	addItem(container){
		let item = document.createElement("div");
		item.setAttribute('unselectable','on');
		item.style.margin = "5px";
		container.appendChild(item);
		return item;
	}
	//添加项目标签
	addLabItem(container,text){
		let labItem = document.createElement("div");
		labItem.setAttribute('unselectable','on');
		labItem.style.width = this.labWidth;
		labItem.style.display='inline-block';
		labItem.style.textAlign="right";
		labItem.style.verticalAlign="top";
		labItem.innerText=text;
		container.appendChild(labItem);
		return labItem;
	}
	//添加表单项
	addFormItem(container,text,inputItem){
		let formItem = document.createElement("div");
		formItem.setAttribute('unselectable','on');
		formItem.style.width = this.formItemWidth;
		formItem.style.display='inline-block';
		formItem.style.verticalAlign="top";
		let labItemRow = this.addLabItem(container,text);
		formItem.appendChild(inputItem);
		container.appendChild(formItem);
		return formItem;
	}
	//加载窗体内容由子类实现
	loadContext(container){
		
	}
	//提交按钮子类实现
	click(){
		alert("提交按钮子类实现");
	}
	//设置默认值由子类实现
	setDefaultValue(){
		
	}
}

//显示HTML
class ShowSource extends CommandBtn{
	click(e,button){
		let a = new Api();
		if(button.className=='source')
		{
			button.className = 'source_open';
			this.editor.context.style.display='none';
			this.editor.source.style.display='block';
			this.editor.source.value = a.htmlFormat(this.editor.context.innerHTML,true);
			Array.from(this.editor.toolbar.children).map(it=>{
				it.disabled = true;
				it.style.cursor = 'default';
			});
			//隐藏插件
			Array.from(this.editor.plugins.childNodes).map(div=>{
				div.style.display='none';
			});
			button.disabled = false;
			button.style.cursor = 'pointer';
			this.editor.source.focus();
		}
		else
		{
			button.className = 'source';
			this.editor.source.style.display='none';
			this.editor.context.style.display='block';
			this.editor.context.innerHTML = a.htmlFormat(this.editor.source.value,false);
			Array.from(this.editor.toolbar.children).map(it=>{
				it.disabled = false;
				it.style.cursor = 'pointer';
			});
			this.editor.context.focus();
		}
	}
}
//粗体
class Bold extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.bold();
		if(status)
		{
			if(button.className=='bold')
			{
				button.className = 'bold_open';
			}
			else
			{
				button.className = 'bold';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'B');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//斜体
class Italic extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.italic();
		if(status)
		{
			if(button.className=='italic')
			{
				button.className = 'italic_open';
			}
			else
			{
				button.className = 'italic';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'I');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//下划线
class Underline extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.underline();
		if(status)
		{
			if(button.className=='underline')
			{
				button.className = 'underline_open';
			}
			else
			{
				button.className = 'underline';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'U');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//删除线
class StrikeThrough extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.strikeThrough();
		if(status)
		{
			if(button.className=='strikeThrough')
			{
				button.className = 'strikeThrough_open';
			}
			else
			{
				button.className = 'strikeThrough';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'STRIKE');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//上标
class Superscript extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.superscript();
		if(status)
		{
			if(button.className=='superscript')
			{
				button.className = 'superscript_open';
			}
			else
			{
				button.className = 'superscript';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'SUP');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//下标
class Subscript extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.subscript();
		if(status)
		{
			if(button.className=='subscript')
			{
				button.className = 'subscript_open';
			}
			else
			{
				button.className = 'subscript';
			}
		}
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'SUB');
		if(el!=null)
		{
			this.button.className = this.config.name+'_open';
		}
		else
		{
			this.button.className = this.config.name;
		}
	}
}
//字号选择项控件
class SizeSelect extends Select{
	click(item){
		let a = new Api();
		a.fontSize(item);
	}
	configItemNode(node,item){
		node.innerText='';
		let i = document.createElement("font");
		i.setAttribute('unselectable','on');
		i.size = item;
		i.innerText=item;
		node.appendChild(i);
	}
}
//字号
class FontSize extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new SizeSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'FONT');
		Array.from(this.select.select.childNodes).map(g=>{
			g.className = "selectitem";
			let isEnable = false;
			Array.from(g.childNodes).map(node=>{
				Array.from(node.childNodes).map(i=>{
					if(el!=null)
					{
						if(i.size==el.size)
						{
							isEnable = true;
						}
					}
				});
			});
			if(isEnable)
			{
				g.className = "selectitemOn";
			}
		});
	}
}
//字号选择项控件
class FontSizeStyleSelect extends Select{
	click(item){
		let a = new Api();
		let range = a.getRange();
		a.seletTextBil(range,function(node,status){
			if(status)
			{
				let pNode = node.parentNode;
				if(pNode.nodeName=='SPAN' && node.nodeValue==range.toString()){
					pNode.style.fontSize=item;
				}
				else{
					let span = document.createElement("span");
					span.style.fontSize=item;
					if(node.nodeValue=="")
					{
						node.nodeValue='\u200B';
					}
					span.appendChild(node.cloneNode());
					pNode.replaceChild(span,node);
					return span;
				}
			}
		});
	}
	configItemNode(node,item){
		node.innerText='';
		let i = document.createElement("span");
		i.setAttribute('unselectable','on');
		i.style.fontSize = item;
		i.innerText=item;
		node.appendChild(i);
	}
}
//字号
class FontSizeStyle extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new FontSizeStyleSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'SPAN');
		Array.from(this.select.select.childNodes).map(g=>{
			g.className = "selectitem";
			let isEnable = false;
			Array.from(g.childNodes).map(node=>{
				Array.from(node.childNodes).map(i=>{
					if(el!=null)
					{
						if(i.style.fontSize==el.style.fontSize)
						{
							isEnable = true;
						}
					}
				});
			});
			if(isEnable)
			{
				g.className = "selectitemOn";
			}
		});
	}
}
//字体选择项控件
class FontNameSelect extends Select{
	click(item){
		let a = new Api();
		a.fontName(item);
	}
	configItemNode(node,item){
		node.innerText='';
		let i = document.createElement("font");
		i.setAttribute('unselectable','on');
		i.face = item;
		i.innerText=item;
		node.appendChild(i);
	}
}
//字体
class FontName extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new FontNameSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'FONT');
		Array.from(this.select.select.childNodes).map(g=>{
			g.className = "selectitem";
			let isEnable = false;
			Array.from(g.childNodes).map(node=>{
				Array.from(node.childNodes).map(i=>{
					if(el!=null)
					{
						if(i.face==el.face)
						{
							isEnable = true;
						}
					}
				});
			});
			if(isEnable)
			{
				g.className = "selectitemOn";
			}
		});
	}
}
//对齐选择项控件
class AlignSelect extends Select{
	click(item){
		let a = new Api();
		if(item=='铺满'){
			a.justifyFull();
		}
		else if(item=='居中'){
			a.justifyCenter();
		}
		else if(item=='靠左'){
			a.justifyLeft();
		}
		else if(item=='靠右'){
			a.justifyRight();
		}
		
	}
	configItemNode(node,item){
		node.innerText='';
		let i = document.createElement("div");
		i.setAttribute('unselectable','on');
		i.title = item;
		if(item=='铺满'){
			i.className='justifyFull';
		}
		else if(item=='居中'){
			i.className='justifyCenter';
		}
		else if(item=='靠左'){
			i.className='justifyLeft';
		}
		else if(item=='靠右'){
			i.className='justifyRight';
		}
		node.appendChild(i);
	}
}
//对齐
class Align extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new AlignSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'DIV');
		if(el!=null)
		{
			if(el.style.textAlign=="center")
			{
				Array.from(this.select.select.childNodes).map(g=>{
					g.className = "selectitem";
					let isEnable = false;
					Array.from(g.childNodes).map(node=>{
						Array.from(node.childNodes).map(i=>{
							if(i.className=="justifyCenter")
							{
								isEnable = true;
							}
						});
					});
					if(isEnable)
					{
						g.className = "selectitemOn";
					}
				});
			}
			else if(el.style.textAlign=="justify")
			{
				Array.from(this.select.select.childNodes).map(g=>{
					g.className = "selectitem";
					let isEnable = false;
					Array.from(g.childNodes).map(node=>{
						Array.from(node.childNodes).map(i=>{
							if(i.className=="justifyFull")
							{
								isEnable = true;
							}
						});
					});
					if(isEnable)
					{
						g.className = "selectitemOn";
					}
				});
			}
			else if(el.style.textAlign=="right")
			{
				Array.from(this.select.select.childNodes).map(g=>{
					g.className = "selectitem";
					let isEnable = false;
					Array.from(g.childNodes).map(node=>{
						Array.from(node.childNodes).map(i=>{
							if(i.className=="justifyRight")
							{
								isEnable = true;
							}
						});
					});
					if(isEnable)
					{
						g.className = "selectitemOn";
					}
				});
			}
			else
			{
				Array.from(this.select.select.childNodes).map(g=>{
					g.className = "selectitem";
					let isEnable = false;
					Array.from(g.childNodes).map(node=>{
						Array.from(node.childNodes).map(i=>{
							if(i.className=="justifyLeft")
							{
								isEnable = true;
							}
						});
					});
					if(isEnable)
					{
						g.className = "selectitemOn";
					}
				});
			}	
		}
	}
}
//字体颜色选择项控件
class ForeColorSelect extends GroupSelect{
	click(item){
		let a = new Api();
		a.foreColor(item);
	}
	configItemNode(node,item){
		node.style.background=item;
	}
}
//字体颜色
class ForeColor extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new ForeColorSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let el = a.getElement(range,'FONT');
		Array.from(this.select.select.childNodes).map(g=>{
			Array.from(g.childNodes).map(node=>{
				node.className = "groupselectitem";
				if(el!=null)
				{
					if(node.title.toUpperCase()==el.color.toUpperCase())
					{
						node.className = "groupselectitemOn";
					}
				}
			});
		});
	}
}
//背景颜色选择项控件
class BackColorSelect extends GroupSelect{
	click(item){
		let a = new Api();
		a.backColor(item);
	}
	configItemNode(node,item){
		node.style.background=item;
	}
}
//背景颜色
class BackColor extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new BackColorSelect(this.editor,this.config.items,this.button);
	}
	click(e,button){
		this.select.btnClick(e,button);
	}
	isEnableCall(){
		let a = new Api();
		let range = a.getRange();
		let isEnable = false;
		let el = a.getElement(range,'FONT');
		Array.from(this.select.select.childNodes).map(g=>{
			Array.from(g.childNodes).map(node=>{
				node.className = "groupselectitem";
				if(el!=null)
				{
					if(node.style.backgroundColor==el.style.backgroundColor)
					{
						node.className = "groupselectitemOn";
						isEnable = true;
					}
				}
			});
		});
		if(!isEnable)
		{
			el = a.getElement(range,'SPAN');
			Array.from(this.select.select.childNodes).map(g=>{
				Array.from(g.childNodes).map(node=>{
					node.className = "groupselectitem";
					if(el!=null)
					{
						if(node.style.backgroundColor==el.style.backgroundColor)
						{
							node.className = "groupselectitemOn";
						}
					}
				});
			});
		}
		
	}
}
//清除格式
class RemoveFormat extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.removeFormat();
		if(status)
		{
		}
	}
}
//增加缩进
class Indent extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.indent();
		if(status)
		{
		}
	}
}
//减少缩进
class Outdent extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.outdent();
		if(status)
		{
		}
	}
}
//有序列表
class InsertOrderedList extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.insertOrderedList();
		if(status)
		{
			if(button.className=='insertOrderedList')
			{
				button.className = 'insertOrderedList_open';
			}
			else
			{
				button.className = 'insertOrderedList';
			}
		}
	}
}
//无序列表
class InsertUnorderedList extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.insertUnorderedList();
		if(status)
		{
			if(button.className=='insertUnorderedList')
			{
				button.className = 'insertUnorderedList_open';
			}
			else
			{
				button.className = 'insertUnorderedList';
			}
		}
	}
}
//图片设置窗体
class ImageSetWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("80px");
		this.setWidth("300px");
		this.setLabWidth("80px");

		let itemWidth = this.addItem(container);
		this.numWidth = document.createElement("input");
		this.numWidth.setAttribute('unselectable','on');
		this.numWidth.setAttribute("name", "numWidth");
		this.numWidth.setAttribute("type", "text");
		let formItemRow = this.addFormItem(itemWidth,"宽度：",this.numWidth);
		
		let itemHeight = this.addItem(container);
		this.numHeight = document.createElement("input");
		this.numHeight.setAttribute('unselectable','on');
		this.numHeight.setAttribute("name", "numHeight");
		this.numHeight.setAttribute("type", "text");
		let formItemCol = this.addFormItem(itemHeight,"高度：",this.numHeight);
	}
	setDefaultValue(){
		if(this.tag!=null)
		{
			this.numWidth.value = this.tag.style.width;
			this.numHeight.value = this.tag.style.height;
		}
	}
	//提交按钮子类实现
	click(){
		let width = this.numWidth.value;
		let height = this.numHeight.value;
		if(this.tag!=null)
		{
			this.tag.style.width = width;
			this.tag.style.height = height;
			return true;
		}
		return false;
	}
}
//图片右键菜单
class ImageRightMenu extends RightMenu{
	constructor(editor,items,button,tag){
		super(editor,items,button,tag);
		this.window = new ImageSetWindow(this.editor,'img','图片设置');
	}
	click(item){
		this.window.setTag(this.tag);
		this.window.show(true);
	}
}
//插入图片
class InsertImage extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new ImageRightMenu(this.editor,this.config.items,this.button,'img');
	}
	click(e,button){
		let src = prompt("请输入src：");
		if(src != null && src != '')
		{
			let a = new Api();
			let status = a.insertImage(src);
			if(status)
			{
			}
		}
	}
}
//插入音频
class InsertAudio  extends CommandBtn{
	click(e,button){
		let src = prompt("请输入src：");
		if(src != null && src != '')
		{
			let a = new Api();
			let audio = document.createElement("audio");
			audio.src = src;
			audio.controls = 'controls';
			audio.innerText = '您的浏览器不支持 audio 标签。';
			a.insertNodeAtCursor(a.getRange(),audio);
		}
	}
}
//插入视频
class InsertVideo  extends CommandBtn{
	click(e,button){
		let src = prompt("请输入src：");
		if(src != null && src != '')
		{
			let a = new Api();
			let video = document.createElement("video");
			video.src = src;
			video.controls = 'controls';
			video.innerText = '您的浏览器不支持 video 标签。';
			a.insertNodeAtCursor(a.getRange(),video);
		}
	}
}
//插入锚点
class InsertAnchor extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
	}
	click(e,button){
		let name = prompt("请输入标记名称：");
		if(name != null && name != '')
		{
			let br = document.createElement("br");
			let a = new Api();
			let anchor　= document.createElement("a");
			anchor.className="anchor";
			anchor.name = name;
			anchor.href = "#";
			anchor.innerText = name;
			//anchor.appendChild(br);
			//anchor.setAttribute('unselectable','on');
			/*
			anchor.onfocus=function(){alert();
				anchor.blur();
			}*/
			let status = a.insertNodeAtCursor(a.getRange(),anchor);
			a.getRange().setStartAfter(anchor);
			a.getRange().setEndAfter(anchor);
			//a.insertNodeAtCursor(a.getRange(),br);
			if(status)
			{
			}
		}
	}
}
//超链接设置窗体
class LinkSetWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("50px");
		this.setWidth("300px");
		this.setLabWidth("80px");
		
		let itemLink = this.addItem(container);
		this.urlLink = document.createElement("input");
		this.urlLink.setAttribute('unselectable','on');
		this.urlLink.setAttribute("name", "urlLink");
		this.urlLink.setAttribute("type", "url");
		
		let formItemLink = this.addFormItem(itemLink,"Link：",this.urlLink);
	}
	setDefaultValue(){
		if(this.tag!=null)
		{
			if(this.tag.href!=null && this.tag.href!='')
			{
				this.urlLink.value = this.tag.href;
			}
		}
	}
	//提交按钮子类实现
	click(){
		let link = this.urlLink.value;
		if(this.tag!=null)
		{
			this.tag.href = link;
			return true;
		}
		return false;
	}
}
//超链接右键菜单
class LinkRightMenu extends RightMenu{
	constructor(editor,items,button,tag){
		super(editor,items,button,tag);
		this.window = new LinkSetWindow(this.editor,'link','超链接设置');
	}
	click(item){
		this.window.setTag(this.tag);
		this.window.show(true);
	}
}
//超链接
class CreateLink extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.select = new LinkRightMenu(this.editor,this.config.items,this.button,'a');
	}
	click(e,button){
		let link = prompt("请输入link：");
		if(link != null && link != '')
		{
			let a = new Api();
			let status = a.createLink(link);
			if(status)
			{
			}
		}
	}
}
//取消超链接
class Unlink extends CommandBtn{
	click(e,button){
		let a = new Api();
		let status = a.unlink();
		if(status)
		{
		}
	}
}
//插入直线
class InsertHr extends CommandBtn{
	click(e,button){
		let a = new Api();
		let br = document.createElement("br");
		a.insertNodeAtCursor(a.getRange(),br);
		let hr = document.createElement("hr");
		a.insertNodeAtCursor(a.getRange(),hr);
	}
}
//表格操作Api
class TableApi{
	//创建表格
	createTable(range,bordercolor,backgroundColor,align,width,row,col){
		if(range!=null){
			let br = document.createElement("br");
			let a = new Api();
			let table = document.createElement("table");
			table.style.width = width;
			table.style.borderCollapse = 'collapse';
			table.style.border = '1px solid '+bordercolor;
			table.style.background = backgroundColor;
			table.align = align;
			for(let r = 0;r<row;r++)
			{
				let newTr = table.insertRow(r);
				for(let c = 0;c<col;c++)
				{
					let newTd = newTr.insertCell(c);
					newTd.style.border = table.style.border;
					newTd.appendChild(br.cloneNode());
				}
			}
			
			a.insertNodeAtCursor(range,br.cloneNode());
			return a.insertNodeAtCursor(range,table);
		}
		return false;
	}
	//修改表格样式
	editTable(table,bordercolor,backgroundColor,align,width){
		table.style.width = width;
		table.style.borderCollapse = 'collapse';
		table.style.border = '1px solid '+bordercolor;
		table.style.background = backgroundColor;
		table.align = align;
		if(table!=null)
		{
			for(let i=0;i<table.rows.length;i++)
			{
				let row = table.rows[i];
				for(let o=0;o<row.cells.length;o++)
				{
					let cell = row.cells[o];
					cell.style.border = table.style.border;
				}
			}
		}
		return true;
	}
	//添加行
	addRow(range,beforeOrAfter){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						let colCount = 0;
						let sourceCi =0;
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								if(i==0)
								{
									colCount+=colSpan;
								}
								if(rowIndex>=i && rowIndex<i+rowSpan && rowSpan>1)
								{
									sourceCi+=colSpan;
									cell.rowSpan = rowSpan+1;
								}
								ci+=colSpan;
							}
						}
						if(beforeOrAfter=="After")
						{
							rowIndex++;
						}
						let newTr = table.insertRow(rowIndex);
						for(let i=0;i<colCount-sourceCi;i++)
						{
							let newTd = newTr.insertCell(i);
							newTd.style.border=table.style.border;
							newTd.appendChild(br.cloneNode());
						}
					}
				}
			}
		}
	}
	//删除行
	removeRow(range){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						let sourceCi =0;
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								if(rowIndex>i && rowIndex<i+rowSpan && rowSpan>1)
								{
									cell.rowSpan = rowSpan-1;
								}
								if(rowIndex==i && rowSpan>1)
								{
									for(let d=rowIndex+1;d<rowIndex+rowSpan;d++)
									{
										for(let ac =0;ac<colSpan;ac++)
										{
											let newTd = table.rows[d].insertCell(columnIndex);
											newTd.style.border=table.style.border;
											newTd.appendChild(br.cloneNode());
										}
									}
								}
								ci+=colSpan;
							}
						}
						table.deleteRow(rowIndex);
					}
				}
			}
		}
	}
	//添加列
	addColumn(range,beforeOrAfter){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						//取得当前单元格的表格通用坐标
						let sourceCi =0;
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								if(rowIndex>i && rowIndex<i+rowSpan)
								{
									sourceCi+=colSpan;
								}
								if(i==rowIndex && o==columnIndex){
									sourceCi+=ci;
								}
								ci+=colSpan;
							}
						}
						//下一个单元格通用坐标
						if(beforeOrAfter=="After")
						{
							sourceCi++;
						}
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								//要处理的列
								if(sourceCi==ci || (sourceCi<ci+colSpan && sourceCi>ci))
								{
									if(colSpan==1)
									{
										let newTd = row.insertCell(o);
										newTd.style.border=table.style.border;
										newTd.appendChild(br.cloneNode());
									}
									else
									{//跨列时不加列增加跨的列
										cell.colSpan=cell.colSpan+1;
									}
									if(rowSpan>1)
									{//跨行时后面的行的相应单元格不处理
										i=i+rowSpan-1;
									}
								}
								ci+=colSpan;
							}
						}
					}
				}
			}
		}
	}
	//删除列
	removeCoolumn(range){
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						//取得当前单元格的表格通用坐标
						let sourceCi =0;
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								if(rowIndex>i && rowIndex<i+rowSpan)
								{
									sourceCi+=colSpan;
								}
								if(i==rowIndex && o==columnIndex){
									sourceCi+=ci;
								}
								ci+=colSpan;
							}
						}
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								//要处理的列
								if(sourceCi==ci || (sourceCi<ci+colSpan && sourceCi>ci))
								{
									if(colSpan==1)
									{
										row.deleteCell(o);
									}
									else
									{//跨列时不删列减少跨的列
										cell.colSpan=cell.colSpan-1;
									}
									if(rowSpan>1)
									{//跨行时后面的行的相应单元格不处理
										i=i+rowSpan-1;
									}
								}
								ci+=colSpan;
							}
						}
					}
				}
			}
		}
	}
	//合并单元格
	mergeCells(range,downOrRight){
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						//取得当前单元格的表格通用坐标
						let sourceCi =0;
						for(let i=0;i<table.rows.length;i++)
						{
							let row = table.rows[i];
							let ci =0;
							for(let o=0;o<row.cells.length;o++)
							{
								let cell = row.cells[o];
								let rowSpan = cell.rowSpan;
								let colSpan = cell.colSpan;
								if(rowIndex>i && rowIndex<i+rowSpan)
								{
									sourceCi+=colSpan;
								}
								if(i==rowIndex && o==columnIndex){
									sourceCi+=ci;
								}
								ci+=colSpan;
							}
						}
						//向右合并
						if(downOrRight=="Right")
						{
							let tagRowIndex = rowIndex;
							let tagColumnIndex = columnIndex+td.colSpan;
							let tagCi = sourceCi+td.colSpan;
							for(let i=0;i<table.rows.length;i++)
							{
								let row = table.rows[i];
								let ci =0;
								//后面没有单元格可合并
								if(tagRowIndex==i && tagColumnIndex>=row.cells.length)
								{
									alert("后面没有单元格可合并");return;
								}
								for(let o=0;o<row.cells.length;o++)
								{
									let cell = row.cells[o];
									let rowSpan = cell.rowSpan;
									let colSpan = cell.colSpan;
									if(ci<tagCi && rowIndex>i && rowIndex<i+rowSpan)
									{
										tagCi-=colSpan;
									}
									if(tagCi==ci && tagRowIndex>i && tagRowIndex<i+rowSpan){
										alert("无法合并,目标单元格不到同一行上");return;
									}
									ci+=colSpan;
								}
							}
							let tagRow = table.rows[tagRowIndex];
							if(tagRow!=null)
							{
								let tagCell = tagRow.cells[tagColumnIndex];
								if(tagCell!=null)
								{
									if(td.rowSpan==tagCell.rowSpan)
									{
										let rs = td.rowSpan+tagCell.rowSpan;
										let cs = td.colSpan+tagCell.colSpan;
										td.colSpan = cs;
										table.rows[tagRowIndex].deleteCell(tagColumnIndex);
									}
									else
									{
										alert("被合并的单元格所跨行数与合并的单元格所跨的行数不相等，无法合并");return;
									}
								}
							}
						}
						else　//向下合并
						{
							let tagRowIndex = rowIndex+td.rowSpan;
							let tagColumnIndex = sourceCi;
							//后面没有单元格可合并
							if(tagRowIndex>=table.rows.length)
							{
								alert("后面没有单元格可合并");return;
							}
							for(let i=0;i<table.rows.length;i++)
							{
								let row = table.rows[i];
								let ci =0;
								for(let o=0;o<row.cells.length;o++)
								{
									let cell = row.cells[o];
									let rowSpan = cell.rowSpan;
									let colSpan = cell.colSpan;
									if(ci<sourceCi && tagRowIndex>i && tagRowIndex<i+rowSpan)
									{
										tagColumnIndex -= colSpan;
									}
									if(ci<sourceCi && tagRowIndex==i && colSpan>1)
									{
										if(ci+colSpan>tagColumnIndex && ci <tagColumnIndex)
										{
											alert("无法合并,目标单元格不到同一列上");return;
										}
										tagColumnIndex -= (colSpan-1);
									}
									ci+=colSpan;
								}
							}
							let tagRow = table.rows[tagRowIndex];
							if(tagRow!=null)
							{
								let tagCell = tagRow.cells[tagColumnIndex];
								if(tagCell!=null)
								{
									if(td.colSpan==tagCell.colSpan)
									{
										let rs = td.rowSpan+tagCell.rowSpan;
										let cs = td.colSpan+tagCell.colSpan;
										td.rowSpan = rs;
										table.rows[tagRowIndex].deleteCell(tagColumnIndex);
									}
									else
									{
										alert("被合并的单元格所跨列数与合并的单元格所跨的列数不相等，无法合并");return;
									}
									
								}
							}
						}
					}
				}
			}
		}
	}
	//拆分单元格
	splitCell(range){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						let rowSpan = td.rowSpan;
						let colSpan = td.colSpan;
						for(let i=rowIndex;i<rowIndex+rowSpan;i++)
						{
							for(let o=columnIndex;o<columnIndex+colSpan;o++)
							{
								if(i == rowIndex && o == columnIndex)
								{
									td.rowSpan=1;
									td.colSpan=1;
								}
								else
								{
									let newTd = table.rows[i].insertCell(o);
									newTd.style.border=table.style.border;
									newTd.appendChild(br.cloneNode());
								}
							}
						}
					}
				}
			}
		}
	}
	//添加单元格
	addCell(range){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						let newTd = tr.insertCell(tr.length);
						newTd.style.border=table.style.border;
						newTd.appendChild(br.cloneNode());
					}
				}
			}
		}
	}
	//删除单元格
	delCell(range){
		let br = document.createElement("br");
		if(range!=null){
			let a = new Api();
			let table = a.getElement(range,"TABLE");
			if(table!=null)
			{
				let tr = a.getElement(range,"TR");
				if(tr!=null)
				{
					let td = a.getElement(range,"TD");
					if(td!=null)
					{
						let rowIndex = tr.rowIndex;
						let columnIndex=td.cellIndex;
						tr.deleteCell(columnIndex);
					}
				}
			}
		}
	}
	//设置选中的单元格背景
	setSelectCellBackground(range,backgroundColor){
		let a = new Api();
		a.seletTextBil(range,function(node,status){
		if(status){
			node.style.background=backgroundColor;
		}
		},"TD");
		return true;
	}
}
//表格选择项控件
class TableSelect extends GroupSelect{
	click(item){
		let a = new Api();
		let tableApi = new TableApi();
		if(item=='添加表格'){
			tableApi.createTable(a.getRange(),'#000000','center','500px',5,5);
		}
		else if(item=='前面加一行'){
			tableApi.addRow(a.getRange());
		}
		else if(item=='后面加一行'){
			tableApi.addRow(a.getRange(),'After');
		}
		else if(item=='删除行'){
			tableApi.removeRow(a.getRange());
		}
		else if(item=='前面加一列'){
			tableApi.addColumn(a.getRange());
		}
		else if(item=='后面加一列'){
			tableApi.addColumn(a.getRange(),'After');
		}
		else if(item=='删除列'){
			tableApi.removeCoolumn(a.getRange());
		}
		else if(item=='向下合并单元格'){
			tableApi.mergeCells(a.getRange());
		}
		else if(item=='向右合并单元格'){
			tableApi.mergeCells(a.getRange(),"Right");
		}
		else if(item=='拆分单元格'){
			tableApi.splitCell(a.getRange());
		}
		else if(item=='添加边框'){

		}
		else if(item=='清除边框'){

		}
	}
	configItemNode(node,item){
		node.style.padding=0;
		let i = document.createElement("div");
		i.setAttribute('unselectable','on');
		i.title = item;
		if(item=='添加表格'){
			i.className='table';
		}
		else if(item=='前面加一行'){
			i.className='tableRowPlusBefore';
		}
		else if(item=='后面加一行'){
			i.className='tableRowPlusAfter';
		}
		else if(item=='删除行'){
			i.className='tableRowRemove';
		}
		else if(item=='前面加一列'){
			i.className='tableColumnPlusBefore';
		}
		else if(item=='后面加一列'){
			i.className='tableColumnPlusAfter';
		}
		else if(item=='删除列'){
			i.className='tableColumnRemove';
		}
		else if(item=='向下合并单元格'){
			i.className='tableMergeCellsDown';
		}
		else if(item=='向右合并单元格'){
			i.className='tableMergeCellsRight';
		}
		else if(item=='拆分单元格'){
			i.className='tableCallSplit';
		}
		else if(item=='添加边框'){
			i.className='tableBorder';
		}
		else if(item=='清除边框'){
			i.className='tableBorderNone';
		}
		node.appendChild(i);
	}
	configGroupNode(g,group){
		g.style.borderBottom = "1px solid #CAE1FF";
		g.style.margin = "2px";
	}	
}
//表格右键菜单
class TableRightMenu extends RightMenu{
	constructor(editor,items,button,tag,window){
		super(editor,items,button,tag);
		this.window = window;
		this.windowCell = new CellSetWindow(this.editor,'cell','选中单元格背景设置');
	}
	click(item){
		let a = new Api();
		let tableApi = new TableApi();
		if(item=='配置表格'){
			//tableApi.createTable(a.getRange(),'#000000','center','500px',5,5);
			this.window.IsEdit = true;
			this.window.numRow.disabled = true;
			this.window.numCol.disabled = true;
			this.window.setTag(this.tag);
			this.window.show(true);
		}
		else if(item=='前面加一行'){
			tableApi.addRow(a.getRange());
		}
		else if(item=='后面加一行'){
			tableApi.addRow(a.getRange(),'After');
		}
		else if(item=='删除行'){
			tableApi.removeRow(a.getRange());
		}
		else if(item=='前面加一列'){
			tableApi.addColumn(a.getRange());
		}
		else if(item=='后面加一列'){
			tableApi.addColumn(a.getRange(),'After');
		}
		else if(item=='删除列'){
			tableApi.removeCoolumn(a.getRange());
		}
		else if(item=='向下合并单元格'){
			tableApi.mergeCells(a.getRange());
		}
		else if(item=='向右合并单元格'){
			tableApi.mergeCells(a.getRange(),"Right");
		}
		else if(item=='拆分单元格'){
			tableApi.splitCell(a.getRange());
		}
		else if(item=='添加边框'){

		}
		else if(item=='清除边框'){

		}
		else if(item=='添加单元格'){
			tableApi.addCell(a.getRange());
		}
		else if(item=='删除单元格'){
			tableApi.delCell(a.getRange());
		}
		else if(item=='设置选中的单元格背景'){
			this.windowCell.setRange(a.getRange());
			this.windowCell.show(true);
		}
	}
	configItemNode(node,item){
		node.innerText = '';
		let g = document.createElement("div");
		g.setAttribute('unselectable','on');
		let i = document.createElement("div");
		i.setAttribute('unselectable','on');
		i.title = item;
		i.style.float = "left";
		if(item=='配置表格'){
			i.className='table';
		}
		else if(item=='前面加一行'){
			i.className='tableRowPlusBefore';
		}
		else if(item=='后面加一行'){
			i.className='tableRowPlusAfter';
		}
		else if(item=='删除行'){
			i.className='tableRowRemove';
		}
		else if(item=='前面加一列'){
			i.className='tableColumnPlusBefore';
		}
		else if(item=='后面加一列'){
			i.className='tableColumnPlusAfter';
		}
		else if(item=='删除列'){
			i.className='tableColumnRemove';
		}
		else if(item=='向下合并单元格'){
			i.className='tableMergeCellsDown';
		}
		else if(item=='向右合并单元格'){
			i.className='tableMergeCellsRight';
		}
		else if(item=='拆分单元格'){
			i.className='tableCallSplit';
		}
		else if(item=='添加边框'){
			i.className='tableBorder';
		}
		else if(item=='清除边框'){
			i.className='tableBorderNone';
		}
		else if(item=='添加单元格'){
			i.className='tableAddCell';
		}
		else if(item=='删除单元格'){
			i.className='tableDelCell';
		}
		else if(item=='设置选中的单元格背景'){
			i.className='tableSelectColor';
		}
		let c = document.createElement("div");
		c.setAttribute('unselectable','on');
		c.innerText = item;
		c.style.float = "left";
		g.appendChild(i);
		g.appendChild(c);
		node.appendChild(g);
	}
	configGroupNode(g,group){
		g.style.borderBottom = "1px solid #CAE1FF";
		g.style.margin = "2px";
	}
}
//表格设置窗体
class TableSetWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("180px");
		this.setWidth("300px");
		this.setLabWidth("80px");
		
		let itemWidth = this.addItem(container);
		this.numWidth = document.createElement("input");
		this.numWidth.setAttribute('unselectable','on');
		this.numWidth.setAttribute("name", "numWidth");
		this.numWidth.setAttribute("type", "text");
		this.numWidth.value = '500px';
		let formItemWidth = this.addFormItem(itemWidth,"宽度：",this.numWidth);
		
		let itemBorderColor = this.addItem(container);
		this.borderColor = document.createElement("input");
		this.borderColor.setAttribute('unselectable','on');
		this.borderColor.setAttribute("name", "borderColor");
		this.borderColor.setAttribute("type", "color");
		this.borderColor.value = "#000000";
		let formItemBorderColor = this.addFormItem(itemBorderColor,"边框颜色：",this.borderColor);
		
		let itemBackgroundColor = this.addItem(container);
		this.backgroundColor = document.createElement("input");
		this.backgroundColor.setAttribute('unselectable','on');
		this.backgroundColor.setAttribute("name", "backgroundColor");
		this.backgroundColor.setAttribute("type", "color");
		this.backgroundColor.value = "#FFFFFF";
		let formItemBackgroundColor = this.addFormItem(itemBackgroundColor,"背景颜色：",this.backgroundColor);
		
		let itemAlign = this.addItem(container);
		this.align = document.createElement("select");
		this.align.setAttribute('unselectable','on');
		this.align.setAttribute("name", "align");
		this.alignItemLeft = document.createElement("option");
		this.alignItemLeft.value = 'left';
		this.alignItemLeft.text = '靠左';
		this.align.appendChild(this.alignItemLeft);
		this.alignItemCenter = document.createElement("option");
		this.alignItemCenter.value = 'center';
		this.alignItemCenter.text = '居中';
		this.align.appendChild(this.alignItemCenter);
		this.alignItemRight = document.createElement("option");
		this.alignItemRight.value = 'right';
		this.alignItemRight.text = '靠右';
		this.align.add(this.alignItemRight);
		this.align.selectedIndex = 0;
		let formItemAlign = this.addFormItem(itemAlign,"表格对齐：",this.align);
		
		let itemRow = this.addItem(container);
		this.numRow = document.createElement("input");
		this.numRow.setAttribute('unselectable','on');
		this.numRow.setAttribute("name", "numRow");
		this.numRow.setAttribute("type", "number");
		this.numRow.value = 5;
		let formItemRow = this.addFormItem(itemRow,"行数：",this.numRow);
		
		let itemCol = this.addItem(container);
		this.numCol = document.createElement("input");
		this.numCol.setAttribute('unselectable','on');
		this.numCol.setAttribute("name", "numCol");
		this.numCol.setAttribute("type", "number");
		this.numCol.value = 5;
		let formItemCol = this.addFormItem(itemCol,"列数：",this.numCol);
	}
	//提交按钮子类实现
	click(){
		let tableApi = new TableApi();
		if(this.IsEdit==false)
		{
			return tableApi.createTable(this.range,this.borderColor.value,this.backgroundColor.value,this.align.options[this.align.selectedIndex].value,this.numWidth.value,this.numRow.value,this.numCol.value);
		}
		else
		{
			return tableApi.editTable(this.tag,this.borderColor.value,this.backgroundColor.value,this.align.options[this.align.selectedIndex].value,this.numWidth.value);
		}
	}
}
//单元格设置窗体
class CellSetWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("40px");
		this.setWidth("300px");
		this.setLabWidth("80px");
		
		let itemBackgroundColor = this.addItem(container);
		this.backgroundColor = document.createElement("input");
		this.backgroundColor.setAttribute('unselectable','on');
		this.backgroundColor.setAttribute("name", "borderColor");
		this.backgroundColor.setAttribute("type", "color");
		this.backgroundColor.value = "#FFFFFF";
		let formItemBackgroundColor = this.addFormItem(itemBackgroundColor,"背景颜色：",this.backgroundColor);
	}
	//提交按钮子类实现
	click(){
		let tableApi = new TableApi();
		return tableApi.setSelectCellBackground(this.range,this.backgroundColor.value);
	}
}
//表格
class Table extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.window = new TableSetWindow(this.editor,'table','表格设置');
		this.select = new TableRightMenu(this.editor,this.config.items,this.button,'table',this.window);
	}
	click(e,button){
		let a = new Api();
		this.window.IsEdit = false;
		this.window.numRow.disabled = false;
		this.window.numCol.disabled = false;
		this.window.setRange(a.getRange());
		this.window.show(true);
	}
}
//插入HTML窗体
class InsertHTMLWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("200px");
		this.setWidth("880px");
		this.setLabWidth("80px");
		this.setFormItemWidth("750px");
		let itemHtml = this.addItem(container);
		this.textHtml = document.createElement("textarea");
		this.textHtml.setAttribute('unselectable','on');
		this.textHtml.setAttribute("name", "textHtml");
		this.textHtml.rows = 10;
		this.textHtml.cols = 100;
		let formItemHtml = this.addFormItem(itemHtml,"HTML：",this.textHtml);
	}
	//提交按钮子类实现
	click(){
		let html = this.textHtml.value;
		if(html != null && html != '')
		{
			if(this.range!=null)
			{
				let a = new Api();
				let status = a.insertHtmlAtCursor(this.range,html);
				if(status)
				{
					this.textHtml.value = "";
					return true;
				}
			}
		}
		return false;
	}
}
//插入HTML
class InsertHTML extends CommandBtn{
	constructor(editor,item){
		super(editor,item);
		this.loadItem();
	}
	loadItem(){
		this.window = new InsertHTMLWindow(this.editor,'insertHtml','插入HTML');
	}
	click(e,button){
		let a = new Api();
		this.window.setRange(a.getRange());
		this.window.show(true);
		/*
		let html = prompt("请输入html：");
		if(html != null && html != '')
		{
			let a = new Api();
			let status = a.insertHTML(html);
			if(status)
			{
			}
		}
		*/
	}
}
//分页线
class Formatpagebreak extends CommandBtn{
	click(e,button){
		let a = new Api();
		let pagebreak = document.createElement("div");
		pagebreak.contentEditable = false;
		pagebreak.setAttribute('unselectable','on');
		pagebreak.style.pageBreakAfter = "always";
		pagebreak.title = "分页";
		pagebreak.className = "pagebreak";
		a.insertNodeAtCursor(a.getRange(),pagebreak);
	}
}
//打印
class Print extends CommandBtn{
	click(e,button){
		const context = this.editor.getContext();
        let newWindow=window.open("","_blank");
        newWindow.document.write(context);
		newWindow.print();
        newWindow.document.close();
        newWindow.close();
	}
}
//全频
class Fullscreen extends CommandBtn{
	click(e,button){
		if(button.className=='fullscreen')
		{
			this.top = this.editor.editor.style.top;
			this.left = this.editor.editor.style.left;
			this.width = this.editor.editor.style.width;
			this.height = this.editor.editor.style.height;
			this.editor.editor.style.top = 0;
			this.editor.editor.style.left = 0;
			this.editor.editor.style.width = "100%";
			this.editor.editor.style.height = "100%";
			this.editor.editor.style.float = 'left';
			this.editor.editor.style.position = 'fixed';
			button.className = 'fullscreen_open';
		}
		else
		{
			this.editor.editor.style.top = this.top;
			this.editor.editor.style.left = this.left;
			this.editor.editor.style.width = this.width;
			this.editor.editor.style.height = this.height;
			this.editor.editor.style.float = 'none';
			this.editor.editor.style.position = 'relative';
			button.className = 'fullscreen';
		}
		this.editor.context.style.top = this.editor.toolbar.offsetHeight;
		this.editor.source.style.top = this.editor.toolbar.offsetHeight;
		this.editor.context.style.bottom = this.editor.foot.offsetHeight;
		this.editor.source.style.bottom = this.editor.foot.offsetHeight;
	}
}
//测试窗体
class TestWindow extends BasicWindow{
	//加载窗体内容由子类实现
	loadContext(container){
		this.setContextHeight("100px");
		this.setWidth("300px");
		this.setLabWidth("80px");
		let div = document.createElement("div");
		let h = document.createElement("h4");
		h.innerText = '开发者：hhjjjh';
		div.appendChild(h);
		let span = document.createElement("span");
		span.innerText = '博客:';
		div.appendChild(span);
		let a = document.createElement("a");
		a.href = "https://blog.csdn.net/hhjjjh";
		a.innerText = 'https://blog.csdn.net/hhjjjh';
		div.appendChild(a);
		container.appendChild(div);
	}
	setDefaultValue(){
	}
	//提交按钮子类实现
	click(){
		return true;
	}
}

//测试按钮
class Test extends CommandBtn{
	click(e,button){
		this.window = new TestWindow(this.editor,'test','关于');
		this.window.show(true);
		let a = new Api();
		//a.getSelection();
		//a.getRange();
		/**/
		let range = a.getRange();
		console.log('选中区域:'+range);
		console.log(range);
		let v;
		v=range.collapsed;     //如果范围的开始点和结束点在文档的同一位置，则为 true，即范围是空的，或折叠的。
		console.log('如果范围的开始点和结束点在文档的同一位置:'+v);
		v=range.commonAncestorContainer;     //范围的开始点和结束点的（即它们的祖先节点）、嵌套最深的 Document 节点。
		console.log('范围的开始点和结束点的（即它们的祖先节点）:'+v);
		console.log(v);
		v=range.endContainer;         //包含范围的结束点的 Document 节点。 
		console.log('包含范围的结束点的 Document 节点:'+v);
		console.log(v);
		v=range.endOffset;     //endContainer 中的结束点位置。
		console.log('endContainer 中的结束点位置:'+v);
		v=range.startContainer;     //包含范围的开始点的 Document 节点。
		console.log('包含范围的开始点的 Document 节点:'+v);
		console.log(v);
		v=range.startOffset;    //startContainer中的开始点位置。
		console.log('startContainer中的开始点位置:'+v);
		//选中区域的文字
		let text = range.toString();
		console.log('选中区域的文字:'+text);

		//选中区域的Element元素
		let elem = range.commonAncestorContainer;
		if(elem.nodeType != 1){
			 elem = elem.parentNode;
		}
		console.log('选中区域的Element元素:'+elem);
		console.log(elem);
		
		//选中区域的html
		let span = range.cloneContents();
		console.log('选中区域的html:'+span);
		console.log(span);
		
		//选区是否为空
		let isSelectionEmpty = false;
		if (range.startContainer === range.endContainer) {
		   if (range.startOffset === range.endOffset) {
			   isSelectionEmpty = true;
		   }
		}
		console.log('选区是否为空:'+isSelectionEmpty);
		
	}				

}

//命令API
class Api{
	constructor(){
	}
	//粗体
	bold(){
		let status = document.execCommand('bold', false, null);
		return status;
	}
	//斜体
	italic(){
		let status = document.execCommand('italic', false, null);
		return status;
	}
	//下划线
	underline(){
		let status = document.execCommand('underline', false, null);
		return status;
	}
	//删除线
	strikeThrough(){
		let status = document.execCommand('strikeThrough', false, null);
		return status;
	}
	//上标
	superscript(){
		let status = document.execCommand('superscript', false, null);
		return status;
	}
	//下标
	subscript(){
		let status = document.execCommand('subscript', false, null);
		return status;
	}
	//背景色
	backColor(color){
		let status = document.execCommand('backColor', false, color);
		return status;
	}
	//字体
	fontName(name){
		let status = document.execCommand('fontName', false, name);
		return status;
	}
	//字号
	fontSize(size){
		let status = document.execCommand('fontSize', false, size);
		return status;
	}
	//文字顔色
	foreColor(color){
		let status = document.execCommand('foreColor', false, color);
		return status;
	}
	//增加缩进
	indent(){
		let status = document.execCommand('indent', false, null);
		return status;
	}
	//减少缩进
	outdent(){
		let status = document.execCommand('outdent', false, null);
		return status;
	}
	//铺满
	justifyFull(){
		let status = document.execCommand('justifyFull', false, null);
		return status;
	}
	//居中
	justifyCenter(){
		let status = document.execCommand('justifyCenter', false, null);
		return status;
	}
	//靠左
	justifyLeft(){
		let status = document.execCommand('justifyLeft', false, null);
		return status;
	}
	//靠右
	justifyRight(){
		let status = document.execCommand('justifyRight', false, null);
		return status;
	}
	//插入HTML
	insertHTML(html){
		let status = document.execCommand('insertHTML', false, html);
		return status;
	}
	//插入Image
	insertImage(src){
		let status = document.execCommand('insertImage', false, src);
		return status;
	}
	//超链接
	createLink(link){
		let status = document.execCommand('createLink', false, link);
		return status;
	}
	//取消超链接
	unlink(){
		let status = document.execCommand('unlink', false, null);
		return status;
	}
	//有序列表
	insertOrderedList(){
		let status = document.execCommand('insertOrderedList', false, null);
		return status;
	}
	//无序列表
	insertUnorderedList(){
		let status = document.execCommand('insertUnorderedList', false, null);
		return status;
	}
	//清除格式
	removeFormat(){
		let status = document.execCommand('removeFormat', false, null);
		return status;
	}
	//获取选中
	getSelection(){
		/*
		术语
		以下几个名词是英文文档中的几个名词。

		anchor
		选中区域的“起点”。
		focus
		选中区域的“结束点”。
		range
		是一种fragment(HTML片断)，它包含了节点或文本节点的一部分。一般情况下，同一时刻页面中只可能有一个range，也有可能是多个range（使用Ctrl健进行多选，不过有的浏览器不允许，例如Chrome）。可以从selection中获得range对象，也可以使用document.createRange()方法获得。

		属性
		anchorNode
		返回包含“起点”的节点。
		anchorOffset
		“起点”在anchorNode中的偏移量。
		focusNode
		返回包含“结束点”的节点。
		focusOffset
		“结束点”在focusNode中的偏移量。
		isCollapsed
		“起点”和“结束点”是否重合。
		rangeCount
		返回selection中包含的range对象的数目，一般存在一个range，Ctrl健配合使用可以有多个。

		方法
		getRangeAt(index)
		从当前selection对象中获得一个range对象。
		index：参考rangeCount属性。
		返回：根据下标index返回相应的range对象。
		collapse(parentNode, offset)
		将开始点和结束点合并到指定节点（parentNode）的相应（offset）位置。
		parentNode：焦点（插入符）将会在此节点内。
		offset： 取值范围应当是[0, 1, 2, 3, parentNode.childNodes.length]。
		0：定位到第一个子节点前。
		1：第二个子节点前。
		……
		childNodes.length-1：最后一个子节点前。
		childNodes.length：最后一个子节点后。
		Mozilla官方文档 中讲到取值为0和1，经测试不准确。文档中还有一句不是十分清楚“The document is not modified. If the content is focused and editable, the caret will blink there.”
		extend(parentNode, offset)
		将“结束点”移动到指定节点（parentNode）的指定位置（offset）。
		“起点”不会移动，新的selection是从“起点”到“结束点”的区域，与方向无关（新的“结束点”可以在原“起点”的前面）。
		parentNode：焦点将会在此节点内。
		Offset：1，parentNode的最后；0，parentNode的最前。
		modify(alter, direction, granularity)
		改变焦点的位置，或扩展|缩小selection的大小
		alter：改变的方式。”move”，用于移动焦点；”extend”，用于改变selection。
		direction：移动的方向。可选值forward | backword或left | right
		granularity：移动的单位或尺寸。可选值，character", "word", "sentence", "line", "paragraph", "lineboundary", "sentenceboundary", "paragraphboundary", or "documentboundary"。
		Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1才会支持此函数， 官方文档：https://developer.mozilla.org/en/DOM/Selection/modify
		collapseToStart()
		将“结束点”移动到，selction的“起点”，多个range时也是如此。
		collapseToEnd()
		将“起点”移动到，selction的“结束点”，多个range时也是如此。
		selectAllChildren(parentNode)
		将parentNode的所有后代节点（parentNode除外）变为selection，页面中原来的selection将被抛弃。
		addRange(range)
		将range添加到selection当中，所以一个selection中可以有多个range。
		注意Chrome不允许同时存在多个range，它的处理方式和Firefox有些不同。
		removeRange(range)
		从当前selection移除range对象，返回值undefined。
		Chrome目前没有改函数，即便是在Firefox中如果用自己创建（document.createRange()）的range作为参数也会报错。
		如果用oSelction.getRangeAt()取到的，则不会报错。
		removeAllRanges()
		移除selection中所有的range对象，执行后anchorNode、focusNode被设置为null，不存在任何被选中的内容。
		toString()
		返回selection的纯文本，不包含标签。
		containsNode(aNode, aPartlyContained)
		判断一个节点是否是selction的一部分。
		aNode：要验证的节点。
		aPartlyContained：true，只要aNode有一部分属于selection就返回true；false，aNode必须全部属于selection时才返回true。
		*/
		let se;
		if (window.getSelection && window.getSelection().getRangeAt) {
			se = window.getSelection();
		} else if (document.selection && document.selection.createRange) {
			se = document.selection;
		}
		return se;
	}
	//选中的范围
	getRange(){
		let range;
		if (window.getSelection && window.getSelection().getRangeAt) {
			if(window.getSelection().rangeCount>0){
				range = this.getSelection().getRangeAt(0);
			}
		} else if (document.selection && document.selection.createRange) {
			range = this.getSelection().createRange();
		}
		return range;
	}
	//获取选中区域上层元素中指定的元素
	getElement(range,tagName,elem){
		if(elem == undefined)
		{
			if(range!=null)
			{
				//选中区域的Element元素
				elem = range.commonAncestorContainer;
				if(elem.nodeType != 1){
					 elem = elem.parentNode;
				}
			}
		}
		if(elem!=null && elem.tagName!=tagName)
		{
			elem = elem.parentNode;
			if(elem!=null)
			{
				return this.getElement(range,tagName,elem)
			}
			return null;
		}
		else
		{
			return elem;
		}
	}
	//选中区域对象处理
	seletTextBil(range,call,tag,elem){
		if(range!=null)
		{
			let n;
			if(elem == undefined)
			{
				this.removestatus = false;//是否可删除标记
				this.status = false;//是否可以开始处理
				let rangeF = range.cloneRange();//为了不影响原来的选区故创建一个新选区
				//创建开始标记
				this.spanstart = document.createElement("span");
				this.spanstart.id = "start";
				//创建结束标记
				this.spanend = document.createElement("span");
				this.spanend.id = "end";
				range.insertNode(this.spanstart);//在选区开始外插入开始标记
				rangeF.collapse(false);//把范围的开始点设置为与结束点相同的值
				rangeF.insertNode(this.spanend);//在选区结束后插入结束标记
				range.setStartBefore(this.spanstart);//将新插入的开始标记添加到选区
				range.setEndAfter(this.spanend);//将新插入的结束标记添加到选区
				elem = range.commonAncestorContainer;
				if(elem.nodeType != 1){
					 elem = elem.parentNode;
				}
			}
			Array.from(elem.childNodes).map(node=>{
				if(node.nodeType == 1){
					if(node.id=='start')
					{
						this.status = true;//设置状态为开始处理
					}
					else if(node.id=='end')
					{
						this.status = false;//设置状态为结束处理
						this.removestatus = true;//设置可以清除标记
					}
					this.seletTextBil(range,call,tag,node);
					if(tag!=undefined && tag==node.nodeName)
					{
						let rn = call(node,this.status);
						if(rn!=undefined)
						{
							n = rn;
						}
					}
				}
				else
				{
					if(tag==undefined)
					{
						let rn = call(node,this.status);
						if(rn!=undefined)
						{
							n = rn;
						}
					}
				}
			});
			if(this.removestatus)
			{
				if(this.spanstart!=null)
				{
					range.setStartAfter(this.spanstart);//将开始标记节点排除到选区外
					this.spanstart.remove();//删除开始标记节点
				}
				if(this.spanend!=null)
				{
					range.setEndBefore(this.spanend);//将结束标记节点排除到选区外
					this.spanend.remove();//删除结束标记节点
				}
				this.removestatus = false;
			}
			if(range.collapsed)
			{
				if(n!=undefined)
				{
					range.setStartAfter(n);//将选区开始移进新创节点里
					range.setEndBefore(n);//将选区结束节点移进新创节点里
				}
			}
		}
	}
	//插入一个DOM节点
	insertNodeAtCursor(range,node){
		let html;
		if (window.getSelection && window.getSelection().getRangeAt) {
			if(range!=null){
				range.insertNode(node);
				return true;
			}
		} else if (document.selection && document.selection.createRange) {
			html = (node.nodeType == 3) ? node.data : node.outerHTML;
			if(range!=null){
				range.pasteHTML(html);
				return true;
			}
		}
		return false;
	}
	//插入一个HTML字符串
	insertHtmlAtCursor(range,html){
		let node;
		if (window.getSelection && window.getSelection().getRangeAt) {
			if(range!=null){
				node = range.createContextualFragment(html);
				range.insertNode(node);
				return true;
			}
		} else if (document.selection && document.selection.createRange) {
			if(range!=null){
				range.pasteHTML(html);
				return true;
			}
		}
		return false;
	}
	//HTML代码格式化
	htmlFormat(html,isFormat){
		let newhtml = '';
		if(isFormat)
		{
			let htmlArr = html.split('><');
			let tab = '    ';
			let c=0;
			let arrIndex=0;
			let isEnd = false;
			let frontTag = '';
			Array.from(htmlArr).map(tag=>{
				if(tag.length>0)
				{
					if(arrIndex>0)
					{
						newhtml+='>';
						if(frontTag!=tag.replace('/','').substring(0,tag.search(' ')>0 ? tag.search(' ') : tag.length))
						{
							newhtml+='\n';
							if(tag.substring(0,1)==='/')
							{
								if(c>0)
								{
									c--;
								}
							}
							else
							{
								if(isEnd==false)
								{
									c++;
								}
							}
							for(let i=0;i<c;i++)
							{
								newhtml+=tab;
							}
						}
						newhtml+='<';
					}
					newhtml+=tag;
					if(tag.search('/')>=0)
					{
						isEnd = true;		
					}
					else
					{
						isEnd = false;		
					}
					frontTag = tag.replace('/','').substring(0,tag.search(' ')>0 ? tag.search(' ') : tag.length);
				}
				arrIndex++;
			});
			
		}
		else
		{
			let htmlArr = html.split('>\n');
			let arrIndex=0;
			Array.from(htmlArr).map(tag=>{
				newhtml+=tag.replace(/(^\s*)/g, "");
				if(arrIndex<htmlArr.length-1)
				{
					newhtml+='>';
				}
				arrIndex++;
			});
		}
		return newhtml;
	}
}