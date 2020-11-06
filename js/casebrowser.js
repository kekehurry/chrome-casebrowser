var pre_search_engine={
		'baidu':'https://www.baidu.com/s?wd={%s}',
		'google':'https://www.google.com/search?q={%s}',
		'gooood': 'https://www.gooood.cn/search/{%s}',
  	'archdaily': 'https://www.archdaily.cn/search/cn/all?q={%s}',
		'archcollege':'http://www.archcollege.com/home.php?m=Index&type=article&a=search&key={%s}',
		'pinterest':'https://www.pinterest.com/search/pins/?q={%s}',
		'huaban':'https://huaban.com/search/?q={%s}',
		'500px':'https://500px.com/search?q={%s}&type=photos',
		'unsplash':'https://unsplash.com/s/photos/{%s}}',
		'知乎':'https://www.zhihu.com/search?type=content&q={%s}',
		'weixin': 'https://weixin.sogou.com/weixin?type=2&query={%s}',
	    'weibo':'https://s.weibo.com/weibo/{%s}',
	    'divisare':'https://divisare.com/search?q={%s}'
	}
var pre_content_setting={
  		'gooood':'.client-view',
    	'archdaily':'.afd-main-content',
    	'ikuku':'.SingleArticleMainDescription',
    	'archcollege':'.atcl_extend',
        'archiposition':'.detail-content',
        'archinect':'.ProjectDescription',
  	    'divisare':'.projects'
  	};

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

function init_setting_page(search_engine,content_setting){
			var $setting_page=$(".setting_page");
			for(var engine in search_engine){
				var $input=$("<span><input type='text' class='name_box'/>&nbsp:&nbsp<input type='text' class='value_box'/></span><br>");
				$input.find('input').eq(0).attr({name:engine,value:engine,disabled:'disabled'});
				$input.find('input').eq(1).attr({name:engine,value:search_engine[engine],disabled:'disabled'});
				$input.dblclick(function(){$(this).find('input').removeAttr('disabled')});
				$setting_page.find('form').eq(0).append($input);
			}
			for(var website in content_setting){
				var $input_2=$("<span><input type='text' class='name_box'/>&nbsp:&nbsp<input type='text' class='value_box'/></span><br>");
				$input_2.find('input').eq(0).attr({name:website,value:website,disabled:'disabled'});
				$input_2.find('input').eq(1).attr({name:website,value:content_setting[website],disabled:'disabled'});
				$input_2.dblclick(function(){$(this).find('input').removeAttr('disabled')});
				$setting_page.find('form').eq(1).append($input_2);
			}
			function add_engine(){
				var click_times=0;
				var $button=$("<span><input type='text' value='网站域名' class='name_box' disabled='disabled'/>&nbsp:&nbsp<input value='搜索地址，关键词用{%s}代替' class='value_box' disabled='disabled'/></span>");
				$button.click(function(){
					click_times+=1;
					if (click_times==1){
						$button.find('input').eq(0).removeAttr('disabled');
						$button.find('input').eq(1).removeAttr('disabled');
						$button.find('input').eq(0).attr({value:''});
						$button.find('input').eq(1).attr({value:''});
					return add_engine();}}
				);
				$setting_page.find('form').eq(0).append($button);
			}
			function add_website(){
				var click_times=0;
				var $button=$("<span><input type='text' value='网站域名' class='name_box' disabled='disabled'/>&nbsp:&nbsp<input value='\".\"+正文部分class属性名(不要漏了前面的\".\")' class='value_box' disabled='disabled'/></span>");
				$button.click(function(){
					click_times+=1;
					if (click_times==1){
						$button.find('input').eq(0).removeAttr('disabled');
						$button.find('input').eq(1).removeAttr('disabled');
						$button.find('input').eq(0).attr({value:''});
						$button.find('input').eq(1).attr({value:''});
					return add_website();}}
				);
				$setting_page.find('form').eq(1).append($button);
			}
			add_engine();
			add_website();
			$setting_page.find('li').eq(0).click(function(){$setting_page.toggle()});
			$setting_page.find('li').eq(1).click(function(){
				chrome.storage.sync.set({'search_engine':pre_search_engine,'content_setting':pre_content_setting},function(){window.location.reload()});
			});
			$setting_page.find('li').eq(2).click(function(){
				var new_engine_data={};
				var search_engine_form=$setting_page.find('form').eq(0);
				var engine_name_list=search_engine_form.find('.name_box');
				var engine_value_list=search_engine_form.find('.value_box');
				for(var n=0; n<engine_name_list.length-1;n++){
					if(engine_value_list[n].value!="" && engine_name_list[n].value!="" ){
						new_engine_data[engine_name_list[n].value]=engine_value_list[n].value;
					}
				}
				var new_setting_data={};
				var content_setting_form=$setting_page.find('form').eq(1);
				var setting_name_list=content_setting_form.find('.name_box');
				var setting_value_list=content_setting_form.find('.value_box');
				for(var m=0; m<setting_name_list.length-1;m++){
					if(setting_value_list[m]){
						new_setting_data[setting_name_list[m].value]=setting_value_list[m].value;
					}
				}
				chrome.storage.sync.set({'search_engine':new_engine_data,'content_setting':new_setting_data},function(){window.location.reload()});
		});
	}
function init(){
	$("input").focus(function(){if(this.value=='请输入关键词'){this.value=''}});
	$("input").blur(function(){if(this.value==''){this.value='请输入关键词'}});
	$("input").keydown(function(event){if(event.which==13){return search()}});
	$("button").click(function(){search()});
	chrome.storage.sync.get(["search_engine","content_setting"],function(result){
		if($.isEmptyObject(result)){
			chrome.storage.sync.set({'search_engine':pre_search_engine,'content_setting':pre_content_setting},function(){window.location.reload()});
		}
		var search_engine=result["search_engine"];
		var content_setting=result["content_setting"];
		for(var engine in search_engine){
			var domain= search_engine[engine].split('/');
			var site_name=engine;
			if(domain[2]){
				var icon_url=domain[0]+'//'+domain[2]+'/favicon.ico';
			}else{
				var icon_url='';
			}
			var $container=$('.tag_box').find('ul').eq(0);
			var $img=$('<img>');
			var $li=$('<li><img></li>');
			$li.find('img').attr({src:icon_url,alt:site_name,onerror:"this.parentNode.innerHTML='site_name'".replace('site_name',site_name)})
			$li.attr({class:"engine_box","data-url": search_engine[engine]});
			$li.click(function(){this.classList.toggle('active')});
			$li.dblclick(function(){
				var my_engine=$(this).attr('data-url').split('/');
				var link=my_engine[0]+'//'+my_engine[2];
				chrome.tabs.create({"url":link});
			});
			$li.insertBefore($container.children().last());
		};
		init_setting_page(search_engine,content_setting);
	});
	$("#setting_button").click(function(){$(".setting_page").toggle()});
}

$(function(){init()});