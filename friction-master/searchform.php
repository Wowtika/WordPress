<div class="form-wrapper">
	<form class="d-flex" role="search" method="get" id="searchform" action="<?php echo home_url( '/' ) ?>" >
		<input class="form-input" type="text" value="<?php get_search_query() ?>" placeholder="Поиск по сайту" name="s" id="s"/>
		<button class="button" type="submit"></button>
	</form>
</div>