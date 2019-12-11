# WebEditor
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>简易富文本编辑器</title>
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  </head>
  <!--Css引用-->
  <link rel="stylesheet" type="text/css" href="css/editor.css"/>
  <!--js引用-->
  <script type="text/javascript" src='js/editor.js'></script>
  <body>
	编译版
	<div style='width:800px;height:300px;'>
	<div id="editor"></div>
	<div id="editor1"></div>
	</div>
  </body>
</html>

<script type="text/javascript">
	var editor = new Editor("editor");
	//自定义配置
		var config=[
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
			{name:'fullscreen',title:'全频'}
		];
	var editor1 = new Editor("editor1",config);
  </script>
