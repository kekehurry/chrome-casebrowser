
function search(){
	var key=$('input').val();
	var engine_list=$(".engine_box.active");
	if(engine_list.length!=0){
		for(var i=0;i<engine_list.length;i++){
			chrome.tabs.create({"url":engine_list[i].getAttribute('data-url').replace('{%s}',key)});
		}}
	else{
			chrome.tabs.create({"url":"https://www.baidu.com/s?wd={%s}".replace('{%s}',key)});
		}
}

function init(){
	$("input").focus(function(){if(this.value=='请输入关键词'){this.value=''}});
	$("input").blur(function(){if(this.value==''){this.value='请输入关键词'}});
	$("input").keydown(function(event){if(event.which==13){return search()}});
	$("button").click(function(){search()});
	chrome.storage.sync.get("search_engine",function(result){
		var search_engine=result["search_engine"];
		var content_setting=result["content_setting"];
		for(var engine in search_engine){
			var domain= search_engine[engine].split('/');
			var icon_url='../img/'+engine+'.png';
			var $container=$('.tag_box').find('ul').eq(0);
			var $img=$('<img>');
			var $li=$('<li><img></li>');
			$li.find('img').attr({src:icon_url,alt:engine,onerror:"this.parentNode.innerHTML='site_name'".replace('site_name',engine)})
			$li.attr({class:"engine_box","data-url": search_engine[engine]});
			$li.click(function(){this.classList.toggle('active')});
			$li.dblclick(function(){
				var my_engine=$(this).attr('data-url').split('/');
				var link=my_engine[0]+'//'+my_engine[2];
				chrome.tabs.create({"url":link});
			});
			$li.insertBefore($container.children().last());
		};
	});
	$("#setting_button").click(function(){window.location.href="options.html"});
}

$(function(){init()});
