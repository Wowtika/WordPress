<?php if( have_rows('items_marketplaces', 'option') ): ?>
<div class="works-section__partners">
	<div class="lg-container">
		<div class="partners__wrapper">
			<!-- <span class="slider-left-arrow partners-left _icon-arrow-new">
			</span> -->
			<div class="swiper partners-slider" pagination="true">
				<div class="swiper-wrapper partners-slider__wrapper">
					
					<?php while ( have_rows('items_marketplaces', 'option') ) : the_row();?>
					<div class="swiper-slide partners-slider__card">
						<a href="<?php the_sub_field('link');?>" class="partners-slider__link" target="_blank" rel="nofollow">
							<img src="<?php the_sub_field('logo');?>" alt="<?php the_sub_field('name');?> Logo" title="<?php the_sub_field('name');?>" class="partners-slider__image" />
						</a>
					</div>
					<?php endwhile; ?>

				</div>
				
			</div>
			<!-- <span class="slider-right-arrow partners-right _icon-arrow-new">
			</span> -->
		</div>
		<div class="swiper-pagination-partners"></div>
	</div>
</div>
<?php endif; ?>