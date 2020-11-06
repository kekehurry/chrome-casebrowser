


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
for(var category in engine_library){
  $engine_list=$("<div class='category'><p></p><hr/></div>");
  $engine_list.find('p').text(category);
  $engine_list.attr({"data-category":category});
  for(var engine in engine_library[category]){
    $site=$("<div class='engine_box'><img><span>+</span></div>");
    $site.attr({"data-category":category});
    var icon_url='../img/'+engine+'.jpg';
    $site.find('img').attr({src:icon_url,alt:engine});
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
}

$(function(){init_library()});