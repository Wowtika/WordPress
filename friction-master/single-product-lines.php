<?php 
	get_header();
	$prodlines_id = get_the_ID();
	$src = wp_get_attachment_image_src( get_post_thumbnail_id($id), 'full' );
	$url = $src[0];

	$current_post_id = get_the_ID();
	$categories = get_the_terms($current_post_id, 'product-lines');
	$current_category = array_shift($categories);
	//var_dump($current_category->term_id);

?>

<div class="card-header">
	<?php if(get_field('video_title')) { ?>
		<div class="video-bg">
			<video id="video" muted autoplay loop playsinline>
				<?php if(get_field('video_title_mp4')) { ?> 
					<source src="<?php the_field('video_title_mp4'); ?>" type="video/mp4" />
				<?php } ?>
				<source src="<?php the_field('video_title'); ?>"></source>
			</video>
		</div>
	<?php } ?>

	<div class="card-header__bg">
		<div class="card-header__wrapper">
			<?php if($url) { ?> 
				<img class="card-header__image" src="<?php echo $url; ?>" alt="<?php the_title(); ?>" />
			<?php } else { ?>
				<img class="card-header__image" src="/wp-content/uploads/2023/09/card-bg-black.svg" alt="<?php the_title(); ?>" />
			<?php } ?>
		</div>
	</div>
</div>

