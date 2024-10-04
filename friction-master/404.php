<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package robots
 */

get_header(); ?>
<div class="bg-menu"></div>
<!-- <div class="card-header">
	<img src="<?=get_template_directory_uri();?>/assets/img/home/product-fon.jpg" class="product-bg">

	<div class="card-header__bg">
		<div class="card-header__wrapper">
			<img class="card-header__image" src="<?=get_template_directory_uri();?>/assets/img/card/card-bg.svg" alt="">
		</div>
	</div>

</div> -->

<main class="page page_section page404">
	<div class="page__container text-center">
		<p>404</p>
		<h1 class="header-gray">Page Not Found</h1>
		<a class="error_404 btn-theme" href="/">Home</a>
	</div>
</main>

<?php get_footer(); ?>