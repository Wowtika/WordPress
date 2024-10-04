<?php 
/* Template Name: Blog */

get_header() ?>
<div class="bg-menu"></div>
<main class="page page_blog">

	<div class="page__blog-category">

		<div class="blog-category__container">

			<div class="blog-category">
				<a href="<?= get_permalink(162); ?>" class="blog-category__link active">
					<span>All</span>
				</a>

				<?php 
					$categories = get_categories( [
						'taxonomy'     => 'category',
						'type'         => 'post',
						'child_of'     => 0,
						'parent'       => '',
						'orderby'      => 'id',
						'order'        => 'ASC',
						'hide_empty'   => 0,
						'hierarchical' => 1,
						'exclude'      => '',
						'include'      => '',
						'number'       => 0,
						'pad_counts'   => false,
					] );

					if( $categories ){
						foreach( $categories as $cat ){ ?>
							<a href="<?= get_category_link( $cat->term_id ); ?>" class="blog-category__link">
								<span><?= $cat->name; ?></span>
							</a>
						<?php
						}
					}
				?>

			</div>
		</div>
	</div>

	<div class="page__blog">

		<div class="blog__container">

			<div class="blog">

				<?php 
					$query = new WP_Query([ 
						'post_type'      => 'post',
						'posts_per_page' => 10,
						'tax_query' => [[
							'taxonomy' => 'category',
							'operator' => 'EXISTS',
						]]
					]);

					$num_posts = 1;
					while ( $query->have_posts() ) { $query->the_post(); 
						$src = wp_get_attachment_image_src(get_post_thumbnail_id($id), 'full');
						$url = $src[0];
						?>

						<div class="blog__item">
							<a href="<?= get_permalink(get_the_ID()); ?>" class="blog__link _blog<?= $num_posts; ?>" style="background-image: url(<?php echo $url; ?>);">
								<p class="blog__title">
									<?php the_title() ?>
								</p>
							</a>
						</div>

					<?php
						$num_posts++;
					}
					wp_reset_postdata(); // ВАЖНО вернуть global $post обратно
				?>

			</div>

			<?php /*
			<div class="blog-footer">
				<button type="button" class="button blog-button">Show more</button>
			</div>
			*/ ?>

		</div>

	</div>

</main>

<?php get_footer(); ?>