<div class="benefit__container">
    <div class="benefit__text">
        <?php the_field('benefits_text') ?>
    </div>
    <div class="benefit__image">
        <img src="<?php the_field('benefits_img')?>" alt="">
        <button type="submit" class="benefit__button buy-button"><?php the_field('buy','option');?></button>
    </div>
</div>