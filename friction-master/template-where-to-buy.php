<?php 
/* Template name: Where to Buy*/
get_header(); ?>
<div class="bg-menu"></div>
<!-- <div class="blog-header">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/home/product-fon.jpg" class="product-bg">

    <div class="cta-lines">

        <div class="cta-red-lines">
            <img class="cta-red-lines__image" src="<?php echo get_template_directory_uri(); ?>/assets/img/home/cta-red-lines.svg" alt="" />
        </div>

        <div class="cta-white-lines">
            <img class="cta-white-lines__image" src="<?php echo get_template_directory_uri(); ?>/assets/img/home/cta-white-lines.svg" alt="" />
        </div>
    </div>

</div> -->

<main class="page page_buy">

    <div class="page__blog-category">

        <div class="blog-category__container">

            <div class="blog-category">
                <a href="#" class="blog-category__link active">
                    <span>Online Retailers</span>
                </a>
                <!-- <a href="#" class="blog-category__link ">
                    <span>Wholesale Distributors</span>
                </a>
                <a href="#" class="blog-category__link">
                    <span>Retail Stores</span>
                </a>
                <a href="#" class="blog-category__link">
                    <span>Certified Mechanics</span>
                </a> -->
            </div>

        </div>

    </div>

    <div class="buy-logos">

        <div class="buy-logos__container">

            <div class="buy-logos__wrap">
                
                <?php if( have_rows('online_retailers') ):
                while ( have_rows('online_retailers') ) : the_row();?>
                <div class="buy-logos__item">
                    <a href="<?php the_sub_field('link');?>" class="buy-logos__link" target="_blank" rel="nofollow">
                        <img class="buy-logos__image" src="<?php the_sub_field('logo');?>" alt="<?php the_sub_field('title');?> Logo" title="<?php the_sub_field('title');?>">
                    </a>
                </div>
                <?php endwhile; endif; ?>

            </div>

        </div>

</main>

<?php get_footer(); ?>