<?php 
/* Template Name: Catalog */

get_header() ?>
<div class="bg-menu"></div>

<main class="page page_catalog">
	<section class="page__podbor podbor" id="catalog_search">
		<div class="podbor__container">
			<h1 class="small-header-gray">Find pads and rotors</h1>

			<div class="podbor__tabs" data-filter="full">
				<div data-one-select data-tabs="768" class="tabs">
					<div class="tabs__header">
						<nav data-tabs-titles class="tabs__navigation">
							<button type="button" class="tabs__title _tab-active">
								Search by Application
							</button>
							<button type="button" class="tabs__title">
								Search by Part
							</button>
						</nav>

						<div class="tabs__catalog">
							<div class="tabs__catalog-wrapper">
								<select data-filter="type" name="type" data-class-modif="transparent">
									<option value="1" selected>Passenger cars</option>
									<option value="2">Commercial</option>
									<option value="3">Motorcycles</option>
								</select>
								<select data-filter="region" name="region" data-class-modif="transparent">
									<option value="1" selected>North America</option>
									<option value="2">Canada</option>
									<option value="3">Mexico</option>
								</select>
							</div>
						</div>
					</div>
					<div data-tabs-body class="tabs__content">
						<div class="tabs__body">
							<div class="tabs__body-wrapper">
								<div class="tabs__body-inner">
									<select data-filter="year" name="year" data-class-modif="input1"> <?php //data-scroll ?>
										<option value="" selected>Year</option>
									</select>

									<select data-filter="make" name="make" data-class-modif="input2">
										<option value="" selected>Make</option>
									</select>

									<select data-filter="model" name="model" data-class-modif="input3">
										<option value="" selected>Model</option>
									</select>
								</div>

								<div class="tabs__body-inner" id="inner1">
									<select data-filter="submodel" name="submodel" data-class-modif="form">
										<option value="" selected>Submodel</option>
									</select>
									<select data-filter="engine" name="engine" data-class-modif="form">
										<option value="" selected>Engine</option>
									</select>
									<select data-filter="transmission" name="transmission" data-class-modif="form">
										<option value="" selected>Transmission</option>
									</select>
								</div>
							</div>
						</div>
						<div class="tabs__body">
							<div class="tabs__body-wrapper">
								<div class="tabs__body-input5">
									<input type="text" name="form[email]" data-filter="partName" data-error="Error" placeholder="Part Number" class="input search-form__input" id="searchdata" />

									<button type="submit" class="search-form__button button search-button">
										<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
									</button>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div id="load_catalog"></div>
			</div>

			<?php /* */ ?>
			<div class="podbor__footer footer-podbor">
				<div class="footer-podbor__heading _icon-arrow-down" id="catalog_auto_title">
					<!-- Porche Cayenne 2006. Closed Off-Road Vehicle (400 hp, 4806 ccm,
					4.8 S) -->
				</div>
				<div class="footer-podbor__small" id="catalog_count_parts">
					<!-- Found 44 items. In order to make sure that the products are
					exactly right for you, please refine your search. -->
				</div>
			</div>
			<?php /**/ ?>
		</div>
	</section>

	<section class="page__type type">
		<div class="type__container">
			<h2 class="type__heading">Product lines</h2>
			<div class="type__body">
				<div class="type__item">
					<h2 class="type__title">DAILY DRIVER</h2>

					<a href="#" class="type__link _type1"> </a>
				</div>

				<div class="type__item">
					<h2 class="type__title">UPGRADE</h2>

					<a href="#" class="type__link _type2"> </a>
				</div>

				<div class="type__item">
					<h2 class="type__title">HIGH PERFORMANCE</h2>
					<a href="#" class="type__link _type3"> </a>
				</div>

				<div class="type__item">
					<h2 class="type__title">RACE</h2>

					<a href="#" class="type__link _type4"> </a>
				</div>
			</div>
		</div>
	</section>

	<section class="page__category category">
		<div class="category__container">
			<div class="category__wrapper">
				<div class="category__heading">Category</div>

				<div class="category__items item-category" data-fillter-groups="category">
					<a data-tippy-content="Brake Kits" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog1"></span>
					</a>
					<a data-tippy-content="Brake Pads" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog2"></span>
					</a>
					<a data-tippy-content="Brake Rotors" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog3"></span>
					</a>
					<a data-tippy-content="Brake Hardware" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog4"></span>
					</a>
					<a data-tippy-content="Wheel Hubs" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog5"></span>
					</a>
					<!-- Этих параметров вроде как 6 штук, но нет иконки Brake Hardware
					<a data-tippy-content="Подсказка" href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog6">А</span>
					</a>
					-->
				</div>
			</div>

			<div class="category__wrapper">
				<div class="category__heading">Side</div>

				<div class="category__items item-category" data-fillter-groups="side">
					<a href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog-car-left"></span>
					</a>
					<a href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog-car-right"></span>
					</a>
					<a href="" class="item-category__link">
						<span class="item-category__icon _icon-catalog-car-all"></span>
					</a>
				</div>
			</div>

			<div class="category__wrapper">
				<div class="category__heading">Lines</div>

				<div class="category__items item-category" data-fillter-groups="lines">
					<a href="" class="item-category__link">Black</a>
					<a href="" class="item-category__link">Ultralife</a>
					<a href="" class="item-category__link">Speed</a>
					<a href="" class="item-category__link">Elite</a>
				</div>
			</div>
		</div>
	</section>

	<!-- <section class="page__catalog catalog">
		<div class="catalog__container">
			<div class="catalog__clear">
				<button type="button" class="clear">
					<span class="clear__value"><span class="clear__content">Clear filter</span></span>
				</button>
			</div>

			<div class="catalog__wrapper">
				<div class="catalog__header header-catalog">
					<span class="header-catalog__icon _icon-catalog1"></span>
					<h2 class="header-catalog__heading">Brake kits</h2>
				</div>

				<div class="catalog__row">
					<div class="catalog__item item-first-catalog">
						<div class="item-first-catalog__header">
							13.78" RotorDiameter
						</div>
						<div class="item-first-catalog__icon">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/inner-catalog-car-left.svg" alt="" />
						</div>
						<div class="item-first-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-sxem.jpg" alt="Sxema" />
						</div>
						<div class="item-first-catalog__footer">
							<a href="#">Compare lines</a>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>
				</div>

				<div class="catalog__row">
					<div class="catalog__item item-first-catalog">
						<div class="item-first-catalog__header">
							13.78" RotorDiameter
						</div>
						<div class="item-first-catalog__icon">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/inner-catalog-car-right.svg" alt="" />
						</div>
						<div class="item-first-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-sxem.jpg" alt="Sxema" />
						</div>
						<div class="item-first-catalog__footer">
							<a href="#">Compare lines</a>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item1.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>
				</div>

				<div class="catalog__header header-catalog">
					<span class="header-catalog__icon _icon-catalog2"></span>
					<h2 class="header-catalog__heading">Brake pads</h2>
				</div>

				<div class="catalog__row">
					<div class="catalog__item item-first-catalog">
						<div class="item-first-catalog__header">
							13.78" RotorDiameter
						</div>
						<div class="item-first-catalog__icon">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/inner-catalog-car-all.svg" alt="" />
						</div>
						<div class="item-first-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-sxem2.jpg" alt="Sxema" />
						</div>
						<div class="item-first-catalog__footer">
							<a href="#">Compare lines</a>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item2.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item3.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item4.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item5.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>
				</div>

				<div class="catalog__row">
					<div class="catalog__item item-first-catalog">
						<div class="item-first-catalog__header">
							13.78" RotorDiameter
						</div>
						<div class="item-first-catalog__icon">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/inner-catalog-car-right.svg" alt="" />
						</div>
						<div class="item-first-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-sxem2.jpg" alt="Sxema" />
						</div>
						<div class="item-first-catalog__footer">
							<a href="#">Compare lines</a>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item2.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>

					<div class="catalog__item item-catalog">
						<div class="item-catalog__header">
							<div class="item-catalog__header-icons">
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card1.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card2.svg" alt="" /></a>
								<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-card3.svg" alt="" /></a>
							</div>
							<div class="item-catalog__header-heading">R1915</div>
						</div>

						<div class="item-catalog__image">
							<img src="<?php echo get_template_directory_uri(); ?>/assets/img/catalog/catalog-item3.jpg" alt="Sxema" />
						</div>

						<div class="item-catalog__footer">
							<a href="#">Show more</a>
							<button type="submit" class="item-catalog__footer-button buy-button">
								BUY
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section> -->

	
	<section class="page__catalog catalog" id="catalog">
		<div class="catalog__container">
			<div class="catalog__clear">
				<button type="button" class="clear">
					<span class="clear__value"><span class="clear__content">Clear filter</span></span>
				</button>
			</div>
	
			<div class="catalog__wrapper">
				<div class="catalog__header header-catalog">
					<span class="header-catalog__icon _icon-catalog1"></span>
					<h2 class="header-catalog__heading">Brake kits</h2>
				</div>

				<div class="catalog__row" id="catalog_row"></div>
			</div>
		</div>
	</section>
