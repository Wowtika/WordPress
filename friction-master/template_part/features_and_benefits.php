<section class="page__card-prefs card-prefs">
	<div class="card-prefs__container">
		<h1 class="card-prefs__heading small-header-gray">
			Features and benefits
		</h1>
		<div class="card-prefs__wrapper">
			<?php if( have_rows('items_featured_and_benefits') ){ ?>
				<?php while ( have_rows('items_featured_and_benefits') ) { the_row(); ?>
					<div class="card-prefs__item">
						<div class="card-prefs__icon">
							<img src="<?php the_sub_field('icon'); ?>" class="card-prefs__icon" alt="" />
						</div>
						<div class="card-prefs__text">
							<h3 class="header3"><?php the_sub_field('title'); ?></h3>
							<p>
								<?php the_sub_field('description'); ?>
							</p>
						</div>
					</div>
				<?php } ?>
			<?php } ?>
		</div>
	</div>
</section>