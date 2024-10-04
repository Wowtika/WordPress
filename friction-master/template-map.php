<?php 
/*  Template name: Map*/
get_header(); ?>

<div class="blog-header">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/home/product-fon.jpg" class="product-bg">

    <div class="cta-lines">

        <div class="cta-red-lines">
            <img class="cta-red-lines__image" src="<?php echo get_template_directory_uri(); ?>/assets/img/home/cta-red-lines.svg" alt="" />
        </div>

        <div class="cta-white-lines">
            <img class="cta-white-lines__image" src="<?php echo get_template_directory_uri(); ?>/assets/img/home/cta-white-lines.svg" alt="" />
        </div>
    </div>

</div>

<main class="page page_map">

    <div class="page__blog-category">

        <div class="blog-category__container">

            <div class="blog-category">

                <a href="#" class="blog-category__link active">
                    <span>Online Retailers</span>
                </a>
                <a href="#" class="blog-category__link ">
                    <span>Wholesale Distributors</span>
                </a>
                <a href="#" class="blog-category__link">
                    <span>Retail Stores</span>
                </a>
                <a href="#" class="blog-category__link">
                    <span>Certified Mechanics</span>
                </a>

            </div>

        </div>

    </div>

    <div class="map-search">

        <div class="map-search__container">

            <div class="map-search__wrap">

                <div class="map-search__input">
                    <form class="search-form" action="#">
                        <div class="search-form__column">
                            <input type="text" name="form[email]" data-error="Error" placeholder="Type your city" class="input search-form__input" />
                            <button type="submit" class="search-form__button button search-button">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/home/magnifying-glass-solid.svg" class="search-button__image" alt="" />
                            </button>
                        </div>
                    </form>
                </div>

                <button type="button" class="button map-search__button">
                    Learn More
                </button>

            </div>

        </div>

    </div>


    <div class="page__map">

        <div id="map" class="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmW5fa0GOj4SEpORCz4IagN3VDZ86D0KU&callback=initMap&libraries=&v=weekly&channel=2&_v=20231029103047" async=""></script>
        <script>
            // Initialize and add the map
            function initMap() {
                const moscow = {
                    lat: 55.75,
                    lng: 37.62
                };
                const ekat = {
                    lat: 56.83,
                    lng: 60.61
                };
                const spb = {
                    lat: 59.92,
                    lng: 30.31
                };
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 4,
                    mapTypeControlOptions: {
                        mapTypeIds: [],
                    },
                    center: moscow,
                    mapId: "1c93a30c7513876",
                });
                const marker = new google.maps.Marker({
                    position: moscow,
                    map: map,
                    icon: {
                        url: "<?php echo get_template_directory_uri(); ?>/assets/img/map-marker.png",
                    },
                });
                const marker1 = new google.maps.Marker({
                    position: ekat,
                    map: map,
                    icon: {
                        url: "<?php echo get_template_directory_uri(); ?>/assets/img/map-marker.png",
                    },
                });
                const marker2 = new google.maps.Marker({
                    position: spb,
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