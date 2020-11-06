


function init_library(){
var engine_library={
  "搜索引擎":{
    'baidu':'https://www.baidu.com/s?wd={%s}',
		'google':'https://www.google.com/search?q={%s}'
  },
  "建筑案例":{
    'gooood': 'https://www.gooood.cn/search/{%s}',
  	'archdaily': 'https://www.archdaily.cn/search/cn/all?q={%s}',
		'archcollege':'http://www.archcollege.com/home.php?m=Index&type=article&a=search&key={%s}'
  },
  "图片搜索":{
    'pinterest':'https://www.pinterest.com/search/pins/?q={%s}',
		'huaban':'https://huaban.com/search/?q={%s}',
		'500px':'https://500px.com/search?q={%s}&type=photos',
		'unsplash':'https://unsplash.com/s/photos/{%s}}'
  }
	}
// init engine_library
for(var category in engine_library){
  $engine_list=$("<div class='category'><p></p><hr/></div>");
  $engine_list.find('p').text(category);
  $engine_list.attr({"data-category":category});
  for(var engine in engine_library[category]){
    $site=$("<div class='engine_box'><img><span>+</span></div>");
    $site.attr({"data-category":category});
    var icon_url='../img/'+engine+'.png';
    $site.find('img').attr({src:icon_url,alt:engine,"data-url":engine_library[category][engine]});
    $engine_list.append($site);
    $site.click(function(){
      if ($(this).parent()[0]!=$(".setting_box")[0]){
        $(this).find('span').text("x");
        $(this).find('span').attr({style:"background:#e74c3c"});
        $(".setting_box").append($(this));
      }else{
        $(this).find('span').text("+");
        $(this).find('span').attr({style:"background:#3498db"});
        $(".category[data-category='xxx']".replace('xxx',$(this).attr("data-category"))).append($(this));
      }
      });
  }

  $(".library_box").append($engine_list);
}
// init save_button
var search_engine={};
$(".save_button").click(function(){
  var s_list=$('.setting_box').children();
  for(var i=0;i<s_list.length;i++){
    var engine=s_list.eq(i).find('img').attr("alt")
    var data_url=s_list.eq(i).find('img').attr("data-url");
    search_engine[engine]=data_url;
  }
  chrome.storage.sync.set({"search_engine":search_engine},function(){console.log(search_engine)});
  window.location.href="casebrowser.html";
});
}
$(function(){init_library()});
