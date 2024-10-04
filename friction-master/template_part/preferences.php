<?php if( have_rows('items_preferences') ){ ?>
<div class="prefs-section">
	
	<!-- <div class="prefs-section__top top-prefs">
		<div class="top-prefs__image-right-cont">
			<img src="<?=get_template_directory_uri();?>/assets/img/home/prefs-top-build-right.svg" alt="top-prefs image-right" class="top-prefs__image-right" />
		</div>
	</div>

	<div class="prefs-lines">
		<img src="<?=get_template_directory_uri();?>/assets/img/home/prefs-lines1.svg" alt="prefs-lines__image" class="prefs-lines__image" />
	</div> -->

	<div class="prefs-section__container prefs-content">
		<h1 class="prefs-content__heading header-gray">
			<?php the_field('title_preferences'); ?>
		</h1>
		<div class="prefs-content__wrapper">
			<?php while ( have_rows('items_preferences') ) { the_row(); ?>
				<div class="prefs-content__item">
					<div class="prefs-content__icon">
						<img src="<?php the_sub_field('image'); ?>" class="prefs-icon" alt="<?php the_sub_field('title'); ?> Icon" title="<?php the_sub_field('title'); ?>" />
					</div>
					<div class="prefs-content__arrow">
						<img src="<?=get_template_directory_uri();?>/assets/img/home/prefs-line-red.svg" class="prefs-arrow arrow4" alt="Line Icon" title="Prefs Line" />
					</div>
					<div class="prefs-content__text">
						<h3 class="header3">
							<?php the_sub_field('title'); ?>
						</h3>
						<p>
							<?php the_sub_field('description'); ?>
						</p>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>
<?php } ?>