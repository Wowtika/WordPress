<?php
require_once(TEMPLATEPATH . '/inc/tArr.php');
require_once(TEMPLATEPATH . '/inc/tCurl.php');

require_once(TEMPLATEPATH . '/ApiCatalog/ApiCatalog.php');
require_once(TEMPLATEPATH . '/ApiCatalog/WpApiCatalog.php');

require_once(TEMPLATEPATH . '/ApiCatalog/init.php');

add_action('wp_enqueue_scripts', function(){
	$theme_uri = get_template_directory_uri();

	wp_enqueue_style('main', ($theme_uri . '/assets/css/main.css?v'.filemtime(TEMPLATEPATH.'/assets/css/main.css')), [], '');
	wp_enqueue_style('new', ($theme_uri . '/assets/css/style-new.css?v'.filemtime(TEMPLATEPATH.'/assets/css/style-new.css')), [], '');

	wp_enqueue_script('gsap', $theme_uri . '/assets/js/gsap/gsap.min.js', array('jquery'), '', true);
	wp_enqueue_script('ScrollSmoother', $theme_uri . '/assets/js/gsap/ScrollSmoother.min.js', array('jquery'), '', true);
	wp_enqueue_script('ScrollTrigger', $theme_uri . '/assets/js/gsap/ScrollTrigger.min.js', array('jquery'), '', true);
	wp_enqueue_script('Draggable', $theme_uri . '/assets/js/gsap/Draggable.min.js', array('jquery'), '', true);
	wp_enqueue_script('InertiaPlugin', $theme_uri . '/assets/js/gsap/InertiaPlugin.min.js', array('jquery'), '', true);
	wp_enqueue_script('app', $theme_uri . '/assets/js/app.js?v'.filemtime(TEMPLATEPATH.'/assets/js/app.js'), array('jquery'), '', true);

	// if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	// 	wp_enqueue_script( 'comment-reply' );
	// }
});

add_theme_support( 'post-thumbnails' );
// add_theme_support( 'menus' );
add_theme_support( 'title-tag' );

function tBreadcrumbs( $echo = true ) {
	$crumbs = '';
	$crumbsArr = array();
	
	$formats = array(
		'home'=>'<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
		<a href="%s" itemprop="item">
		<span itemprop="name">Главная</span>
		</a>
		</span>',
		'link'=>'<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
		<a href="%s" itemprop="item">
		<span itemprop="name">%s</span>
		</a>
		</span>',
		'item'=>'<span>%s</span>',
		'last'=>'<span class="current">%s</span>',
		'sep'=>PHP_EOL . '<span class="navigation-pipe">/</span>' . PHP_EOL
	);
	
	function termRec( $curTerm = null, $addCur = true ) {
		$result = array();
		if( $curTerm ) {
			if( $parent = $curTerm->parent ) {
				$termParent = get_term_by( 'id', $parent, $curTerm->taxonomy );
				if( $termParent ) {
					$parents = termRec( $termParent );
					$result = $parents + $result;
				}
			}
			
			if( $addCur ) {
				$curTerm->link = get_term_link( $curTerm->term_id, $curTerm->taxonomy );
				$curTerm->anchor = $curTerm->name;
				$result[$curTerm->term_id] = $curTerm;
			}
		}
		
		return $result;
	}
	function pageRec( $curPage = null, $addCur = true ) {
		$result = array();
		if( $curPage ) {
			if( !$parent = $curPage->post_parent ) {
				$parent = get_post_meta($curPage->ID, 'page_parent', true);
				if( is_array($parent) ) {
					$parent = $parent[0];
				}
			}
			if( $parent ) {
				if( $pageParent = get_post( $parent ) ) {
					$parents = pageRec( $pageParent );
					$result = $parents + $result;
				}
			}
			
			if( $addCur ) {
				$curPage->link = get_permalink( $curPage->ID );
				$curPage->anchor = $curPage->post_title;
				$result[$curPage->ID] = $curPage;
			}
		}
		
		return $result;
	}
	function buildCrumbs( $crumbs = null, $formats = array() ) {
		$result = array();
		
		$result[] = sprintf($formats['home'], get_bloginfo('url'));
		$count = count($crumbs);
		foreach( (array) $crumbs as $num=>$crumb ) {
			if( is_array($crumb) ) $crumb = (object) $crumb;
			$last = $num == $count - 1;
			$link = ( !empty($crumb->link) ) ? $crumb->link : null;
			$anchor = ( !empty($crumb->anchor) ) ? $crumb->anchor : null;
			
			if( $last ) {
				$result[] = sprintf($formats['last'], $anchor);
			} elseif( $link ) {
				$result[] = sprintf($formats['link'], $link, $anchor);
			} else {
				$result[] = sprintf($formats['item'], $anchor);
			}
		}
		
		return $result;
	}
	
	$object = get_queried_object();
	if( is_singular() ) {
		$type = $object->post_type;
		$object->anchor = $object->post_title;
		switch( $type ) {
			case 'product':
			$terms = get_the_terms($object->ID, 'catalog');
			$term = array_shift($terms);
			
			$crumbsArr = array_merge( $crumbsArr, termRec( $term ) );
			break;
			case 'post':
			$terms = get_the_terms($object->ID, 'category');
			$term = array_shift($terms);
			
			$crumbsArr = array_merge( $crumbsArr, termRec( $term ) );
			break;
			case 'page':
			$crumbsArr = array_merge( $crumbsArr, pageRec( $object, false ) );
			break;
			case 'attachment':
			$crumbsArr = array_merge( $crumbsArr, pageRec( $object, false ) );
			break;
			default:
			$crumbsArr = array_merge( $crumbsArr, pageRec( $object, false ) );
			break;
		}
		$crumbsArr[] = $object;
	} elseif( is_tax() || is_category() || is_tag() ) {
		$object->anchor = $object->name;
		$crumbsArr = termRec( $object, false );
		$crumbsArr[] = $object;
	} elseif( is_search() ) {
		$crumbsArr[] = array('anchor'=>'Результат поиска');
	} elseif( is_404() ) {
		$crumbsArr[] = array('anchor'=>'Страница не найдена');
	}
	
	$crumbsArr = buildCrumbs( $crumbsArr, $formats );
	
	$crumbs = '<div id="tBreadrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">';
	$crumbs .= implode($formats['sep'], $crumbsArr);
	$crumbs .= '</div>';
	
	if( $echo ) {
		echo $crumbs;
	} else {
		return $crumbs;
	}
}

