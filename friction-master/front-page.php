<?php 
/* Template Name: Home */

get_header();
?>
<main class="page page_home">
	

	<div data-fullscreen class="cta-section" style="background-image:url('<?=get_field('top_image')?>')">
		<div class="cta-body">
			<div class="cta-body__container">
				<?php //if(is_user_logged_in()) { ?> 
				<div class="cta-body__wrap">
					<div class="header-hero-form">
					<h1 class="cta-body__heading header-white">
						<?php if ( function_exists('h1_title') ) h1_title(); ?>
					</h1>
					<div class="nav-search">
						<a href="#search_name" class="active">
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</a>
						<a href="#search_parameter">
							<svg width="25" height="25" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.92px;}</style></defs><line class="cls-1" x1="3.38" y1="23.5" x2="3.38" y2="7.21"></line><line class="cls-1" x1="3.38" y1="4.33" x2="3.38" y2="0.5"></line><line class="cls-1" x1="12" y1="23.5" x2="12" y2="19.67"></line><line class="cls-1" x1="12" y1="16.79" x2="12" y2="0.5"></line><line class="cls-1" x1="20.63" y1="23.5" x2="20.63" y2="13.92"></line><line class="cls-1" x1="20.63" y1="11.04" x2="20.63" y2="0.5"></line><line class="cls-1" x1="0.5" y1="4.33" x2="6.25" y2="4.33"></line><line class="cls-1" x1="9.13" y1="16.79" x2="14.88" y2="16.79"></line><line class="cls-1" x1="17.75" y1="11.04" x2="23.5" y2="11.04"></line></g></svg>
						</a>
						<a href="#search_code">
							<svg width="40" height="40" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0165 17.6336H3.83636V16.4336H21.0165V17.6336Z" fill="#ffffff"></path> <path d="M7.09808 13.3967V7.50803H5.74066L3.83636 8.78244V10.091L5.65277 8.88498H5.74066V13.3967H3.84125V14.5539H8.89984V13.3967H7.09808Z" fill="#ffffff"></path> <path d="M9.81781 9.63205V9.66135H11.1069V9.62717C11.1069 8.95334 11.5756 8.49435 12.2739 8.49435C12.9575 8.49435 13.4018 8.89474 13.4018 9.5051C13.4018 9.97873 13.1528 10.3498 12.1909 11.3117L9.89594 13.5822V14.5539H14.8618V13.3869H11.7807V13.299L13.1577 11.9856C14.3491 10.843 14.7543 10.1838 14.7543 9.41232C14.7543 8.19162 13.7729 7.36642 12.3178 7.36642C10.8383 7.36642 9.81781 8.28439 9.81781 9.63205Z" fill="#ffffff"></path> <path d="M17.6694 11.4631H18.5092C19.3198 11.4631 19.8422 11.8684 19.8422 12.4983C19.8422 13.1184 19.3295 13.5139 18.5239 13.5139C17.767 13.5139 17.2592 13.133 17.2104 12.5324H15.9262C15.9897 13.8508 17.0248 14.6955 18.5629 14.6955C20.1401 14.6955 21.2192 13.841 21.2192 12.591C21.2192 11.6584 20.6528 11.0334 19.7006 10.9211V10.8332C20.4721 10.677 20.9457 10.0666 20.9457 9.23654C20.9457 8.12326 19.9741 7.36642 18.5434 7.36642C17.0541 7.36642 16.1118 8.17697 16.0629 9.50021H17.2983C17.3422 8.8801 17.8061 8.48459 18.4995 8.48459C19.2075 8.48459 19.6567 8.85568 19.6567 9.44162C19.6567 10.0324 19.1977 10.4182 18.4946 10.4182H17.6694V11.4631Z" fill="#ffffff"></path> </g></svg>
						</a>
					</div>
					</div>
					<div class="tabs">
						<div class="tab active" id="search_name">
							<?php get_template_part('template_part/search') ?>
						</div>
						<div class="tab" id="search_parameter">
							<form class="search_parameter" action="#" data-filter="top">
								<input type="hidden" name="region" value="1" autocomplete="off" data-filter="region">
								
								<select name="year" data-filter="year" data-class-modif="input1">
									<option value="" selected>Year</option>
								</select>

								<select name="make" data-filter="make" data-class-modif="input2">
									<option value="" selected>Make</option>
								</select>

								<select name="model" data-filter="model" data-class-modif="input3">
									<option value="" selected>Model</option>
								</select>

							</form>
						</div>
						<div class="tab" id="search_code">
							<form class="search-form-code" action="/catalog/">
								<div class="search-form__column">
									<input type="text" name="searchdata" data-error="Error" placeholder="Part Number. For example, MKD1293" class="input search-form__input" required/>
									<button type="submit" class="search-form__button button search-button">
										<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
									</button>
								</div>
							</form>
						</div>
					</div>
					
				</div>
				<?php //} ?>

			</div>
			<div class="fullscreen-video d-none_ d-md-block">
				<?php if( $top_video = get_field('top_video') ) { ?>
					<video preload="auto" muted playsinline autoplay="autoplay" loop="loop" poster="<?=get_field('top_image')?>" class="fullscreen-bg__video">
						<?php if(get_field('video_mp4')) { ?> 
							<source src="<?php the_field('video_mp4'); ?>" type="video/mp4" />
						<?php } ?>
						<source src="<?=$top_video['url']?>" type="video/webm"></source>
						
					</video>
				<?php } ?>
			</div>
		</div>
		<div class="cta-lines">
			<!-- <div class="cta-icon">
				<div class="_icon-arrow-new cta-icon__icon arrow-first"></div>
				<div class="_icon-arrow-new cta-icon__icon arrow-second"></div>
			</div> -->
			<div class="cta-red-lines">
				<img class="cta-red-lines__image" src="<?=get_template_directory_uri();?>/assets/img/home/cta-red-lines.svg" alt="" />
			</div>
			<div class="cta-white-lines">
				<img class="cta-white-lines__image" src="<?=get_template_directory_uri();?>/assets/img/home/cta-white-lines.svg" alt="" />
			</div>
		</div>
	</div>

	<div class="works-section">
		<?php get_template_part('template_part/how_it_works') ?>
		<div class="works-section__container" id="filter_catalog_min">
			<h2 class="small-header-gray"><?php the_field('title_section_search'); ?></h2>
			<?php get_template_part('template_part/filter_min') ?>
		</div>
		<?php get_template_part('template_part/partners') ?>
	</div>

	<?php //get_template_part('template_part/home_slider') ?>

	<?php if( have_rows('items_slider') ): ?>
		<div class="slider-section-card" <?php if(get_field('background_slider')) { ?>style="background: url(<?php the_field('background_slider'); ?>) 50% 50% / cover; "<?php } else { ?>style="background: #000;"<?php } ?>>
			<!-- <img src="<?php the_field('background_slider'); ?>" class="slider-bg" /> -->

			<div class="prefs-section__top top-prefs">
				<div class="top-prefs__image-right-cont">
					<img src="<?=get_template_directory_uri();?>/assets/img/home/prefs-top-build-right.svg" alt="top-prefs image-right" class="top-prefs__image-right" />
				</div>
			</div>

			<div class="prefs-lines">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/prefs-lines1.svg" alt="prefs-lines__image" class="prefs-lines__image" />
			</div>


			<!-- <div class="technologies__container"> -->
				<!-- <h2 class="header-white">Patented Technologies</h2> -->
			<!-- </div> -->
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
									<!-- <a href="<?php the_sub_field('link');?>" class="mainslider-text__button button slider-button">
										Learn More
									</a> -->
									<a href="<?php the_sub_field('link');?>" class="btn-theme2 light">
										Learn More
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

	<?php get_template_part('template_part/preferences') ?>

	<div class="links-section">
		<div class="links-section__container">
			<div class="links-content">
				<div class="links-content__item">
					<a href="<?php echo get_permalink(27); ?>" class="links-content__link">Customer service</a>
				</div>
				<div class="links-content__item">
					<a href="<?php echo get_permalink(29); ?>" class="links-content__link">Returns</a>
				</div>
				<div class="links-content__item">
					<a href="<?php echo get_permalink(31); ?>" class="links-content__link">Warranty</a>
				</div>
			</div>
		</div>
	</div>

	<div class="product-section" <?php if(get_field('background_image_product_links')) { ?>style="background: url(<?php the_field('background_image_product_links');?>) 50% 50% / cover;"<?php } else { ?>style="background: #000;"<?php } ?>>
		<!-- <img src="<?=get_template_directory_uri();?>/assets/img/home/product-fon.jpg" class="product-bg" /> -->

		<div class="product-section__container">
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

	<div class="prodlines-section">
		<div class="top-prodlines">
			<div class="top-prodlines__image-left-cont">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/prodlines-top-build.svg" alt="" class="top-prodlines__image-left" />
			</div>

			<div class="top-prodlines__image-right-cont">
			</div>
		</div>

		<div class="prodlines-lines">
			<img src="<?=get_template_directory_uri();?>/assets/img/home/prodlines-lines.svg" alt="" class="prodlines-lines__image" />
		</div>

		<h2 class="prodlines-content__heading header-gray __container">
			<?php the_field('title_product_lines'); ?>
		</h2>

		<div class="lg-container prodlines-content">
			<div class="prodlines-content__wrap">

				<?php
				$query = new WP_Query( array(
					'post_type' => 'product-lines',
					'order' => 'ASC',
					'orderby' => 'ID',
					'posts_per_page'   => -1,
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

	<div class="links-section">
		<div class="links-section__container">
			<div class="links-content">
				<div class="links-content__item">
					<a href="<?php echo get_permalink(19); ?>" class="links-content__link">Catalog</a>
				</div>
				<div class="links-content__item">
					<a href="<?php echo get_permalink(25); ?>" class="links-content__link">Where can I buy?</a>
				</div>
				<div class="links-content__item">
					<a href="<?php echo get_permalink(23); ?>" class="links-content__link">Legacy Product Lines</a>
				</div>
			</div>
		</div>
	</div>

	<div class="video-section section-kits">
		<h2 class="header-white"><?php the_field('title_section_kit'); ?></h2>
		<div class="video-section__wrapper">
			<div class="video-section__container">
				<div class="video-content">
					<div class="video-content__video">
					<?php if(get_field('video_section_kit')) { ?> 
						<video id="video" muted autoplay loop playsinline>
							<?php if(get_field('video_section_kit_mp4')) { ?> 
								<source src="<?php the_field('video_section_kit_mp4'); ?>" type="video/mp4" />
							<?php } ?>
							<source src="<?php the_field('video_section_kit'); ?>" type="video/webm"></source>
						</video>
					<?php } ?>
					</div>
					<div class="video-content__text">
						<?php the_field('content_section_kit'); ?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="control-section">
		<div class="top-control">
			<div class="top-control__image-right-cont">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/control-top-build.svg" alt="" class="top-control__image-right" />
			</div>
		</div>

		<div class="control-lines">
			<svg class="control-lines__image" width="898" height="540" viewBox="0 0 898 540" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<mask id="theMask">
						<path id="circleMask" fill="#FFF" d="M482.5 270C482.5 279.364 474.621 287.987 461.548 294.298C448.509 300.593 430.462 304.5 410.5 304.5C390.538 304.5 372.491 300.593 359.452 294.298C346.379 287.987 338.5 279.364 338.5 270C338.5 260.636 346.379 252.013 359.452 245.702C372.491 239.407 390.538 235.5 410.5 235.5C430.462 235.5 448.509 239.407 461.548 245.702C474.621 252.013 482.5 260.636 482.5 270Z" />
					</mask>
					<linearGradient id="paint0_linear_41_1561" x1="878.859" y1="375.966" x2="511.162" y2="325.383" gradientUnits="userSpaceOnUse">
						<stop stop-color="#E2000B" />
						<stop offset="1" stop-color="#580000" />
					</linearGradient>
					<linearGradient id="paint1_linear_41_1561" x1="878.859" y1="375.966" x2="511.162" y2="325.383" gradientUnits="userSpaceOnUse">
						<stop stop-color="#E2000B" />
						<stop offset="1" stop-color="#580000" />
					</linearGradient>
				</defs>
				<g id="toBeRevealed" mask="url(#theMask)">
					<path class="control-lines-path1" d="M743.939 423.135C745.315 423.588 1019.27 300.95 496.958 279.907L497.987 277.27C497.987 277.27 1004.64 284.008 757.659 430.913L743.939 423.135Z" fill="url(#paint0_linear_41_1561)" />
					<path class="control-lines-path2" d="M814.665 404.528C816.041 404.98 997.77 272.582 490.204 272.755C489.933 272.749 489.672 272.654 489.461 272.484C489.25 272.315 489.1 272.081 489.036 271.818C488.971 271.555 488.995 271.278 489.103 271.03C489.212 270.781 489.399 270.576 489.636 270.445C489.636 270.445 985.724 254.581 828.386 412.306L814.665 404.528Z" fill="url(#paint1_linear_41_1561)" />
				</g>
			</svg>
		</div>

		<div class="control-section__container">
			<div class="control">
				<div class="control__column">
				<?php if( have_rows('items_achievements') ):
					while ( have_rows('items_achievements') ) : the_row();?>
					<div class="control__item">
						<?php if(get_sub_field('link')) { ?> 
							<a href="<?php the_sub_field('link'); ?>">
								<img width="64" height="64" src="<?php the_sub_field('icon');?>" alt="<?php the_sub_field('name');?>">
							</a>
							<div class="control__icon-text">
								<h3 class="header3"><a href="<?php the_sub_field('link'); ?>"><?php the_sub_field('name');?></a></h3>
							</div>
						<?php } else { ?> 
							<img width="64" height="64" src="<?php the_sub_field('icon');?>" alt="<?php the_sub_field('name');?>">
							<div class="control__icon-text">
								<h3 class="header3"><?php the_sub_field('name');?></h3>
							</div>
						<?php } ?>
					</div>
					<?php endwhile; endif; ?>
				</div>
			</div>
		</div>
	</div>

	<div class="asos-section">
		<div class="lg-container">
			<div class="asos-slider-container">
				<div class="swiper asos-slider" pagination="true">
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
			</div>
			<div class="swiper-pagination-asos"></div>
		</div>
	</div>

	<div class="home-manufacturing video-section" <?php if( get_field('content_video') != true ) { ?>style="background: #000;"<?php } ?>>

		<?php if( $content_video = get_field('content_video') ) { ?>
			<video id="video" muted autoplay loop playsinline>
				<?php if(get_field('content_video_mp4')) { ?> 
					<source src="<?php the_field('content_video_mp4'); ?>" type="video/mp4" />
				<?php } ?>
				<source src="<?=$content_video['url']?>" type="video/webm"></source>
			</video>
		<?php } ?>

		<h2 class="header-white"><?php the_field('title_modern_factory'); ?></h2>
		<div class="video-section__wrapper">
			<div class="video-section__container">
				<div class="video-content">
					<div class="video-content__text">
						<?php the_field('modern_factory');?>
						<?php the_field('quality_control');?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="blog-section home-blog-section" style="background: #d9d9d9;">
		<div class="top-join">
			<div class="top-join__image-left-cont">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/join-top-build.svg" alt="" class="top-join__image-left" />
			</div>
		</div>
		<div class="join-lines">
			<img src="<?=get_template_directory_uri();?>/assets/img/home/join-lines.svg" alt="" class="join-lines__image" />
		</div>
		<div class="blog-section__container">
			<h2 class="blog-section__heading header-gray">Blog</h2>
			<div class="blog">
				<?php 
					$query = new WP_Query([ 
						'post_type'      => 'post',
						'posts_per_page' => 4,
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
					wp_reset_postdata();
				?>
			</div>
		</div>
	</div>

	<!-- <div class="join-section">
		<div class="top-join">
			<div class="top-join__image-left-cont">
				<img src="<?=get_template_directory_uri();?>/assets/img/home/join-top-build.svg" alt="" class="top-join__image-left" />
			</div>
		</div>

		<div class="join-lines">
			<img src="<?=get_template_directory_uri();?>/assets/img/home/join-lines.svg" alt="" class="join-lines__image" />
		</div>

		<div class="join-section__container">
			<div class="join">
				<div class="join__column-left">
					<div class="join__gallery">

						<?php $images = get_field('gallery'); ?>
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
					<?php the_field('join_us');?>
				</div>
			</div>
		</div>
	</div> -->

</main>

<?php get_footer(); ?>