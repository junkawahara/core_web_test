// ミラー用: 元サイトは <base href="サイトルート"> で JS 生成の相対URLを解決していたため、
// base 無しでも動くようスクリプト自身の URL からサイトルートを求める
var MIRROR_SITE_ROOT = (function () {
	var s = document.currentScript && document.currentScript.src;
	if (!s) { var e = document.querySelector('script[src*="tag.js"]'); s = e && e.src; }
	return s ? s.slice(0, s.lastIndexOf('/js/') + 1) : '';
})();

$(function() {

	const isEnglish = location.pathname.indexOf('/en/') !== -1

	// タグ
	$('.item_tags ul.tags_list').each(function(){
		const tagIds = $(this).attr('data-tag_id').split(',')
		const tagLabels = $(this).attr('data-tag').split(',')

		// no tag
		if (　tagIds == '') {
			$(this).parents('.item_tags').hide();
		}

		let tag_page = $(this).parents('ul').attr('id');

		if (tagIds.length) {

			if ( tag_page === 'information' || tag_page === 'achievements' || tag_page === 'event' || tag_page === 'past-event') {

				// information 
				for (let i=0; i<tagIds.length; i++) {
					$(this).append('<li class="tagitem"><a href="' + MIRROR_SITE_ROOT + (isEnglish ? 'en/' : '') + 'report/' + tag_page + '/tags/---tag-' + tagIds[i] + '.html">' + tagLabels[i] + '</a></li>');
				}

			} 
			
			//if ( document.URL.match(/\/event\//) ||  document.URL.match(/\/past-event\//) ) {
			//
			//} 

			else {

			}
		} 
	})
});