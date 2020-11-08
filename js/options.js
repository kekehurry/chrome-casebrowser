


function init_library(){
var engine_library={
  "搜索引擎":{
    'baidu':'https://www.baidu.com/s?wd={%s}',
		'google':'https://www.google.com/search?q={%s}',
    'bing':'https://cn.bing.com/search?q={%s}',
    'duckduckgo':'https://duckduckgo.com/?q={%s}',
    'wikipedia':'https://en.wikipedia.org/w/index.php?search={%s}'
  },
  "建筑案例":{
    'gooood': 'https://www.gooood.cn/search/{%s}',
  	'archdaily': 'https://www.archdaily.cn/search/cn/all?q={%s}',
		'archcollege':'http://www.archcollege.com/home.php?m=Index&type=article&a=search&key={%s}',
    'archiposition':'http://www.archiposition.com/?s={%s}&cat=all',
    'ikuku':'http://www.ikuku.cn/?s={%s}',
    'designboom':'http://www.designboom.cn/news/search.php?kw={%s}',
    'architizer':'https://architizer.com/projects/q/q:{%s}',
    'dezeen':'https://www.dezeen.com/?s={%s}',
    'socks':'http://socks-studio.com/?s={%s}',
    'beta':'http://www.beta-architecture.com/?s=search&q={%s}',
    'nikken':'https://www.nikken.co.jp/cn/search/result.html?query={%s}'
  },
  "图片搜索":{
    'pinterest':'https://www.pinterest.com/search/pins/?q={%s}',
		'huaban':'https://huaban.com/search/?q={%s}',
		'500px':'https://500px.com/search?q={%s}&type=photos',
		'unsplash':'https://unsplash.com/s/photos/{%s}}',
    'dazuo':'https://www.bigbigwork.com/tupian/?w={%s}',
    'zcool':'https://www.zcool.com.cn/search/content?&word={%s}',
    'thenounproject':'https://thenounproject.com/search/?q={%s}',
    'iconfont':'https://www.iconfont.cn/search/index?searchType=icon&q={%s}',
    'behance':'https://www.behance.net/search?search={%s}',
    'dribbble':'https://dribbble.com/search/{%s}'
  },
  "平台搜索":{
    'zhihu':'https://www.zhihu.com/search?type=content&q={%s}',
    'weibo':'https://s.weibo.com/weibo/{%s}',
    'weixin':'https://weixin.sogou.com/weixin?type=2&query={%s}',
    'github':'https://github.com/search?q={%s}',
    'douban':'https://www.douban.com/search?q={%s}'
  },
  "学术搜索":{
    "zhiwang":"https://search.cnki.com.cn/Search/Result?content={%s}",
    "baidu_scholar":"https://xueshu.baidu.com/s?wd={%s}",
    "google_scholar":"https://scholar.google.com/scholar?q={%s}",
    "weipu":"http://www.cqvip.com/main/search.aspx?k={%s}",
    "wanfang":"http://www.wanfangdata.com.cn/search/searchList.do?searchType=all&searchWord={%s}"
  }
	}
// init engine_library
chrome.storage.sync.get("search_engine",function(result){
  for(var category in engine_library){
      $engine_list=$("<div class='category'><p></p><hr/></div>");
      $engine_list.find('p').text(category);
      $engine_list.attr({"data-category":category});
      for(var engine in engine_library[category]){
        $site=$("<div class='engine_box'><img><span>+</span></div>");
        $site.attr({"data-category":category});
        var icon_url='../img/'+engine+'.png';
        $site.find('img').attr({src:icon_url,alt:engine,"data-url":engine_library[category][engine]});
        $site.click(function(){
          if ($(this).parent()[0]!=$(".setting_box")[0]){
            $(this).find('span').text("x");
            $(this).find('span').attr({style:"background:#e74c3c"});
            $(".setting_box").append($(this));
          }else{
            $(this).find('span').text("+");
            $(this).find('span').attr({style:"background:#7d6cfc"});
            $(".category[data-category='xxx']".replace('xxx',$(this).attr("data-category"))).append($(this));
          }
        });
        if( (! $.isEmptyObject(result)) && (engine in result["search_engine"])){
            $site.find('span').text("x");
            $site.find('span').attr({style:"background:#e74c3c"});
            $(".setting_box").append($site);
          }
        else{
            $engine_list.append($site)
          }
      }
    $(".library_box").append($engine_list);
}
});
// init save_button
$(".save_button").click(function(){
  var search_engine={};
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
