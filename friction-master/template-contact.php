<?php 
/* Template Name: Contact */

get_header();
$src = wp_get_attachment_image_src( get_post_thumbnail_id($id), 'full' );
$url = $src[0];
?>

<style>
    .timeline-section{
        align-items: center;
        flex-direction: row;
        justify-content: flex-start;
    }
    h1{
        font-weight: 600;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }
    .contact-header__container{
        position: relative;
        z-index: 9;
        width: 100%;
    }
    .contact-header__container p{
        color: #fff;
        line-height: 1.3;
        margin-top: 20px;
        max-width: 500px;
        margin: auto;
        text-align: center;
    }
    @media screen and (max-width: 767px){
        h1{
            font-size: 26px;
            margin-bottom: 20px;
        }
    }
</style>

<main class="page">
    
	<div data-fullscreen class="timeline-section" style="background-image: url(<?php echo $url; ?>);">

        <div class="contact-header__container">
            <h1><?php the_title(); ?></h1>
            <p><?php the_field('subtitle_contact'); ?></p>
        </div>

		<div class="cta-icon-aboute ">
			<div class="_icon-arrow-new cta-icon-aboute__icon arrow-first"></div>
			<div class="_icon-arrow-new cta-icon-aboute__icon arrow-second"></div>
		</div>

	</div>
    <style>
		.contact_section__container{
			display: flex;
			flex-wrap: wrap;
			max-width: 850px
		}
		.contact_section__container .col{
			width: 50%;
		}
        .contact_section{
            padding: 80px 0;
        }
        .contact_section h2.header-gray{
            margin-bottom: 40px;
			text-align: left;
        }
        .contact_section p{
            margin-bottom: 15px;
            line-height: 1.3;
            /* text-align: center; */
        }
        .contact_section p a{
            text-decoration: none;
        }
        .contact_section p a:hover{
            text-decoration: underline;
            opacity: 0.8;
        }
        .contact_section p.title{
            /* text-align: center; */
			text-align: left;
            font-size: 24px;
            font-weight: 600;
            margin: 40px 0 15px;
        }
        .customer-service-link{
			background: #25D366;
			line-height: 45px;
			padding: 0 40px;
			display: inline-flex;
			gap: 10px;
			align-items: center;
			border-radius: 4px;
        }
		.customer-service-link span{
			font-weight: 600;
			font-size: 16px;
			color: #fff;
			border-radius: 4px;
		}
        .contact_section p .customer-service-link:hover{
            text-decoration: none;
        }
        .contact_section ul.social{
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        .contact_section ul.social a{
            display: block;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            border: 2px solid #D51F11;
            transition: all 0.4s ease-out;
        }
        .contact_section ul.social a:hover{
            opacity: 0.8;
        }
		.contact_section .text a{
			text-decoration: underline;
		}

		@media screen and (max-width: 767px){
			.contact_section__container .col {
				width: 100%;
			}
		}
    </style>

	<style>
		.page-faq{
			background-color: #d7d7d7;
		}
		.faq-title {
			text-align: center;
			font-size: 1.375rem;
			font-weight: 500;
			margin-bottom: 0.9375rem;
		}

		.faq-list > div {
			border-bottom: 0.07em solid #ededed;
			padding: 1.5em 2em 1.5em 1em;
			background: #fff;
			margin-bottom: 10px;
		} 

		.faq-list > div:last-child {
			border: unset;
		}

		details > summary {
			list-style: none;
		}
		details > summary::-webkit-details-marker {
			display: none;
		}

		summary {
			font-size: 18px;
			font-weight: bold;
			cursor: pointer;
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none; 
			user-select: none;
			transition: all 0.3s ease;
			position: relative;
			padding-left: 30px;
			line-height: 24px;
		}

		summary:hover {
			color: #e31b1b;
		}

		details[open] summary ~ * {
			animation: sweep .5s ease-in-out;
		}

		@keyframes sweep {
			0%    {opacity: 0; margin-left: -10px}
			100%  {opacity: 1; margin-left: 30px}
		}

		details[open] summary {
			color: #e31b1b;
			margin-bottom: 15px;
			position: relative;
		}
		details p{
			padding-left: 25px;
			margin-left: 30px;
			border-left: 2px solid #e31b1b;
			width: calc(100% - 30px);
			display: block;
		}
		details[open] p {
			border-left: 2px solid #e31b1b;
			margin-left: 30px;
			padding-left: 25px;
			opacity: 100;
			transition: all 1s ease;
			width: calc(100% - 30px);
		}

		details[open] summary:after {
			content: "-";
			font-size: 3.2em;
			/* margin: -33px 0.35em 0 0; */
			font-weight: 400;
			line-height: 24px;
			top: -2px;
			
		}

		.faq-body {
			width: 100%;
			max-width: 800px;
			padding: 0 20px;
			margin: 1.875rem auto 60px;
		}

		.faq-list {
			width: 100%;
			margin: auto;
			padding: 0;
			margin-bottom: 20px;
		}

		summary::-webkit-details-marker {
			display: none;
		}

		summary:after {
			background: transparent;
			border-radius: 0.3em;
			content: "+";
			color: #e31b1b;
			/* float: left; */
			font-size: 1.8em;
			font-weight: bold;
			/* margin: -0.3em 0.65em 0 0; */
			padding: 0;
			text-align: center;
			width: 25px;
			position: absolute;
			left: 0;
			top: 0;
			line-height: 24px;
		}
		@media screen and (max-width: 767px) {
			summary{
				font-size: 18px;
				line-height: 24px;
			}
			details p,
			details[open] p{
				margin-left: 0px;
				width: 100%;
			}
			@keyframes sweep {
				0%    {opacity: 0; margin-left: -10px}
				100%  {opacity: 1; margin-left: 0px}
			}
		}
	</style>

	<div class="contact_section">
        <div class="contact_section__container">
			<div class="col">
				<h2 class="header-gray"><?php the_field('title_s1'); ?></h2>
			</div>
			<div class="col text">
				<?php the_field('content_s1'); ?>
			</div>
        </div>
    </div>

	<div class="contact_section page-faq">
        <div class="contact_section__container">
			<div class="col">
				<h2 class="header-gray"><?php the_field('title_s2'); ?></h2>
			</div>
			<div class="col">
				<div class="faq-list">

					<?php if( have_rows('items_faq') ):
						while ( have_rows('items_faq') ) : the_row();?>
						<div>
							<details>
							<summary title="<?php the_sub_field('question');?>"><?php the_sub_field('question');?></summary>
							<p class="faq-content"><?php the_sub_field('answer');?></p>
							</details>
						</div>
					<?php endwhile; endif; ?>
					
				</div>

				<a href="/faq/" class="btn-theme">More FAQ’s</a>
			</div>

			
        </div>
    </div>

    <div class="contact_section">
        <div class="contact_section__container">

			<div class="col">
				<h2 class="header-gray">CONTACT US</h2>
			</div>
			<div class="col">

				<p class="email"><a href="mailto:<?php the_field('email_customer_service'); ?>">Customer Service</a></p>
				<p class="email"><a href="mailto:<?php the_field('email_technical_support'); ?>">Technical Support</a></p>
				<p class="email"><a href="mailto:<?php the_field('email_sales_inquiries'); ?>">Sales Inquiries</a></p>

				<p><a href="<?php the_field('whatsapp_link'); ?>" target="_blank" rel="nofollow" class="customer-service-link">
					<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#fff"></path> </g></svg>
					<span>WhatsApp</span>
				</a></p>
				<?php if ( $phone = get_field('phone', 'options') ) { ?>
					<p class="phone"><a href="tel:<?= preg_replace('/[^0-9\+]/', '', $phone); ?>"><?=$phone;?></a></p>
				<?php } ?>
				<p class="address"><?php the_field('address'); ?></p>
				

				<!-- <p class="title">Follow us</p>

				<ul class="social">
					<li>
						<a href="#" target="_blank" rel="nofollow">
							<svg height="24" width="24" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#D51F11"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>facebook [#176]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#D51F11"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#176]"> </path> </g> </g> </g> </g></svg>
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="nofollow">
							<svg height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#D51F11"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#D51F11"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#D51F11"></path> </g></svg>
						</a>
					</li>
					<li>
						<a href="#" target="_blank" rel="nofollow">
							<svg fill="#D51F11" height="24" width="24" viewBox="0 -4 32 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M30.722,20.579 C30.137,21.894 28.628,23.085 27.211,23.348 C27.066,23.375 23.603,24.000 16.010,24.000 L15.990,24.000 C8.398,24.000 4.932,23.375 4.788,23.349 C3.371,23.085 1.861,21.894 1.275,20.578 C1.223,20.461 0.001,17.647 0.001,12.000 C0.001,6.353 1.223,3.538 1.275,3.421 C1.861,2.105 3.371,0.915 4.788,0.652 C4.932,0.625 8.398,-0.000 15.990,-0.000 C23.603,-0.000 27.066,0.625 27.210,0.651 C28.628,0.915 30.137,2.105 30.723,3.420 C30.775,3.538 32.000,6.353 32.000,12.000 C32.000,17.647 30.775,20.461 30.722,20.579 ZM28.893,4.230 C28.581,3.529 27.603,2.759 26.845,2.618 C26.813,2.612 23.386,2.000 16.010,2.000 C8.615,2.000 5.185,2.612 5.152,2.618 C4.394,2.759 3.417,3.529 3.104,4.234 C3.094,4.255 2.002,6.829 2.002,12.000 C2.002,17.170 3.094,19.744 3.106,19.770 C3.417,20.471 4.394,21.241 5.153,21.382 C5.185,21.388 8.615,22.000 15.990,22.000 L16.010,22.000 C23.386,22.000 26.813,21.388 26.846,21.382 C27.604,21.241 28.581,20.471 28.894,19.766 C28.904,19.744 29.998,17.170 29.998,12.000 C29.998,6.830 28.904,4.255 28.893,4.230 ZM13.541,17.846 C13.379,17.949 13.193,18.000 13.008,18.000 C12.842,18.000 12.676,17.959 12.525,17.875 C12.206,17.699 12.008,17.364 12.008,17.000 L12.008,7.000 C12.008,6.637 12.204,6.303 12.521,6.127 C12.838,5.950 13.227,5.958 13.534,6.149 L21.553,11.105 C21.846,11.286 22.026,11.606 22.027,11.951 C22.028,12.296 21.852,12.618 21.560,12.801 L13.541,17.846 ZM14.009,8.794 L14.009,15.189 L19.137,11.963 L14.009,8.794 Z"></path> </g></svg>
						</a>
					</li>
				</ul> -->
			</div>
        </div>
    </div>

	<!-- <div class="page__aboute-prodlines" style="background: #d9d9d9;">
		<div class="aboute-prodlines aboute-heading __container">
			<div class="aboute-heading__heading">
				<?php the_field('title_product_lines'); ?>
			</div>
			<div class="aboute-heading__text">
				<?php the_field('description_product_lines'); ?>
			</div>
		</div>

		<div class="lg-cont prodlines-content">
			<div class="prodlines-content__wrap">

				<?php
					$query = new WP_Query( array(
						'post_type' => 'product-lines',
						'order' => 'ASC',
						'orderby' => 'ID',
						'tax_query' => array(
							array(
								'taxonomy' => 'product-lines',
								'field' => 'id',
								'terms' => get_field('product_line_group'),
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
								<a href="<?=get_permalink();?>" class="prodlines-content__label">Learn More</a>
							</div>
						</div>
					<?php } ?>
					<?php wp_reset_postdata(); ?>
				<?php } ?>

			</div>
		</div>

	</div> -->

	<!-- <div class="page__aboute-products aboute-products" style="background: #000;">
		<div class="product-section__container _aboute-products">
			<div class="aboute-products__heading aboute-heading">
				<div class="aboute-heading__heading _white">
					<?php the_field('title_units'); ?>
				</div>
				<div class="aboute-heading__text">
					<?php the_field('description_product_lines'); ?>
				</div>
			</div>

			<div class="product-content">
				<?php if( have_rows('items_links', 'option') ):
					while ( have_rows('items_links', 'option') ) : the_row();?>
				<div class="product-content__item">
					<span class="product-content__icon <?php the_sub_field('icon_class');?>">
					</span>
					<div class="product-content__text">
						<h3 class="header3"><?php the_sub_field('title_group');?></h3>
						<ul>
						<?php if( have_rows('item_links') ):
							while ( have_rows('item_links') ) : the_row();
							$itemMenus = get_sub_field('link');
							?>
							<li>
								<a href="<?php echo $itemMenus['url']; ?>" class="product-content__link"><?php echo $itemMenus['title']; ?></a>
							</li>
						<?php endwhile; endif; ?>
						</ul>
					</div>
				</div>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</div> -->

	<!-- <div class="page__aboute-asos" style="background: #d9d9d9;">
		<div class="aboute-asos__container">
			<div class="aboute-asos__heading aboute-heading">
				<div class="aboute-heading__heading">
					<?php the_field('title_association'); ?>
				</div>
				<div class="aboute-heading__text">
					<?php the_field('description_association'); ?>
				</div>
			</div>

			<div class="asos-slider-container">
				<span class="slider-left-arrow asos-left _icon-arrow-new"></span>
				<div class="swiper asos-slider">
					<div class="swiper-wrapper partners-slider__wrapper">

						<?php if( have_rows('items_associations', 274) ):
							while ( have_rows('items_associations', 274) ) : the_row();
							$assocLink = get_sub_field('link');
						?>
						<div class="swiper-slide partners-slider__card">
							<a href="<?php echo $assocLink['url'];?>" target="_blank" rel="nofollow" class="partners-slider__link">
								<img src="<?php the_sub_field('image');?>" alt="<?php the_sub_field('title');?>" class="partners-slider__image" />
							</a>
						</div>
						<?php endwhile; endif; ?>

					</div>
				</div>

				<span class="slider-right-arrow asos-right _icon-arrow-new"></span>
			</div>
		</div>
	</div> -->

	<!-- <div class="page__asos-gallery asos-gallery">
		<div class="asos-gallery__container">
			<div class="asos-gallery__heading aboute-heading">
				<div class="aboute-heading__heading">
					<?php the_field('title_quality'); ?>
				</div>
				<div class="aboute-heading__text">
					<?php the_field('description_quality'); ?>
				</div>
			</div>

			<div class="gallery">
				<?php if( have_rows('images_quality') ):
				while ( have_rows('images_quality') ) : the_row();?>
				<a href="<?php the_sub_field('image');?>" class="gallery__image">
				<a href="#" class="gallery__image">
					<img alt="<?php the_sub_field('alt');?>" title="<?php the_sub_field('title');?>" src="<?php the_sub_field('image');?>" class="gallery__preview">
					<span><?php the_sub_field('name');?></span>
				</a>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</div> -->

	<!-- <div class="page__aboute-video" style="background: #d9d9d9;">
		<div class="aboute-video">
			<div class="aboute-video__container">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h2 class="small-header-gray title-desktop-left"><?php the_field('title_motorsport'); ?></h2>
						<?php the_field('description_motorsport'); ?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_field('video_motorsport'); ?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
		</div>
	</div> -->

	<!-- <div class="page__aboute-long aboute-long" style="background: #000;">
		<div class="aboute-long__container">
			<h2 class="small-header-white"><?php the_field('title_production'); ?></h2>

			
			<?php if( have_rows('items_production') ):
				while ( have_rows('items_production') ) : the_row();
				$prodType = get_sub_field('type');
			?>
			
			<?php if($prodType == 'catalog') { ?> 
			<div class="aboute-video">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
					<div class="aboute-video__blog">
						<a href="/catalog/" class="blog-aboute__link _aboute">
							<p class="blog-aboute__title">
								Try our catalogue
							</p>
						</a>
					</div>
				</div>
			</div>
			<?php } else if($prodType == 'image') { ?> 
			<div class="aboute-image">
				<div class="aboute-image__wrapper">
					<div class="aboute-image__image">
						<img src="<?php the_sub_field('image');?>" alt="<?php the_sub_field('title');?>">
					</div>
					<div class="aboute-image__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
				</div>
			</div>
			<?php } else { ?> 
			<div class="aboute-video">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h3><?php the_sub_field('title');?></h3>
						<?php the_sub_field('description');?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_sub_field('video');?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
			<?php } ?>

			<?php endwhile; endif; ?>

		</div>
	</div> -->

	<!-- <div class="page__aboute-video" style="background: #d9d9d9;">
		<div class="aboute-video">
			<div class="aboute-video__container">
				<div class="aboute-video__wrapper">
					<div class="aboute-video__text">
						<h2 class="small-header-gray title-desktop-left"><?php the_field('title_environment'); ?></h2>
						<?php the_field('description_environment'); ?>
					</div>
					<div class="aboute-video__video">
						<video id="video" width="100%" height="100%" muted="" autoplay="true" loop="true" playsinline="">
							<source src="<?php the_field('video_environment'); ?>" type="video/mp4">
						</video>
					</div>
				</div>
			</div>
		</div>
	</div> -->

    <div class="page__map">

        <div id="map" class="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmW5fa0GOj4SEpORCz4IagN3VDZ86D0KU&callback=initMap&libraries=&v=weekly&channel=2&_v=20231029103047" async=""></script>
        <script>
            // Initialize and add the map
            function initMap() {
                const marker1 = {
                    lat: 41.298981940334805,
                    lng: -89.08136808345776
                };

                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 6,
                    mapTypeControlOptions: {
                        mapTypeIds: [],
                    },
                    center: marker1,
                    mapId: "1c93a30c7513876",
                });
                const marker = new google.maps.Marker({
                    position: marker1,
                    map: map,
                    icon: {
                        url: "<?php echo get_template_directory_uri(); ?>/assets/img/map-marker.png",
                    },
                });


            }
        </script>

    </div>

</main>

<?php get_footer(); ?>