<?php

if( wp_doing_ajax() ) {
	add_action('wp_ajax_apicatalog:years', [WpApiCatalog::class, 'action_years']);
	add_action('wp_ajax_nopriv_apicatalog:years', [WpApiCatalog::class, 'action_years']);

	add_action('wp_ajax_apicatalog:makes', [WpApiCatalog::class, 'action_makes']);
	add_action('wp_ajax_nopriv_apicatalog:makes', [WpApiCatalog::class, 'action_makes']);

	add_action('wp_ajax_apicatalog:models', [WpApiCatalog::class, 'action_models']);
	add_action('wp_ajax_nopriv_apicatalog:models', [WpApiCatalog::class, 'action_models']);

	add_action('wp_ajax_apicatalog:checkModel', [WpApiCatalog::class, 'action_checkModel']);
	add_action('wp_ajax_nopriv_apicatalog:checkModel', [WpApiCatalog::class, 'action_checkModel']);
	
	add_action('wp_ajax_apicatalog:partsSearch', [WpApiCatalog::class, 'action_partsSearch']);
	add_action('wp_ajax_nopriv_apicatalog:partsSearch', [WpApiCatalog::class, 'action_partsSearch']);
	
	add_action('wp_ajax_apicatalog:partAttributes', [WpApiCatalog::class, 'action_partAttributes']);
	add_action('wp_ajax_nopriv_apicatalog:partAttributes', [WpApiCatalog::class, 'action_partAttributes']);
}

add_action('wp_enqueue_scripts', function () {
	wp_localize_script(
		'app',
		'ApiCatalog',
		array(
			'url' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('apicatalog-nonce')
		)
	);
}, 99);