function kama_excerpt( $args = '' ){
	global $post;
	
	$default = array(
		'maxchar'     => 350, // количество символов.
		'text'        => '',  // какой текст обрезать (по умолчанию post_excerpt, если нет post_content.
		                      // Если есть тег <!--more-->, то maxchar игнорируется и берется все до <!--more--> вместе с HTML
		'save_format' => false, // Сохранять перенос строк или нет. Если в параметр указать теги, то они НЕ будут вырезаться: пр. '<strong><a>'
		'more_text'   => 'Читать дальше...', // текст ссылки читать дальше
		'echo'        => true, // выводить на экран или возвращать (return) для обработки.
	);
	
	if( is_array($args) )
		$rgs = $args;
	else
		parse_str( $args, $rgs );
	
	$args = array_merge( $default, $rgs );
	
	extract( $args );
	
	if( ! $text ){
		$text = $post->post_excerpt ? $post->post_excerpt : $post->post_content;
		
		$text = preg_replace ('~\[[^\]]+\]~', '', $text ); // убираем шоткоды, например:[singlepic id=3]
	    // $text = strip_shortcodes( $text ); // или можно так обрезать шоткоды, так будет вырезан шоткод и конструкция текста внутри него
	    // и только те шоткоды которые зарегистрированы в WordPress. И эта операция быстрая, но она в десятки раз дольше предыдущей 
	    // (хотя там очень маленькие цифры в пределах одной секунды на 50000 повторений)
		
		// для тега <!--more-->
		if( ! $post->post_excerpt && strpos( $post->post_content, '<!--more-->') ){
			preg_match ('~(.*)<!--more-->~s', $text, $match );
			$text = trim( $match[1] );
			$text = str_replace("\r", '', $text );
			$text = preg_replace( "~\n\n+~s", "</p><p>", $text );
			
			$more_text = $more_text ? '<a class="kexc_moretext" href="'. get_permalink( $post->ID ) .'#more-'. $post->ID .'">'. $more_text .'</a>' : '';
			
			$text = '<p>'. str_replace( "\n", '<br />', $text ) .' '. $more_text .'</p>';
			
			if( $echo )
				return print $text;
			
			return $text;
		}
		elseif( ! $post->post_excerpt )
			$text = strip_tags( $text, $save_format );
	}	
	
	// Обрезаем
	if ( mb_strlen( $text ) > $maxchar ){
		$text = mb_substr( $text, 0, $maxchar );
		$text = preg_replace('@(.*)\s[^\s]*$@s', '\\1 ...', $text ); // убираем последнее слово, оно 99% неполное
	}
	
	// Сохраняем переносы строк. Упрощенный аналог wpautop()
	if( $save_format ){
		$text = str_replace("\r", '', $text );
		$text = preg_replace("~\n\n+~", "</p><p>", $text );
		$text = "<p>". str_replace ("\n", "<br />", trim( $text ) ) ."</p>";
	}
	
	//$out = preg_replace('@\*[a-z0-9-_]{0,15}\*@', '', $out); // удалить *some_name-1* - фильтр сммайлов
	
	if( $echo ) return print $text;
	
	return $text;
}