</main>

<?php get_footer(); ?>

<script>
jQuery(document).ready(function($) {
	let searchParams = new URLSearchParams(window.location.search);
	let searchdata = searchParams.get('searchdata');
	let carData = searchParams.get('carData');

	let year = searchParams.get('yr'); // 2017
    let make = searchParams.get('mk'); // Audi
    let model = searchParams.get('md'); // A4
    let getRegion = searchParams.get("rg"); // 1
    let getType = searchParams.get("tp"); // пусто

    // Установка значения по умолчанию для getType, если оно пустое
    if (!getType) {
        getType = "1"; // Присваиваем значение по умолчанию
        searchParams.set("tp", getType); // Добавляем параметр в URL

        // Перезагрузка страницы с обновленным URL
        window.location.href = window.location.pathname + '?' + searchParams.toString();
    }

    // Проверка и установка значений в инпуты
    if (year) {
        $('[data-filter="year"]').val(year);
        let year_block = $('[data-filter="year"]').parent();
        year_block.find(".select__content").text(year);
    }

    if (make) {
        $('[data-filter="make"]').val(make);
        let make_block = $('[data-filter="make"]').parent();
        make_block.find(".select__content").text(make);
    }

    if (model) {
        $('[data-filter="model"]').val(model);
        let model_block = $('[data-filter="model"]').parent();
        model_block.find(".select__content").text(model);
    }

	if(searchdata)
	{
		$("#catalog_search").find(".tabs__title:nth-child(2)").trigger("click");
		$("#searchdata").val(searchdata);
		$('[data-filter="partName"]').next(".search-form__button").trigger("click");
	}

	$("#catalog_search").find(".tabs__title").click(function(){
		if(!$(this).hasClass("_tab-active"))
		{
			let url = new URL(document.location);
			let searchParams = url.searchParams;
			
			//очистка part number
			$("#searchdata").val('');
			searchParams.delete("searchdata");
			
			//очистка модели
			$('[data-filter="model"]').html('<option value="" data-loading="" selected="">Model</option>');
			let model_block = $('[data-filter="model"]').parent();
			model_block.addClass("_select-disabled");
			model_block.find(".select__title").attr("disabled", true);
			model_block.find(".select__content").text("Model");
			model_block.find(".select__options").html("");
			searchParams.delete("md");
			
			//очистка марки
			$('[data-filter="make"]').html('<option value="" data-loading="" selected="">Make</option>');
			let make_block = $('[data-filter="make"]').parent();
			make_block.addClass("_select-disabled");
			make_block.find(".select__title").attr("disabled", true);
			make_block.find(".select__content").text("Make");
			make_block.find(".select__options").html("");
			searchParams.delete("mk");
			
			//очистка submodel
			$('[data-filter="submodel"]').html('<option value="" data-loading="" selected="">Submodel</option>');
			let submodel_block = $('[data-filter="submodel"]').parent();
			submodel_block.addClass("_select-disabled");
			submodel_block.find(".select__title").attr("disabled", true);
			submodel_block.find(".select__content").text("Submodel");
			submodel_block.find(".select__options").html("");
			
			//очистка engine
			$('[data-filter="engine"]').html('<option value="" data-loading="" selected="">Engine</option>');
			let engine_block = $('[data-filter="engine"]').parent();
			engine_block.addClass("_select-disabled");
			engine_block.find(".select__title").attr("disabled", true);
			engine_block.find(".select__content").text("Engine");
			engine_block.find(".select__options").html("");
			
			//убираем строку дополнительных параметров
			$("#inner1").hide();
			
			//очистка года
			$('[data-filter="year"]').val("");
			let year_block = $('[data-filter="year"]').parent();
			year_block.find(".select__content").text("Year");
			year_block.find(".select__option").attr("hidden", false);
			searchParams.delete("yr");

			window.history.pushState({}, '', url.toString());
			
			//убираем заголовок
			$("#catalog_auto_title").html("").hide();
			$("#load_catalog").html("");
			
			//убираем каталог
			$("#catalog_row").html("");
			$("#catalog").hide();
		}
	});
	
	$('[data-filter="year"]').on("change", function(){
		let url = new URL(document.location);
		let searchParams = url.searchParams;
		
		searchParams.set("yr", $(this).val());
		
		window.history.pushState({}, '', url.toString());
	});
	
	$('[data-filter="make"]').on("change", function(){
		let url = new URL(document.location);
		let searchParams = url.searchParams;
		
		searchParams.set("mk", $(this).val());
		
		window.history.pushState({}, '', url.toString());
	});
	
	$('[data-filter="model"]').on("change", function(){
		let url = new URL(document.location);
		let searchParams = url.searchParams;
		
		searchParams.set("md", $(this).val());
		
		window.history.pushState({}, '', url.toString());
	});

	$('[data-filter="region"]').on("change", function(){
		let url = new URL(document.location);
		let searchParams = url.searchParams;
		
		searchParams.set("rg", $(this).val());
		
		window.history.pushState({}, '', url.toString());
	});

	$('[data-filter="type"]').on("change", function(){
		let url = new URL(document.location);
		let searchParams = url.searchParams;
		
		searchParams.set("tp", $(this).val());
		
		window.history.pushState({}, '', url.toString());
	});
});
</script>