<?php 
/* Template name: Associations */
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

<main class="page page_assos">


    <div class="assos">

        <div class="assos__container">

            <h2 class="card__heading">

                <?php the_title(); ?>

            </h2>

            <?php if( have_rows('items_associations') ):
                while ( have_rows('items_associations') ) : the_row();
                $assocLink = get_sub_field('link');
                //var_dump($assocLink);
            ?>
                
            <div class="assos-card">
                <div class="assos-card__logo"><img src="<?php the_sub_field('image');?>" alt="<?php the_sub_field('title');?>" class="assos-card__image"></div>
                <div class="assos-card__content">
                    <h3 class="assos-card__heading"><?php the_sub_field('title');?></h3>
                    <div class="assos-card__text"><?php the_sub_field('description');?></div>
                    <a href="<?php echo $assocLink['url'];?>" class="assos-card__link" target="_blank" rel="nofollow"><?php echo $assocLink['title'];?></a>
                </div>
            </div>
            <?php endwhile; endif; ?>

        </div>

    </div>

</main>

<?php get_footer(); ?>