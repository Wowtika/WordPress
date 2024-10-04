<?php 
/* Template name: Legacy Products */
get_header(); ?>

<style>
    header{
        background: #000;
    }
</style>

<div class="prodlines-section">
    <h1 class="prodlines-content__heading header-gray __container">
        <?php the_title(); ?>
    </h1>

    <div class="lg-container prodlines-content">
        <div class="prodlines-content__wrap">

            <?php
            $query = new WP_Query( array(
                'post_type' => 'product-lines',
                'order' => 'ASC',
                'orderby' => 'ID',
                'posts_per_page'   => -1,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'product-lines',
                        'field' => 'id',
                        'terms' => get_field('legacy_product_lines'),
                    ),
                ),
            ));
            ?>
            <?php if ( $query->have_posts() ) { ?>
                <?php while ( $query->have_posts() ) { ?>
                    <?php $query->the_post(); ?>
                    <div class="prodlines-content__item">
                        <div class="prodlines-content__image-wrapper">
                            <a href="<?=get_permalink();?>" class="prodlines-content__image">
                                <?php $prodlines_img = get_field('img'); ?>
                                <img src="<?=kama_thumb_src('src='.$prodlines_img.'&w=430');?>" alt="<?php the_title() ?>" />
                            </a>
                            <h3><a href="<?=get_permalink();?>"><?php the_field('title_miniature'); ?></a></h3>
                            <a href="<?=get_permalink();?>" class="btn-theme2">Learn More</a>
                        </div>
                    </div>
                <?php } ?>
                <?php wp_reset_postdata(); ?>
            <?php } ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>