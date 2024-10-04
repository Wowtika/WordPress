<?php

get_header(); ?>

<div class="section-content section-search-results">
	<div class="container">
		<div class="row">
			<div class="col-12 page-content">
				<h1 class="search-results-h1"><?php printf( __( 'Результат поиска: %s', 'twentytwelve' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
				<?php //get_search_form(); ?>
				<?php if( have_posts() ) { ?>
				<?php while( have_posts() ) { the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header class="entry-header">
						<h2 class="entry-title">
							<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
						</h2>
					</header>
					<div class="entry-content">
						<?php the_excerpt(); ?>
					</div>
				</article>
				<?php } ?>
				<?php if( function_exists('wp_pagenavi') ) wp_pagenavi(); ?>
				<?php } else { ?>
				<article id="post-0" class="post no-results not-found">
					<div class="entry-content">
						<p><?php _e( 'Ничего не найдено.', 'twentytwelve' ); ?></p>
					</div>
				</article>
				<?php } ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>