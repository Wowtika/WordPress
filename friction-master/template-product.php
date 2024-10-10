<?php 
/* Template Name: Product */

get_header() ?>

<?php //if(is_user_logged_in()) { ?>
<!-- <section>
	<h2 class="small-header-gray1 _card">9. Изображения детали</h2> -->
<?php
	// 9. Изображения детали
	// URL вашего API
	$url = 'https://catalog.loopautomotive.com/catalog/part-images?part_ids=' . $_GET['part_id']; // Замените на фактический URL вашего API

	// Заголовки запроса
	$headers = array(
		'Content-Type: application/json',
	);

	// Создаем новый cURL ресурс
	$ch = curl_init($url);

	// Устанавливаем опции cURL
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	//curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params)); // Преобразуем параметры в JSON и передаем их в теле запроса

	// Выполняем запрос
	$response = curl_exec($ch);

	// Проверяем наличие ошибок
	if (curl_errno($ch)) {
		echo 'Ошибка cURL: ' . curl_error($ch);
	} else {
		$data = json_decode($response, true);
		
		// Печатаем данные
		//print_r($data);
		//var_dump($data);
		$partImages = $data;
	}
	curl_close($ch);
?>
<!-- </section> -->

<!-- <section>
	<h2 class="small-header-gray1 _card">8. Атрибуты детали.</h2> -->
<?php
	// 8. Атрибуты детали.
	// URL вашего API
	$url = 'https://catalog.loopautomotive.com/catalog/part-attributes?part_id=' . $_GET['part_id']; // Замените на фактический URL вашего API

	// Заголовки запроса
	$headers = array(
		'Content-Type: application/json',
	);

	// Создаем новый cURL ресурс
	$ch = curl_init($url);

	// Устанавливаем опции cURL
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	//curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params)); // Преобразуем параметры в JSON и передаем их в теле запроса

	// Выполняем запрос
	$response = curl_exec($ch);

	// Проверяем наличие ошибок
	if (curl_errno($ch)) {
		echo 'Ошибка cURL: ' . curl_error($ch);
	} else {
		$data = json_decode($response, true);
		
		// Печатаем данные
		//print_r($data);
		$partAttribute = $data;
		//var_dump($data);
	}
	curl_close($ch);
?>
<!-- </section> -->

<!-- <section>
	<h2 class="small-header-gray1 _card">13. Применимость по номеру детали.</h2> -->
<?php
	// 13. Применимость по номеру детали..
	// URL вашего API
	$url = 'https://catalog.loopautomotive.com/catalog/part-app?part_id=' . $_GET['part_id']; // Замените на фактический URL вашего API
	// Заголовки запроса
	$headers = array(
		'Content-Type: application/json',
	);
	// Создаем новый cURL ресурс
	$ch = curl_init($url);
	// Устанавливаем опции cURL
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	//curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params)); // Преобразуем параметры в JSON и передаем их в теле запроса
	// Выполняем запрос
	$response = curl_exec($ch);
	// Проверяем наличие ошибок
	if (curl_errno($ch)) {
		echo 'Ошибка cURL: ' . curl_error($ch);
	} else {
		$data = json_decode($response, true);
		$partApp = $data;
		//var_dump($data);
	}
	curl_close($ch);

	foreach ($partApp as $car) {
		$make = $car["make"];
		unset($car["make"]);
		$groupedData[$make][] = $car;
	}


?>
<!-- </section> -->

<?php //} ?>

<div class="card-header">
	<img src="<?=get_template_directory_uri();?>/assets/img/home/product-fon.jpg" class="product-bg">

	<div class="card-header__bg">
		<div class="card-header__wrapper">

			<?php 
				/*
					в зависимости от категории (Black, Ultralife, Speed, Elite) тут должна менятся картинка
				*/
			?>
			<img class="card-header__image" src="<?=get_template_directory_uri();?>/assets/img/card/card-bg.svg" alt="">
			<!-- <img class="card-header__image-mobile" src="<?=get_template_directory_uri();?>/assets/img/catalog/header-bg-mobile.svg" alt=""> -->
		</div>
	</div>

