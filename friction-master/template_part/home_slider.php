<?php if( have_rows('items_slider') ): ?>
	<div class="slider-section-card" <?php if(get_field('background_slider')) { ?>style="background: url(<?php the_field('background_slider'); ?>) 50% 50% / cover; "<?php } else { ?>style="background: #000;"<?php } ?>>
		<!-- <img src="<?php the_field('background_slider'); ?>" class="slider-bg" /> -->

		<div class="technologies__container">
			<h2 class="header-white">Patented Technologies</h2>
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
								<!-- <a href="<?php the_sub_field('link');?>" class="mainslider-text__button button slider-button">
									Learn More
								</a> -->
								<a href="<?php the_sub_field('link');?>" class="btn-theme light">
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