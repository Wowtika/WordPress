<?php if( have_rows('items_how_it_works') ){ ?>
<div class="works-circles__container">
	<h2 class="header-gray"><?php the_field('title_how_it_works'); ?></h2>
	<div class="works-circles__wrapper">
		<?php while ( have_rows('items_how_it_works') ) { the_row(); ?>
			<div class="works-circles__item">
				<div class="works-circles__text">
					<?php the_sub_field('title'); ?>
				</div>
				<div class="works-circles__icon">
					<img src="<?php the_sub_field('image'); ?>" class="works-circles__img" alt="" />
				</div>
				<div class="works-circles__desc">
					<p>
						<?php the_sub_field('description'); ?>
					</p>
				</div>
			</div>
		<?php } ?>
	</div>
</div>
<?php } ?>