<section class="page__card-video card-video">
	<div class="card-video__container">
		<div class="card-video__wrapper">
			<div class="card-video__video">
				<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
					<source src="<?php the_field('video_url', 'options'); ?>" type="video/mp4" />
					<!-- <source src="https://promopano.ru/video/asp-1.webm" type="video/webm"> -->
				</video>
			</div>
			<div class="card-video__text">
				<?php the_field('video_block_text', 'options'); ?>
			</div>
		</div>
	</div>
</section>