$(function () {

	/*
	var dev_url = location.href;

	console.log(dev_url);

	// 表示要素 トグルスイッチ
	var design_toggle =
		'<div class="toggle-switch" id="design_toggle"><input id="toggle" class="toggle-input" type="checkbox" /><label for="toggle" class="toggle-label" /><span></span> </div>';

	if (dev_url.match("localhost")) {
		$("body").append(design_toggle);
		console.log("local?");
	} else {
		$("#cmsmenu").append(design_toggle);
		console.log("cms");
	}
	*/

	// メールアドレス置換
	var $mail = $("a[data-host]");
	$mail.each(function() {
		var pre = $(this).attr("data-account"),
			host = $(this).attr("data-host"),
			text = $(this).html(),
			add = pre + "@" + host;

		if (text == "@") {
			$(this)
				.attr("href", "mailto:" + add)
				.html(pre + text + host);
		} else {
			$(this)
				.attr("href", "mailto:" + add)
				.html(text);
		}
	});

	// bodyにcss用 class付与
	$("#design_toggle").on("click", function () {
		$("body").toggleClass("view_desgin");
	});

	//スクロール
	$('[href^="#"]').on('click', function(){
		var w = $(window).width();
		var href = $(this).attr('href');
		var pos = $(href).offset().top;
		$('body, html').animate({scrollTop: pos}, 800);
		return false;
	});

	$(window).on('scroll', function(){
		if ($(this).scrollTop() > 200) {
			$('#top').addClass('active');
		} else {
			$('#top').removeClass('active');
		}
		var footHeight = $("footer").innerHeight(),
			scrollHeight = $(document).height(),
			scrollPosition = $(window).height() + $(window).scrollTop();

		if ( scrollHeight - scrollPosition  <= footHeight ) { 
			var winW = $(window).width();
			var sp = 767;
			if (winW <= sp) {
				//SP
				$("#top").css({
					"position":"fixed", 
					"bottom": "40px" 
				});
			}else{
				//PC
				$("#top").css({
					"position":"absolute", 
					"bottom": footHeight + 55 
				});
			}
		} else { //それ以外の場合は
			$("#top").css({
				"position":"fixed", 
				"bottom": "20px" 
			});
		}
	});

	//SPメニューの開閉
	var hamburger = $('#js-hamburger');
	hamburger.on('click', function(){
		hamburger.toggleClass('open');
		if(hamburger.hasClass('open')){
			$("#sp_nav").removeClass('close');
			$("#sp_nav").addClass('open');
		}else{
			$("#sp_nav").addClass('close');
		}
	});
	$("#sp_nav").on('animationend webkitAnimationEnd',function(){
		if($("#sp_nav").hasClass('close')){
			$("#sp_nav").removeClass('open');
		};
	});

	//第2階層以降の開閉
	var loca_path = location.pathname,
		pageUrl = loca_path.slice(1).toString();

	$('#sp_nav ul.depth2 a').each(function(){
		var thispage = $(this).attr('href');

		if ( thispage == pageUrl) {
			$(this).parents('li.depth1').addClass('open');
			$(this).parents('ul.depth2').slideDown(0);
		}
	});


	var $sp_nav = $('#sp_nav');

	$sp_nav.find('li.depth1.has_children').children('a').on('click', function(e){
		var $me = $(this).closest('li');
		$sp_nav.find('.has_children').not($me).removeClass('open').children('ul.depth2').stop(true,true).slideUp(300);
		var $target = $me.children('ul.depth2');
		if($me.hasClass('open')){
			$me.removeClass('open');
			$target.stop(true,true).slideUp(300);
		} else {
			$me.addClass('open');
			$target.stop(true,true).slideDown(300);
		}
		return false;
	});

	//ページネーションの適応
	var prev = $(".paging .pagination .prev");
	var next = $(".paging .pagination .next");
	if(prev.children("a").length){
		prev.children("a").text("");
		prev.children("a").append('<img alt="prev" src="media/images/common/page_arrow_left.svg">');
	}else{
		prev.text("");
		prev.append('<img alt="prev" src="media/images/common/page_arrow_left.svg">');
	}
	if(next.children("a").length){
		next.children("a").text("");
		next.children("a").append('<img alt="prev" src="media/images/common/page_arrow_right.svg">');
	}else{
		next.text("");
		next.append('<img alt="prev" src="media/images/common/page_arrow_right.svg">');
	}

});

//イベントやお知らせ一覧で空要素を非表示に　対象要素を指定して適宜呼び出し
function hide_empty(selector,delimiter){
	selector.each(function(){
		if(delimiter){
			var text = $(this).text().split(delimiter);
			if(!text[1] || !text[1].match(/\S/g)){
				$(this).css('display','none')
			}
		}else{
			var text = $(this).text();
			if(!text || !text.match(/\S/g)){
				$(this).css('display','none')
			}
		}
	});
}

// event
$(function(){
	$('#event > li, #past-event > li').each(function(){
		let item_text = $(this).find('.item_content').text();
		$(this).find('.event_content').text(item_text);
	});

	$('#event .subtitle_item:has(.subtitle_content:empty)').hide();
	$('#past-event .subtitle_item:has(.subtitle_content:empty)').hide();
})

// 
$(function(){
	if (location.href.indexOf('/en/') !== -1) {
		$('.gl_nav .lm12').append(`
			<ul class="depth2">
				<li class="type1 depth2 lm71 active first "><a href="en/message/202303/">March 2023</a></li>
				<li class="type1 depth2 lm72  last "><a href="en/message/202103/">March 2021</a></li>
			</ul>
		`)
	} else {
		$('.gl_nav .lm3').append(`
			<ul class="depth2">
				<li class="type1 depth2 lm70 active first "><a href="message/202303/">2023年3月</a></li>
				<li class="type1 depth2 lm69  last "><a href="message/202103/">2021年3月</a></li>
			</ul>
		`)
		$('.fotter-menu.pc div:nth-child(2)').each(function(){
			if ($('ul', this).length === 0) {
				$(this).append(`
					<ul class="depth1">
						<li class="type1 depth1 lm70 active first "><a href="message/202303/" class="dropdown-toggle" data-hover="dropdown" data-delay="0" data-close-others="false">2023年3月</a></li>
						<li class="type1 depth1 lm69  last "><a href="message/202103/" class="dropdown-toggle" data-hover="dropdown" data-delay="0" data-close-others="false">2021年3月</a></li>
					</ul>
				`)
			}
		})
	}
})