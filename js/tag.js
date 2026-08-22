$(function() {

	const isEnglish = location.pathname.indexOf('/en/') === 0

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
					$(this).append('<li class="tagitem"><a href="' + (isEnglish ? 'en/' : '') + 'report/' + tag_page + '/tags/---tag-' + tagIds[i] + '.html">' + tagLabels[i] + '</a></li>');
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