</div>

<main class="page page_card">

	<!-- <div class="card-category__container">

		<div class="card-category">
			<?php
				$query = new WP_Query( array(
					'post_type' => 'product-lines',
					'order' => 'ASC',
					'orderby' => 'ID',
				));
			?>
			<?php if ( $query->have_posts() ) { ?>
				<?php while ( $query->have_posts() ) { ?>
					<?php $query->the_post(); ?>
					<a href="<?=get_permalink();?>" class="card-category__link">
						<span><?php the_title() ?></span>
					</a>
				<?php } ?>
				<?php wp_reset_postdata(); ?>
			<?php } ?>
		</div>

	</div> -->

	<section class="page__card card" id="part_card">
		<div class="card__container">

			<div class="card__header">
				<h2 class="card__heading"><?php echo $partAttribute[0]["name"] . ' ' . $partAttribute[0]["value"] ?></h2>
			</div>

			<div class="card__body">

				<div class="card__gallery">

					<div class="card-slider swiper">
						<div class="card-slider__wrapper swiper-wrapper">

							<?php 
								foreach ($partImages as $item) {
									if (is_array($item) && isset($item['images'])) {
										foreach ($item['images'] as $image) {
							?>
							<div class="card-slider__cont swiper-slide">
								<img class="card-slider__image" src="<?php echo $image; ?>" alt="">
							</div>
							<?php } } } ?>

							<?php 
								foreach ($partImages as $item) {
									if (is_array($item) && isset($item['tech_drawings'])) {
										foreach ($item['tech_drawings'] as $image) {
							?>
							<div class="card-slider__cont swiper-slide">
								<img class="card-slider__image" src="<?php echo $image; ?>" alt="">
							</div>
							<?php } } } ?>
						</div>
					</div>

					<div class="card-thumbs swiper">
						<div class="card-thumbs__wrapper swiper-wrapper">
						<?php 
								foreach ($partImages as $item) {
									if (is_array($item) && isset($item['images'])) {
										foreach ($item['images'] as $image) {
							?>
							<div class="card-thumbs__cont swiper-slide">
								<img class="card-thumbs__image" src="<?php echo $image; ?>" alt="">
							</div>
							<?php } } } ?>
							<?php 
								foreach ($partImages as $item) {
									if (is_array($item) && isset($item['tech_drawings'])) {
										foreach ($item['tech_drawings'] as $image) {
							?>
							<div class="card-thumbs__cont swiper-slide">
								<img class="card-thumbs__image" src="<?php echo $image; ?>" alt="">
							</div>
							<?php } } } ?>
						</div>
					</div>

				</div>

				<div class="card__content content-card">

					<div class="content-card__header header-card">
						<span class="header-card__icon _icon-arrow-down"></span>Fits Porche Cayenne 2006
					</div>

					<div class="content-card__body body-card">

						<div class="body-card__item-heading"><?php the_field('part','option');?></div>
						<div class="body-card__item-text"><?php echo $partAttribute[0]["name"] . ' ' . $partAttribute[0]["value"] ?></div>
						<div class="body-card__item-heading"><?php the_field('position','option');?></div>
						<div class="body-card__item-icons">

							<div class="item-category">
								<a href="" class="item-category__link">
									<span class="item-category__icon _icon-catalog-car-left"></span>
								</a>
								<a href="" class="item-category__link active">
									<span class="item-category__icon _icon-catalog-car-right"></span>
								</a>
								<a href="" class="item-category__link">
									<span class="item-category__icon _icon-catalog-car-all"></span>
								</a>
							</div>

						</div>
						<div class="body-card__item-heading"><?php the_field('type','option');?></div>
						<div class="body-card__item-text">Daily driver</div>

					</div>

					<div class="content-card__footer footer-card">

						<div class="footer-card__heading">
							<?php the_field('About this part','option');?>
						</div>

						<ul class="footer-card__list card-list">
							<li class="card-list__item">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
							</li>
							<li class="card-list__item">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
							</li>
							<li class="card-list__item">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
							</li>
						</ul>

						<a class="footer-card__link" href="#"><?php the_field('see_more_part_details','option');?></a>

					</div>

				</div>

				<div class="card__markets markets-card">

					<div class="markets-card__header">
						<h3 class="markets-card__heading"><?php the_field('choose_where_to_buy','option');?></h3>

						<button type="button" class="markets-card__button buy-button _icon-arrow-buy"><?php the_field('buy','option');?></button>
					</div>

					<div class="markets-card__logos">
						<a href="#" class="markets-card__logo">
							<img src="<?=get_template_directory_uri();?>/assets/img/gallery/ebay.jpg" alt="">
						</a>
						<a href="#" class="markets-card__logo">
							<img src="<?=get_template_directory_uri();?>/assets/img/gallery/wallmart.jpg" alt="">
						</a>
					</div>

					<div class="markets-card__footer">

						<a href="#" class="markets-card__link"><?php the_field('more_buying_options','option');?></a>

					</div>

				</div>

				<div class="card__customer customer-card">
					<a href="#" class="customer-card__link">
						<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt="<?php the_field('customer_support','option');?>">
						<span class="text"><?php the_field('customer_support','option');?></span>
					</a>
				</div>

			</div>

			<div class="card__footer card-tabs">

				<div class="card-tabs__wrapper">

					<div class="card-tabs__item">

						<div class="card-tabs__header">
							<?php the_field('technical_specifications','option');?>
						</div>
						<?php 
							$partAttribute;
							$foreachIndAttribute = 1;
							foreach ($partAttribute as $item) {
						?>
						<?php if($item['value'] != '') { ?> 
						<div class="card-tabs__row">
							<div class="card-tabs__row-inner"><?php echo $item['name']; ?></div>
							<div class="card-tabs__row-inner"><b><?php echo $item['value']; ?></b></div>
						</div>
						<?php } ?>
						<?php if($foreachIndAttribute == 3) { ?> 
							<div data-spollers class="spollers">
								<div class="spollers__item">
									<button type="button" data-spoller class="spollers__title"><?php the_field('all_specifications','option');?></button>
									<div class="spollers__body">
						<?php } ?>
						<?php $foreachIndAttribute++; } ?>
									</div>
								</div>
							</div>
					</div>

					<div class="card-tabs__item">
						<div class="card-tabs__header">
							<?php the_field('suitable_for_vehicles','option');?>
						</div>
						<?php 
						foreach ($groupedData as $make => $cars) { ?>
						<div data-spollers class="spollers">
							<div class="spollers__item">
								<button type="button" data-spoller class="spollers__title"><?php echo $make; ?></button>
								<div class="spollers__body">
									<?php foreach ($cars as $car) { ?>
									<div class="card-tabs__row card-tabs__row_cars">
										<div class="card-tabs__row-inner"><?php echo $car["year"]; ?> / <?php echo $car["model"]; ?> / <?php echo $car["engine"]; ?></div>
										<!-- <div class="card-tabs__row-inner"><b><?php echo $car["model"]; ?></b></div>
										<div class="card-tabs__row-inner"><b><?php echo $car["engine"]; ?></b></div> -->
									</div>
									<?php } ?>
								</div>
							</div>
						</div>
						<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</section> 

	<div id="load_catalog"></div>

	<?php if (isset($_GET['part_id']) && $_GET['part_id'] != '') { ?>
		<script type="text/javascript">
			jQuery(function($) {
				console.log(<?=$_GET['part_id'];?>);
				$.ajax({
					url: ApiCatalog.url,
					type: 'GET',
					data: Object.assign({
						action: 'apicatalog:partAttributes', 
						nonce : ApiCatalog.nonce 
					}, {
						'part_id': <?=$_GET['part_id'];?>,
					}),
					success: function(res){
						if( res && res.success ) {
							if( res.data ) {
								console.log(res);
							}
						}
					},
					error: function(xhr) {
						console.log(xhr);
					},
				});
			});
		</script>
	<?php } ?>

	<?php get_template_part('template_part/features_and_benefits') ?>

	<?php get_template_part('template_part/card_video') ?>

	<section class="page__card-partners">

		<div class="partners partners__container">

			<div class="partners__header">
				<h3 class="partners__heading header3"><?php the_field('rating_on_marketplaces','option');?></h3>
			</div>

			<div class="partners__wrapper">

				<span class="slider-left-arrow partners-left _icon-arrow-new">
					<!-- <img src="<?=get_template_directory_uri();?>/assets/img/home/arrow-left.png" alt="" class="partners-left-arrow__img" /> -->
				</span>
				<div class="swiper partners-slider">
					<div class="swiper-wrapper partners-slider__wrapper ">

						<!-- <div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part1.svg" alt="" class="partners-slider__image">
							</a>
							<div class="partners-slider__star">

								<div class="rating rating_set">
									<div class="rating__body">
										<div class="rating__active" style="width:66%"></div>
										<div class="rating__items">
											<input type="radio" class="rating__item" value="1" name="rating">
											<input type="radio" class="rating__item" value="2" name="rating">
											<input type="radio" class="rating__item" value="3" name="rating">
											<input type="radio" class="rating__item" value="4" name="rating">
											<input type="radio" class="rating__item" value="5" name="rating">
										</div>
									</div>
									<div class="rating__value"><b>3.6</b> / 5</div>
								</div>

							</div>
						</div> -->
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part2.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="partners-slider__star">
								<div class="rating rating_set">
									<div class="rating__body">
										<div class="rating__active" style="width:66%"></div>
										<div class="rating__items">
											<input type="radio" class="rating__item" value="1" name="rating">
											<input type="radio" class="rating__item" value="2" name="rating">
											<input type="radio" class="rating__item" value="3" name="rating">
											<input type="radio" class="rating__item" value="4" name="rating">
											<input type="radio" class="rating__item" value="5" name="rating">
										</div>
									</div>
									<div class="rating__value"><b>3.6</b> / 5</div>
								</div>
							</div> -->
						</div>
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part3.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="rating rating_set">
								<div class="rating__body">
									<div class="rating__active" style="width:100%"></div>
									<div class="rating__items">
										<input type="radio" class="rating__item" value="1" name="rating">
										<input type="radio" class="rating__item" value="2" name="rating">
										<input type="radio" class="rating__item" value="3" name="rating">
										<input type="radio" class="rating__item" value="4" name="rating">
										<input type="radio" class="rating__item" value="5" name="rating">
									</div>
								</div>
								<div class="rating__value"><b>5</b> / 5</div>
							</div> -->
						</div>
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part4.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="rating rating_set">
								<div class="rating__body">
									<div class="rating__active" style="width:20%"></div>
									<div class="rating__items">
										<input type="radio" class="rating__item" value="1" name="rating">
										<input type="radio" class="rating__item" value="2" name="rating">
										<input type="radio" class="rating__item" value="3" name="rating">
										<input type="radio" class="rating__item" value="4" name="rating">
										<input type="radio" class="rating__item" value="5" name="rating">
									</div>
								</div>
								<div class="rating__value"><b>2</b> / 5</div>
							</div> -->
						</div>

						<!-- <div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part1.svg" alt="" class="partners-slider__image">
							</a>
							<div class="partners-slider__star">

								<div class="rating rating_set">
									<div class="rating__body">
										<div class="rating__active" style="width:66%"></div>
										<div class="rating__items">
											<input type="radio" class="rating__item" value="1" name="rating">
											<input type="radio" class="rating__item" value="2" name="rating">
											<input type="radio" class="rating__item" value="3" name="rating">
											<input type="radio" class="rating__item" value="4" name="rating">
											<input type="radio" class="rating__item" value="5" name="rating">
										</div>
									</div>
									<div class="rating__value"><b>3.6</b> / 5</div>
								</div>

							</div>
						</div> -->
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part2.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="partners-slider__star">
								<div class="rating rating_set">
									<div class="rating__body">
										<div class="rating__active" style="width:66%"></div>
										<div class="rating__items">
											<input type="radio" class="rating__item" value="1" name="rating">
											<input type="radio" class="rating__item" value="2" name="rating">
											<input type="radio" class="rating__item" value="3" name="rating">
											<input type="radio" class="rating__item" value="4" name="rating">
											<input type="radio" class="rating__item" value="5" name="rating">
										</div>
									</div>
									<div class="rating__value"><b>3.6</b> / 5</div>
								</div>
							</div> -->
						</div>
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part3.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="rating rating_set">
								<div class="rating__body">
									<div class="rating__active" style="width:100%"></div>
									<div class="rating__items">
										<input type="radio" class="rating__item" value="1" name="rating">
										<input type="radio" class="rating__item" value="2" name="rating">
										<input type="radio" class="rating__item" value="3" name="rating">
										<input type="radio" class="rating__item" value="4" name="rating">
										<input type="radio" class="rating__item" value="5" name="rating">
									</div>
								</div>
								<div class="rating__value"><b>5</b> / 5</div>
							</div> -->
						</div>
						<div class="swiper-slide partners-slider__card ">
							<a href="#" class="partners-slider__link">
								<img src="<?=get_template_directory_uri();?>/assets/img/partners/part4.svg" alt="" class="partners-slider__image">
							</a>
							<!-- <div class="rating rating_set">
								<div class="rating__body">
									<div class="rating__active" style="width:20%"></div>
									<div class="rating__items">
										<input type="radio" class="rating__item" value="1" name="rating">
										<input type="radio" class="rating__item" value="2" name="rating">
										<input type="radio" class="rating__item" value="3" name="rating">
										<input type="radio" class="rating__item" value="4" name="rating">
										<input type="radio" class="rating__item" value="5" name="rating">
									</div>
								</div>
								<div class="rating__value"><b>2</b> / 5</div>
							</div> -->
						</div>

					</div>
				</div>
				<span class="slider-right-arrow partners-right _icon-arrow-new">
					<!-- <img src="<?=get_template_directory_uri();?>/assets/img/home/arrow-left.png" alt="" class="partners-right-arrow__img" /> -->
				</span>

			</div>

		</div>
	</section>

	<section class="page__card-work-circles">
		<?php get_template_part('template_part/how_it_works') ?>
	</section>

	<section class="page__card-benefit benefit">
		<div class="benefit__container">
			<div class="benefit__text">

				<div class="benefit__heading">
					<h3 class="small-header-white">Get More Benefits!<br>
						Friction Master BK1591 Brake Kit</h3>
				</div>

				<div class="benefit__list card-list">
					<p>By purchasing this item as a set, you will receive:</p>
					<li class="card-list__item">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
					</li>
					<li class="card-list__item">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
					</li>
					<li class="card-list__item">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eaque?
					</li>
				</div>

			</div>
			<div class="benefit__image">
				<img src="<?=get_template_directory_uri();?>/assets/img/card/benefit1.jpg" alt="">
				<button type="submit" class="benefit__button buy-button"><?php the_field('buy','option');?></button>
			</div>
		</div>
	</section>

	<section class="page__card-catalog catalog">

		<div class="catalog__container">

			<div class="catalog__wrapper">

				<div class="catalog__header">
					<h2 class="small-header-gray1 _card"><?php the_field('related_products','option');?></h2>
				</div>

				<div class="catalog__row">

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

				</div>

				<div class="catalog__header">
					<h2 class="small-header-gray1 _card">You will also like</h2>
				</div>

				<div class="catalog__row">

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

					<div class="catalog__item item-catalog">

						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card1.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card2.svg" alt=""></a>
								<a href="#"><img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-card3.svg" alt=""></a>
							</div>
							<div class="item-catalog__header-heading">
								R1915
							</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?=get_template_directory_uri();?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema">
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">BUY</button>

						</div>

					</div>

				</div>

			</div>

		</div>

	</section>

</main>






<?php get_footer(); ?>