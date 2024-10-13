<section class="page__card-video card-video">
	<div class="card-video__container">
		<div class="card-video__wrapper">
			<div class="card-video__video">
				<video id="video" muted autoplay loop>
					<?php if(get_field('video_file')) { ?> 
						<source src="<?php the_field('video_file'); ?>" type="video/mp4" />
					<?php } ?>
					<source src="<?php the_field('video_url'); ?>"></source>
				</video>
			</div>
			<div class="card-video__text">
				<?php the_field('video_url'); ?>
				<?php the_field('text_video_section'); ?>
			</div>
		</div>
	</div>
</section>