		<div class="footer-section">
			<div class="cta-lines-footer"></div>

			<div class="footer-section__container">

				<div class="footer-section__search">
					<?php get_template_part('template_part/search') ?>
				</div>

				<div class="footer-section__nav">

					<nav class="footer-nav">

						<div class="footer-nav__item _dot">

							
							<?php if( have_rows('column_1_footer_menu', 'option') ):
								while ( have_rows('column_1_footer_menu', 'option') ) : the_row();
								$itemMenu = get_sub_field('item_menu');
							?>
							<div data-spollers="767.98,max" class="spollers-footer">
								<div class="spollers-footer__item">

									<button type="button" data-spoller class="spollers-footer__title">
										<h3><a href="<?php echo $itemMenu['url']; ?>" <?php if($itemMenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemMenu['title']; ?></a></h3>
									</button>
									<?php if( have_rows('submenu_footer') ): ?>
									<div class="spollers-footer__body">
										<ul>
											<?php while ( have_rows('submenu_footer') ) : the_row();
												$itemSubmenu = get_sub_field('item_submenu');
											?>
											<li><a href="<?php echo $itemSubmenu['url']; ?>" <?php if($itemSubmenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemSubmenu['title']; ?></a></li>
											<?php endwhile; ?>
										</ul>
									</div>
									<?php endif; ?>

								</div>
							</div>
							<?php endwhile; endif; ?>

						</div>

						<div class="footer-nav__item">

							<?php if( have_rows('column_2_footer_menu', 'option') ):
								while ( have_rows('column_2_footer_menu', 'option') ) : the_row();
								$itemMenu = get_sub_field('item_menu');
							?>
							<div data-spollers="767.98,max" class="spollers-footer">
								<div class="spollers-footer__item">

									<button type="button" data-spoller class="spollers-footer__title">
										<h3><a href="<?php echo $itemMenu['url']; ?>" <?php if($itemMenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemMenu['title']; ?></a></h3>
									</button>
									<?php if( have_rows('submenu_footer') ): ?>
									<div class="spollers-footer__body">
										<ul>
											<?php while ( have_rows('submenu_footer') ) : the_row();
												$itemSubmenu = get_sub_field('item_submenu');
											?>
											<li><a href="<?php echo $itemSubmenu['url']; ?>" <?php if($itemSubmenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemSubmenu['title']; ?></a></li>
											<?php endwhile; ?>
										</ul>
									</div>
									<?php endif; ?>

								</div>
							</div>
							<?php endwhile; endif; ?>

						</div>

						<div class="footer-nav__item">

							<?php if( have_rows('column_3_footer_menu', 'option') ):
								while ( have_rows('column_3_footer_menu', 'option') ) : the_row();
								$itemMenu = get_sub_field('item_menu');
							?>
							<div data-spollers="767.98,max" class="spollers-footer">
								<div class="spollers-footer__item">

									<button type="button" data-spoller class="spollers-footer__title">
										<h3><a href="<?php echo $itemMenu['url']; ?>" <?php if($itemMenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemMenu['title']; ?></a></h3>
									</button>
									<?php if( have_rows('submenu_footer') ): ?>
									<div class="spollers-footer__body">
										<ul>
											<?php while ( have_rows('submenu_footer') ) : the_row();
												$itemSubmenu = get_sub_field('item_submenu');
											?>
											<li><a href="<?php echo $itemSubmenu['url']; ?>" <?php if($itemSubmenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemSubmenu['title']; ?></a></li>
											<?php endwhile; ?>
										</ul>
									</div>
									<?php endif; ?>

								</div>
							</div>
							<?php endwhile; endif; ?>

						</div>

						<div class="footer-nav__item">

							<?php if( have_rows('column_4_footer_menu', 'option') ):
								while ( have_rows('column_4_footer_menu', 'option') ) : the_row();
								$itemMenu = get_sub_field('item_menu');
							?>
							<div data-spollers="767.98,max" class="spollers-footer">
								<div class="spollers-footer__item">

									<button type="button" data-spoller class="spollers-footer__title">
										<h3><a href="<?php echo $itemMenu['url']; ?>" <?php if($itemMenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemMenu['title']; ?></a></h3>
									</button>
									<?php if( have_rows('submenu_footer') ): ?>
									<div class="spollers-footer__body">
										<ul>
											<?php while ( have_rows('submenu_footer') ) : the_row();
												$itemSubmenu = get_sub_field('item_submenu');
											?>
											<li><a href="<?php echo $itemSubmenu['url']; ?>" <?php if($itemSubmenu['target']) { ?>target="_blank"<?php } ?> class="footer-nav__link"><?php echo $itemSubmenu['title']; ?></a></li>
											<?php endwhile; ?>
										</ul>
									</div>
									<?php endif; ?>

								</div>
							</div>
							<?php endwhile; endif; ?>

						</div>

						<div class="footer-nav__item footer-contacts">

							<?php if ( $phone = get_field('phone', 'options') ) { ?>
								<div class="footer-contacts__tel">
									<a href="tel:<?= preg_replace('/[^0-9\+]/', '', $phone); ?>" class="footer-contacts__link">
										<img class="footer-contacts__icon" src="<?=get_template_directory_uri();?>/assets/img/social/tel.svg" alt="">
										<?=$phone;?>
									</a>
								</div>
							<?php } ?>

							<?php if ( $email = get_field('email', 'options') ) { ?>
								<div class="footer-contacts__email">
									<a href="mailto:<?=$email;?>" class="footer-contacts__link">
										<img class="footer-contacts__icon" src="<?=get_template_directory_uri();?>/assets/img/social/email.svg" alt="">
										<?=$email;?>
									</a>
								</div>
							<?php } ?>

							<div class="footer-contacts__social">
								<?php if( have_rows('socials', 'option') ):
								while ( have_rows('socials', 'option') ) : the_row();?>
									<a href="<?php the_sub_field('link');?>" class="footer-contacts__link" target="_blank"><img class="footer-contacts__icon" src="<?php the_sub_field('icon');?>" alt="<?php the_sub_field('title');?>"><span><?php the_sub_field('title');?></span></a>
								<?php endwhile; endif; ?>
							</div>

							<div class="footer-contacts__us">
								<!-- <span> -->
									<img class="footer-contacts__icon" src="<?=get_template_directory_uri();?>/assets/img/social/flag2.svg" alt="">
									<span class="modal-local"><?=get_field('contacts__us', 'options');?></span>
								<!--  -->
							</div>

						</div>

					</nav>

				</div>

				<div class="footer-section__end footer-end">

					<div class="footer-end__text">
						<?=get_field('footer_text', 'options');?>
					</div>
					<div class="footer-end__copy">
						© <?=date("Y");?>. <?=get_field('footer_copy', 'options');?>
					</div>

				</div>
			</div>
		</div>
	</div>

	<?php get_template_part('template_part/modal') ?>
	

	<?php if(is_user_logged_in()) { ?> 

	<style>
		.modal-local{
			cursor: pointer;
			
		}
		.modal{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background: rgba(0,0,0,.5);
			display: none;
			justify-content: center;
			padding: 40px 15px;
			align-items: flex-start;
		}
		.modal.open{
			display: flex;
			z-index: 99999;
		}
		.modal .content{
			width: 100%;
			max-width: 700px;
			padding: 40px;
			background: #fff;
			overflow: auto;
			max-height: calc(100vh - 80px); 
			position: relative;

		}
		.close-modal{
			width: 25px;
			height: 25px;
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
			transition: all .3s;
		}
		.close-modal:hover{
			opacity: .7;
		}
		.modal .content p.title{
			color: #3e3e3e;
			font-family: Roboto;
			font-weight: 700;
			text-align: center;
			font-size: 18px;
			margin-bottom: 30px;
		}
		.title-section-localization{
			color: #3e3e3e;
			font-family: Roboto;
			font-weight: 700;
			margin-bottom: 15px;
		}
		.items-localization{
			margin-bottom: 30px;
			display: flex;
			gap: 10px;
			flex-wrap: wrap;
		}
		.items-localization a{
			background: #f5f5f5;
			line-height: 45px;
			padding: 0 15px;
			width: calc((100% - 20px) / 3);
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			transition: all .3s;
		}
		.items-localization span.countrylist--lang{
			color: #b0b0b0;
		}
		.items-localization a:hover{
			background: #3e3e3e;
			color: #fff;
		}
	</style>

	<div class="modal" id="localization">
		<div class="content">
			<div class="close-modal">
				<svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
			</div>

			<p class="title"><?php the_field('title_section_modal_regions', 'option'); ?></p>

			<?php if( have_rows('regions', 'option') ):
			while ( have_rows('regions', 'option') ) : the_row();?>
			
			<p class="title-section-localization"><?php the_sub_field('title_group_regions');?></p>

			<div class="items-localization">
				<?php if( have_rows('links') ):
				while ( have_rows('links') ) : the_row();?>
					<a href="<?php the_sub_field('link');?>"><span><?php the_sub_field('country');?></span><span class="countrylist--lang"><?php the_sub_field('language');?></span></a>
				<?php endwhile; endif; ?>
			</div>

			<?php endwhile; endif; ?>

		</div>
	</div>
	<?php } ?>

	<?php wp_footer(); ?>
	<script>
		(function(w, $){for(let fn of (w.__fns=w.__fns||[])){fn($)}Object.defineProperty((w.__fns=w.__fns||[]),'push',{enumerable: false,configurable: false,writable: false,value: function(){for(let fn of arguments){fn($)}}});})(window, jQuery);
	</script>
	<script>
		jQuery('a[href="#"]').click(function(e){
			e.preventDefault();
		})
		jQuery('.no-link').click(function(){
			jQuery(this).toggleClass('opened');
			jQuery(this).next().slideToggle();
		})
		var widthDocument = jQuery(document).width();

		if(widthDocument < 1920){
			var leftVideo = (widthDocument - 1920) / 2;
			jQuery('.fullscreen-video').css('left', leftVideo);
			console.log(leftVideo);
		}

		jQuery(window).resize(function() {
			var widthDocument = jQuery(document).width();

			if(widthDocument < 1920){
				var leftVideo = (widthDocument - 1920) / 2;
				jQuery('.fullscreen-video').css('left', leftVideo);
				console.log(leftVideo);
			}
		});


	</script>

	<script>
		jQuery('.nav-search a').click(function(e){
			e.preventDefault();
			jQuery('.nav-search a').removeClass('active');
			jQuery(this).addClass('active');
			var tabID = jQuery(this).attr('href');
			jQuery('.cta-body .tabs .tab').removeClass('active');
			jQuery(tabID).addClass('active');
		})
	</script>

	<script>
		jQuery('.modal-local').click(function(){
			jQuery('#localization').addClass('open');
		})
		jQuery('#localization .close-modal').click(function(){
			jQuery('#localization').removeClass('open');
		})
	</script>
</body>
</html>