<main class="page page_card2">
	<div class="card-category__container">
		<div class="card-category">
			<?php
				$query = new WP_Query( array(
					'post_type' => 'product-lines',
					'order' => 'ASC',
					'orderby' => 'ID',
					'tax_query' => array(
						array(
							'taxonomy' => 'product-lines',
							'field' => 'id',
							'terms' => $current_category->term_id,
						),
					),
				));
			?>
			<?php if ( $query->have_posts() ) { ?>
				<?php while ( $query->have_posts() ) { ?>
					<?php $query->the_post(); ?>
					<a href="<?=get_permalink();?>" class="card-category__link<?php if(get_the_ID() === $prodlines_id) { echo " active"; } ?>">
						<span><?php the_field('name_product_line'); ?></span>
					</a>
				<?php } ?>
				<?php wp_reset_postdata(); ?>
			<?php } ?>
		</div>
	</div>
	
	<?php if(get_the_content()) { ?> 
	<section class="page__card2 card2">
		<div class="card2__container">
			<div class="card__header">
				<h2 class="card__heading">
					<?=get_field('title');?>
				</h2>
			</div>

			<div class="card2__body">
				<div class="card2__gallery">
					<img src="<?=kama_thumb_src('src='.get_field('img').'&w=628');?>" class="card2__image" alt="<?=get_field('title');?>" />
				</div>

				<div class="card2__content content-card">
					<div class="content-card__footer footer-card card-video__text">
						<?php the_content(); ?>
					</div>
				</div>
			</div>

			<div class="card__customer customer-card">
				<a href="/contact/" class="customer-card__link">
					<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt="<?php the_field('customer_support', 'option'); ?>" />
					<span class="text"><?php the_field('customer_support', 'option'); ?></span>
				</a>
			</div>
		</div>
	</section>
	<?php } ?>
	
	<?php if( have_rows('items_featured_and_benefits') ){ ?>
	<section class="page__card-prefs card-prefs">
		<div class="card-prefs__container">
			<h2 class="card-prefs__heading small-header-gray">
				<?php the_field('title_section_featured_and_benefits'); ?>
			</h2>
			<div class="card-prefs__wrapper">
				<?php while ( have_rows('items_featured_and_benefits') ) { the_row(); ?>
					<div class="card-prefs__item">
						<div class="card-prefs__icon">
							<img src="<?php the_sub_field('icon'); ?>" class="card-prefs__icon" alt="<?php the_sub_field('title'); ?>" />
						</div>
						<div class="card-prefs__text">
							<h3 class="header3"><?php the_sub_field('title'); ?></h3>
							<p>
								<?php the_sub_field('description'); ?>
							</p>
						</div>
					</div>
				<?php } ?>
			</div>
		</div>
	</section>
	<?php } ?>
	
	<?php if(get_field('video_file')) { ?> 
	<section class="page__card-video card-video">
		<div class="card-video__container">
			<div class="card-video__wrapper">
				<div class="card-video__video">
					<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
						<source src="<?php the_field('video_file'); ?>" type="video/mp4" />
					</video>
				</div>
				<div class="card-video__text">
					<?php the_field('text_video_section'); ?>
				</div>
			</div>
		</div>
	</section>
	<?php } ?>

	<?php if( have_rows('items_slider') ): ?>
	<div class="slider-section-card slider-section-card-product-line" <?php if(get_field('background_slider')) { ?>style="background: url(<?php the_field('background_slider'); ?>) 50% 50% / cover; "<?php } else { ?>style="background: #000;"<?php } ?>>
		<div class="technologies__container">
			<h1 class="header-white"><?php the_field('title_slider_section');?></h1>
		</div>
		<div class="hideMe">
			<div id="masterWrap">
				<div id="panelWrap">
					<?php while ( have_rows('items_slider') ) : the_row();?>
					<section id="sectionWrap">
						<div class="mainslider-slide">
							<div class="mainslider-slide__left">
								<img src="<?php the_sub_field('background');?>" class="mainslider-slide__image" alt="" />
							</div>
							<div class="mainslider-slide__right slide-content">
								<h3 class="header-white"><?php the_sub_field('subtitle');?></h3>
								<p><?php the_sub_field('description');?></p>
								<?php if(get_sub_field('link')) { ?>
								<a href="<?php the_sub_field('link');?>" class="btn-theme light">
									<?php the_field('learn_more', 'option'); ?>
								</a>
								<?php } ?>
							</div>
						</div>
					</section>
					<?php endwhile; ?> 
				</div>
			</div>
			<div class="dots _card2">
			</div>
		</div>
	</div>
	<?php endif; ?>

	<section class="page__card-podbor podbor">
		<div class="podbor__container" id="filter_catalog_min">
			<h1 class="small-header-gray"><?php the_field('title_section_search', 2); ?></h1>
			<?php get_template_part('template_part/filter_min') ?>
		</div>
	</section>
	
	<?php if(get_field('benefits_text')) { ?> 
	<section class="page__card-benefit benefit">
		<div class="benefit__container">
			<div class="benefit__text">
				<?=get_field('benefits_text');?>
			</div>
			<div class="benefit__image">
				<img src="<?=kama_thumb_src('src='.get_field('benefits_img').'&w=650');?>" alt="<?php the_field('buy', 'option'); ?>" />
				<button type="submit" class="benefit__button buy-button">
					<?php the_field('buy', 'option'); ?>
				</button>
			</div>
		</div>
	</section>
	<?php } ?>

	<?php if( have_rows('table_rows', 'product-lines' . '_' . $current_category->term_id) ): ?>
	<section class="page__card-prodlines card-prodlines">
		<div class="card-prodlines__container">
			<h1 class="small-header-gray"><?php if(get_field('title_section_comparison')) { echo get_field('title_section_comparison'); } else { ?>Product lines<?php } ?></h1>

			<div class="outer-wrapper">
				<div class="inner-wrapper">
					<div class="card-prodlines__table table-prodlines">
						<?php while ( have_rows('table_rows', 'product-lines' . '_' . $current_category->term_id) ) : the_row();?>
							<div class="table-prodlines__row">
							<?php if( have_rows('table_column') ):
							while ( have_rows('table_column') ) : the_row();
							$type = get_sub_field('type');
							?>

							<?php if($type == 'none') { ?> 
								<div class="table-prodlines__item"></div>
							<?php } ?>

							<?php if($type == 'titlecolumn') { ?> 
								<div class="table-prodlines__item">
									<div class="table-prodlines__inner">
										<img src="<?=kama_thumb_src('src='.get_sub_field('image').'&w=190');?>" class="table-prodlines__image" alt="<?php the_sub_field('title');?>" />
										<span class="table-prodlines__heading"><?php the_sub_field('title');?></span>
									</div>
								</div>
							<?php } ?>

							<?php if($type == 'text') { ?> 
								<div class="table-prodlines__item table-prodlines__item_text">
									<div class="table-prodlines__text">
									<?php the_sub_field('text');?>
									</div>
								</div>
							<?php } ?>

							<?php if($type == 'check') { ?> 
								<?php if ( get_sub_field('check') ) { ?>
									<div class="table-prodlines__item">
										<span class="check-icon"></span>
									</div>
								<?php } else { ?>
									<div class="table-prodlines__item">
										<span class="table-prodlines__dash">—</span>
									</div>
								<?php } ?>
							<?php } ?>

							<?php endwhile; endif; ?>
							</div>
						<?php endwhile; ?> 
					</div>
				</div>
			</div>
			<div class="pseduo-track"></div>

		</div>
	</section>
	<?php endif; ?>



</main>

<?php get_footer(); ?>