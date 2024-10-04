<?php get_header(); ?>
<?php $post_id = get_the_ID(); ?>
<div class="bg-menu"></div>
<!-- <div class="blog-header">
	<img src="<?=get_template_directory_uri();?>/assets/img/home/product-fon.jpg" class="product-bg">

	<div class="cta-lines">

		<div class="cta-red-lines">
			<img class="cta-red-lines__image" src="<?=get_template_directory_uri();?>/assets/img/home/cta-red-lines.svg" alt="" />
		</div>

		<div class="cta-white-lines">
			<img class="cta-white-lines__image" src="<?=get_template_directory_uri();?>/assets/img/home/cta-white-lines.svg" alt="" />
		</div>
	</div>

</div> -->

<main class="page page_blog">

	<div class="page__blog-category">

		<div class="blog-category__container">

			<div class="blog-category">
				<a href="<?= get_permalink(162); ?>" class="blog-category__link">
					<span>All</span>
				</a>

				<?php 
					$category = get_the_category();

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
							<a href="<?= get_category_link( $cat->term_id ); ?>" class="blog-category__link <?= $category[0]->term_id == $cat->term_id ? 'active' : '' ?>">
								<span><?= $cat->name; ?></span>
							</a>
						<?php
						}
					}
				?>

			</div>
		</div>
	</div>

	<div class="page__info info">

		<div class="info__container">

			<div class="info__header">
				<h1 class="info__heading header3"><?php if ( function_exists('h1_title') ) h1_title(); ?></h1>
			</div>

			<div class="info__body body-info">
				<div class="single-blog-article">
					<?php the_content(); ?>
				</div>
			</div>

		</div>

	</div>


	<div class="page__blog single-page__blog">

		<div class="blog__container">

			<div class="blog">

				<?php 
					$query = new WP_Query([ 
						'post_type'			=> 'post',
						'posts_per_page'	=> 5,
						'cat'			=> $category[0]->term_id,
						'post__not_in'	=> [$post_id],
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