function russian_date( $tdate = '' ) {
	if ( substr_count($tdate , '---') > 0 ) return str_replace('---', '', $tdate);

	$treplace = array (
		"Январь" => "января",
		"Февраль" => "февраля",
		"Март" => "марта",
		"Апрель" => "апреля",
		"Май" => "мая",
		"Июнь" => "июня",
		"Июль" => "июля",
		"Август" => "августа",
		"Сентябрь" => "сентября",
		"Октябрь" => "октября",
		"Ноябрь" => "ноября",
		"Декабрь" => "декабря",

		"January" => "января",
		"February" => "февраля",
		"March" => "марта",
		"April" => "апреля",
		"May" => "мая",
		"June" => "июня",
		"July" => "июля",
		"August" => "августа",
		"September" => "сентября",
		"October" => "октября",
		"November" => "ноября",
		"December" => "декабря", 

		"Sunday" => "воскресенье",
		"Monday" => "понедельник",
		"Tuesday" => "вторник",
		"Wednesday" => "среда",
		"Thursday" => "четверг",
		"Friday" => "пятница",
		"Saturday" => "суббота",

		"Sun" => "вос.",
		"Mon" => "пон.",
		"Tue" => "вт.",
		"Wed" => "ср.",
		"Thu" => "чет.",
		"Fri" => "пят.",
		"Sat" => "суб.",

		"th" => "",
		"st" => "",
		"nd" => "",
		"rd" => ""
	);
	return strtr($tdate, $treplace);
}

add_filter('get_post_time', 'russian_date');
add_filter('get_post_modified_time', 'russian_date');
add_filter('get_the_modified_time', 'russian_date');
add_filter('get_the_modified_date', 'russian_date');
add_filter('get_comment_date', 'russian_date');
add_filter('get_comment_time', 'russian_date');
add_filter('get_the_date', 'russian_date');
add_filter('get_the_time', 'russian_date');

remove_action( 'wp_head', 'wp_shortlink_wp_head');
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action ('wp_head', 'wp_generator');
remove_action('wp_head','feed_links', 2);
remove_action('wp_head','feed_links_extra', 3);
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );

function h1_title() {
	global $wp_query;
	if (is_singular()) {
		if ($h1=get_field('h1')) 
			echo $h1;
		else 
			the_title();
	} 	
	elseif (is_archive()) {
		$object = get_queried_object();
		if ($h1=get_field('h1', "{$object->taxonomy}_{$object->term_id}")) 
			echo $h1; 
		elseif (is_day())
			printf( __( 'Daily Archives: %s', 'psr' ), get_the_date() );
		elseif (is_month())
			printf( __( 'Monthly Archives: %s', 'psr' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'psr' ) ) );
		elseif (is_year())
			printf( __( 'Yearly Archives: %s', 'psr' ), get_the_date( _x( 'Y', 'yearly archives date format', 'psr' ) ) );
		else
			echo $object->name;
	}
	elseif (is_search())
		printf( __( 'Результат поиска для: %s' ), get_search_query() );
	elseif (is_404()) 
		echo 'Страница не найдена';
}

add_action( 'template_redirect', 'author_archive_redirect' );
add_filter( 'author_link', 'remove_author_pages_link' );

function author_archive_redirect() {
	if( is_author() ) {
		wp_redirect( home_url(), 301 );
		exit;
	}
}

function remove_author_pages_link( $content ) {
	return home_url();
}

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title'    => 'General information',
		'menu_title'    => 'Informations',
		'menu_slug'     => 'informations',
		'position'      => 2,
		'icon_url'      => 'dashicons-info-outline',
		'update_button'     => __('Save', 'acf'),
		'updated_message'   => __('Saved', 'acf'),
	));
	acf_add_options_page(array(
        'page_title'    => 'Options',
        'menu_title'    => 'Options',
        'menu_slug'     => 'theme-general-option',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

	acf_add_options_sub_page(array(
        'page_title'    => 'Menu',
        'menu_title'    => 'Menu',
        'parent_slug'   => 'theme-general-option',
    ));

	acf_add_options_sub_page(array(
        'page_title'    => 'Marketplaces',
        'menu_title'    => 'Marketplaces',
        'parent_slug'   => 'theme-general-option',
    ));

	acf_add_options_sub_page(array(
        'page_title'    => 'Translate',
        'menu_title'    => 'Translate',
        'parent_slug'   => 'theme-general-option',
    ));

	acf_add_options_sub_page(array(
        'page_title'    => 'Regions',
        'menu_title'    => 'Regions',
        'parent_slug'   => 'theme-general-option',
    ));
}