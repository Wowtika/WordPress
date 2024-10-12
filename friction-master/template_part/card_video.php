<section class="page__card-video card-video">
	<div class="card-video__container">
		<div class="card-video__wrapper">
			<div class="card-video__video">
				<iframe id="video" width="100%" height="100%" src="<?php the_field('video_file'); ?>" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			</div>
			<div class="card-video__text">
				<?php the_field('video_url'); ?>
				<?php the_field('text_video_section'); ?>
			</div>
		</div>
	</div>
</section>