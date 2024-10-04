<?php 
/* Template Name: About */

get_header() ?>

<main class="page page_aboute">
	
	<div data-fullscreen class="timeline-section" style="background-image: url(<?php the_field('background_about'); ?>);">
		<div class="timeline">
			<div class="timeline__cont">

				<?php 
				$foreachIndContent = 1;
				if( have_rows('items_timeline') ):
				while ( have_rows('items_timeline') ) : the_row();?>
					
				<?php if(get_sub_field('type') == 'text') { ?> 
				<div id="#section_<?php echo $foreachIndContent; ?>" class="timeline__item item-timeline">
					<div class="item-timeline__heading"><?php the_sub_field('text_left');?></div>
					<div class="item-timeline__text">
						<?php the_sub_field('description');?>
					</div>
				</div>
				<?php } else { ?> 
					<div id="#section_2" class="timeline__item item-timeline">
						<div class="item-timeline__heading">
							<img src="<?php the_sub_field('image');?>" alt="">
						</div>
						<div class="item-timeline__text">
						<?php the_sub_field('description');?>
						</div>
					</div>
				<?php } ?>
				<?php endwhile; endif; ?>
			</div>

			<div class="timeline__nav">
				<div class="marker"></div>
				<div class="timeline__track">
					<ul class="timeline__list">
						<?php
							$foreachIndNav = 1;
							if( have_rows('items_timeline') ):
							while ( have_rows('items_timeline') ) : the_row();?>
						<li>
							<a href="#section_<?php echo $foreachIndNav; ?>" id="<?php echo $foreachIndNav; ?>" class="timeline__nav-link"><span><?php the_sub_field('year');?></span></a>
						</li>
						<?php $foreachIndNav++; endwhile; endif; ?>
					</ul>
				</div>
			</div>
		</div>

		<div class="today">
			<div class="today__container">
				<div class="today__heading header-white">
					<?php the_field('text_timeline'); ?>
				</div>
			</div>
		</div>

		<!-- <div class="cta-icon-aboute ">
			<div class="_icon-arrow-new cta-icon-aboute__icon arrow-first"></div>
			<div class="_icon-arrow-new cta-icon-aboute__icon arrow-second"></div>
		</div> -->

	</div>

	<div class="page__aboute-prodlines" style="background: #d9d9d9;">
		<div class="aboute-prodlines aboute-heading __container">
			<div class="aboute-heading__heading">
				<?php the_field('title_product_lines'); ?>
			</div>
			<div class="aboute-heading__text">
				<?php the_field('description_product_lines'); ?>
			</div>
		</div>

		<div class="lg-cont prodlines-content">
			<div class="prodlines-content__wrap">

				<?php
					$query = new WP_Query( array(
						'post_type' => 'product-lines',
						'order' => 'ASC',
						'orderby' => 'ID',
						'tax_query' => array(
							array(
								'taxonomy' => 'product-lines',
								'field' => 'id',
								'terms' => get_field('product_line_group'),
							),
						),
					));
				?>
				<?php if ( $query->have_posts() ) { ?>
					<?php while ( $query->have_posts() ) { ?>
						<?php $query->the_post(); ?>
						<div class="prodlines-content__item">
							<div class="prodlines-content__image-wrapper">
								<a href="<?=get_permalink();?>" class="prodlines-content__image">
									<?php $prodlines_img = get_field('img'); ?>
									<img src="<?=kama_thumb_src('src='.$prodlines_img.'&w=430');?>" alt="<?php the_title() ?>" />
								</a>
								<!-- <a href="<?=get_permalink();?>" class="prodlines-content__label">Learn More</a> -->
								<h3><a href="<?=get_permalink();?>"><?php the_field('title_miniature'); ?></a></h3>
								<a href="<?=get_permalink();?>" class="btn-theme2">Learn More</a>
							</div>
						</div>
					<?php } ?>
					<?php wp_reset_postdata(); ?>
				<?php } ?>

			</div>
		</div>

	</div>

	<div class="page__aboute-products aboute-products" style="background: #000;">
		
	<div class="aboute-asos__container">
		<div class="aboute-products__heading aboute-heading">
			<div class="aboute-heading__heading _white">
				<?php the_field('title_units'); ?>
			</div>
			<div class="aboute-heading__text">
				<?php the_field('description_product_lines'); ?>
			</div>
		</div>
	</div>
		
		<div class="product-section__container _aboute-products">
			

			<div class="product-content">
				<?php if( have_rows('items_links', 'option') ):
					while ( have_rows('items_links', 'option') ) : the_row();?>
				<div class="product-content__item">
					<span class="product-content__icon <?php the_sub_field('icon_class');?>">
					</span>
					<div class="product-content__text">
						<h3 class="header3"><?php the_sub_field('title_group');?></h3>
						<ul>
						<?php if( have_rows('item_links') ):
							while ( have_rows('item_links') ) : the_row();
							$itemMenus = get_sub_field('link');
							?>
							<li>
								<a href="<?php echo $itemMenus['url']; ?>" class="product-content__link"><?php echo $itemMenus['title']; ?></a>
							</li>
						<?php endwhile; endif; ?>
						</ul>
					</div>
				</div>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</div>

	<div class="page__aboute-asos" style="background: #d9d9d9;">
		<div class="aboute-asos__container">
			<div class="aboute-asos__heading aboute-heading">
				<div class="aboute-heading__heading">
					<?php the_field('title_association'); ?>
				</div>
				<div class="aboute-heading__text">
					<?php the_field('description_association'); ?>
				</div>
			</div>

			<div class="asos-slider-container">
				<!-- <span class="slider-left-arrow asos-left _icon-arrow-new"></span> -->
				<div class="swiper asos-slider">
					<div class="swiper-wrapper partners-slider__wrapper">

						<?php if( have_rows('items_associations', 274) ):
							while ( have_rows('items_associations', 274) ) : the_row();
							$assocLink = get_sub_field('link');
						?>
						<div class="swiper-slide partners-slider__card">
							<a href="<?php echo $assocLink['url'];?>" target="_blank" rel="nofollow" class="partners-slider__link">
								<img src="<?php the_sub_field('image');?>" alt="<?php the_sub_field('title');?>" class="partners-slider__image" />
							</a>
						</div>
						<?php endwhile; endif; ?>

					</div>
				</div>

				<!-- <span class="slider-right-arrow asos-right _icon-arrow-new"></span> -->
			</div>
			<div class="swiper-pagination-asos"></div>
		</div>
	</div>

	<div class="page__asos-gallery asos-gallery">
		<div class="asos-gallery__container">
			<div class="asos-gallery__heading aboute-heading">
				<div class="aboute-heading__heading">
					<?php the_field('title_quality'); ?>
				</div>
				<div class="aboute-heading__text">
					<?php the_field('description_quality'); ?>
				</div>
			</div>

			<div class="gallery">
				<?php if( have_rows('images_quality') ):
				while ( have_rows('images_quality') ) : the_row();?>
				<!-- <a href="<?php the_sub_field('image');?>" class="gallery__image"> -->
				<a href="#" class="gallery__image">
					<img alt="<?php the_sub_field('alt');?>" title="<?php the_sub_field('title');?>" src="<?php the_sub_field('image');?>" class="gallery__preview">
					<span><?php the_sub_field('name');?></span>
				</a>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</div>

	<div class="page__aboute-video" style="background: #d9d9d9;">
		<div class="aboute-video">
			<div class="aboute-video__container">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h2 class="small-header-gray title-desktop-left"><?php the_field('title_motorsport'); ?></h2>
						<?php the_field('description_motorsport'); ?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_field('video_motorsport'); ?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="page__aboute-long aboute-long" style="background: #000;">
		<div class="aboute-long__container">
			<h2 class="small-header-white"><?php the_field('title_production'); ?></h2>

			
			<?php if( have_rows('items_production') ):
				while ( have_rows('items_production') ) : the_row();
				$prodType = get_sub_field('type');
			?>
			
			<?php if($prodType == 'catalog') { ?> 
			<div class="aboute-video">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
					<div class="aboute-video__blog">
						<a href="/catalog/" class="blog-aboute__link _aboute">
							<p class="blog-aboute__title">
								Try our catalogue
							</p>
						</a>
					</div>
				</div>
			</div>
			<?php } else if($prodType == 'image') { ?> 
			<div class="aboute-image">
				<div class="aboute-image__wrapper">
					<div class="aboute-image__image">
						<img src="<?php the_sub_field('image');?>" alt="<?php the_sub_field('title');?>">
					</div>
					<div class="aboute-image__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
				</div>
			</div>
			<?php } else { ?> 
			<div class="aboute-video">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_sub_field('video');?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
			<?php } ?>

			<?php endwhile; endif; ?>

		</div>
	</div>

	<div class="page__aboute-video" style="background: #fff;">
		<div class="aboute-video">
			<div class="aboute-video__container">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h2 class="small-header-gray title-desktop-left"><?php the_field('title_environment'); ?></h2>
						<?php the_field('description_environment'); ?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_field('video_environment'); ?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="join-section">
		<!-- <div class="top-join">
			<div class="top-join__image-left-cont">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/join-top-build.svg" alt="" class="top-join__image-left" />
			</div>
		</div>

		<div class="join-lines">
			<img src="<?=get_template_directory_uri();?>/assets/img/home/join-lines.svg" alt="" class="join-lines__image" />
		</div> -->

		<div class="join-section__container">
			<div class="join">
				<div class="join__column-left">
					<div class="join__gallery">

					<?php $images = get_field('gallery',2); ?>
						<?php if( $images ){ ?>
							<?php foreach( $images as $image ){ ?>
								<div class="join__image">
									<img src="<?=kama_thumb_src('src='.$image['url'].'&w=130&h=130');?>" alt="" />
								</div>
							<?php } ?>
						<?php } ?>

					</div>
				</div>

				<div class="join__column-right">
					<?php the_field('join_us',2);?>
				</div>
			</div>
		</div>
	</div>

</main>

<?php get_footer(); ?>