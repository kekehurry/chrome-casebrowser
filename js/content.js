alert("hello");
var scrollHeight = $('body').prop("scrollHeight");
var wait_time=4000
if (scrollHeight-$('html').scrollTop()>2*$(window).height()){$('html').animate({scrollTop:scrollHeight}, wait_time);}
else{wait_time=0}
setTimeout(function(){
    var $img_page=$("<div class='img_page'><div></div><ul><li>关闭</li><li>全选</li><li>下载</li></ul></div>");
    var img_list=$("html").find('img');
    for(var i=0;i<img_list.length;i++){
      var img_url=img_list[i].src;
      var $img=$('<img></img>');
      $img.attr("src",img_url);
      var $img_box=$("<div class='img_box'><p></p></div>");
      var img_width=$img[0].naturalWidth;
      var img_height=$img[0].naturalHeight;
      if(img_width>300){
                $img_box.append($img);
                $img_box.find('p').text(img_width+'x'+img_height);
                $img_box.click(function(){$(this).toggleClass("selected")});
                $img_page.append($img_box);
            }
    }
    $('body').append($img_page);
    $img_page.find('li').eq(0).click(function(){$img_page.remove()});
    $img_page.find('li').eq(1).click(function(){
      if($(this).text()=='全选'){
        $(this).text('取消');
        $('.img_box').addClass("selected");}
      else{
        $(this).text('全选');
        $('.img_box').removeClass("selected");}
      });
    $img_page.find('li').eq(2).click(function(){
      var selected_imgs=$('.selected').children('img');
      for(var m=0;m<selected_imgs.length;m++){
        var url=selected_imgs[m].getAttribute('src');
        var name=url.split('?')[0].split('/').slice(-1)[0];
        // GM_download(url,name);
      }
    });
  },wait_time);
