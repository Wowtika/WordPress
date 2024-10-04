<?php get_header(); 
$cat = get_the_category($post->ID);
?>

<section>
	<div class="container">
		<div class="row">
			<div class="col-12">	
				<div class="page_content">
					<?php if ( !is_front_page() && !is_home()) { ?>
						<div class="breadcrumbs">
							<?php if ( function_exists('tBreadcrumbs') ) tBreadcrumbs(); ?>
						</div>
					<?php } ?>
					<div class="main-title text-center">
						<h1><?php if ( function_exists('h1_title') ) h1_title(); ?></h1>
					</div>	
					<div class="row">
						<?php if ( have_posts() ) { ?>
							<?php while ( have_posts() ) { the_post(); ?>
								<div class="col-12 col-sm-6 col-md-4">
									<a href="<?php the_permalink(); ?>">
										<img src="<?php echo kama_thumb_src('src='.wp_get_attachment_url(get_post_thumbnail_id()).'&w=350'); ?>" alt="">
										<span>Подробнее</span>
									</a>
								</div>
							<?php } ?>
						<?php } ?>
						<div class="col-12">
							<div class="pagenav_wrapper">
								<?php wp_pagenavi(); ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
	
<?php get_footer();?>