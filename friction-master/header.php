<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="format-detection" content="telephone=no">
	<link rel="shortcut icon" href="/favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">

	<!-- <link rel="stylesheet" href="/wp-content/themes/friction-master/assets/libs/lightGallery/css/lightgallery.css">
	<link rel="stylesheet" href="/wp-content/themes/friction-master/assets/libs/lightGallery/css/lg-zoom.css">
	<link rel="stylesheet" href="/wp-content/themes/friction-master/assets/libs/lightGallery/css/lg-thumbnail.css"> -->
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div class="wrapper">
		<header class="header">
			<div class="lg-container">

				<div class="header__content">

					<div class="header__logo">
						<?php if(is_front_page()) { ?>
							<i class="_icon-logo logo-icon"></i>
						<?php } else { ?>
							<a href="/">
								<i class="_icon-logo logo-icon"></i>
							</a>
						<?php } ?>
						
					</div>

					<div class="header__burger menu">

						<button type="button" class="menu__icon icon-menu"> <span></span> </button>

						<nav class="menu__body">

						<?php if( have_rows('main_menu', 'option') ):
							while ( have_rows('main_menu', 'option') ) : the_row();
							$itemMenu = get_sub_field('link_item_menu');
							?>
							<h3 <?php if( have_rows('submenu_main_menu') ): ?>class="has-submenu<?php if($itemMenu['url'] == '#') { ?> no-link<?php } ?>"<?php endif; ?>>
								<a href="<?php echo $itemMenu['url']; ?>" <?php if($itemMenu['target']) { ?>target="_blank"<?php } ?> class="menu__link"><?php echo $itemMenu['title']; ?></a>
								<?php if( have_rows('submenu_main_menu') ): ?>
									<span>
										<svg width="18" height="18" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#ffffff"></path></g></svg>
									</span>
								<?php endif; ?>
							</h3>

							<?php if( have_rows('submenu_main_menu') ): ?>
							<ul>
								<?php while ( have_rows('submenu_main_menu') ) : the_row();
									$itemSubmenu = get_sub_field('link_item_submenu');
								?>
								<li><a href="<?php echo $itemSubmenu['url']; ?>" <?php if($itemSubmenu['target']) { ?>target="_blank"<?php } ?> class="menu__link"><?php echo $itemSubmenu['title']; ?></a></li>
								<?php endwhile; ?>
							</ul>
							<?php endif; ?>

							<?php endwhile; endif; ?>
						</nav>

					</div>

				</div>

			</div>
		</header>