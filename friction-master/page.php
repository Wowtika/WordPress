<?php get_header(); ?>
<div class="bg-menu"></div>
<!-- <div class="card-header">
	<img src="<?=get_template_directory_uri();?>/assets/img/home/product-fon.jpg" class="product-bg">

	<div class="card-header__bg">
		<div class="card-header__wrapper">
			<img class="card-header__image" src="<?=get_template_directory_uri();?>/assets/img/card/card-bg.svg" alt="">
		</div>
	</div>

</div> -->

<main class="page page_section">
	<div class="page__container single-blog-article">
		<h1 class="header-gray"><?php if ( function_exists('h1_title') ) h1_title(); ?></h1>
		<?php the_content(); ?>
	</div>
</main>

<?php get_footer(); ?>