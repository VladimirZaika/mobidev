<?php

/**
 * Deregister jQuery
 */
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_admin() ) {
        wp_deregister_script( 'jquery' );
        wp_deregister_script( 'jquery-core' );
        wp_deregister_script( 'jquery-migrate' );
    }
}, 20 );

/**
 * Replace all macros entries in the string:
 */
function prepare_macros( $str ) {
	return str_replace(
		[
			'((',
			'))',
		],

		[
			'<span class="text-decor">',
			'</span>',
		],
		$str
	);
}

function allow_html_in_title( $title ) {
	$title = prepare_macros( $title );
	return $title;
}

add_filter( 'the_title', 'allow_html_in_title', 10, 2 );
add_filter( 'the_content', 'allow_html_in_title', 10, 2 );

function filter_title_parts( $title ) {
        $title['title'] = str_replace( '((', '', $title['title'] );
        $title['title'] = str_replace( '))', '', $title['title'] );
    return $title;
}

add_filter( 'document_title_parts', 'filter_title_parts' );

/**
 * Hex color to RGB
 */
function hexToRgb( $hex ) {
    $hex = ltrim( $hex, '#' );

    if (strlen($hex) === 3) {
        $r = hexdec( str_repeat($hex[0], 2) );
        $g = hexdec( str_repeat($hex[1], 2) );
        $b = hexdec( str_repeat($hex[2], 2) );
    } else {
        $r = hexdec( substr($hex, 0, 2) );
        $g = hexdec( substr($hex, 2, 2) );
        $b = hexdec( substr($hex, 4, 2) );
    }

    return "$r, $g, $b";
}

/**
 * Breadcrumbs output
 */
function yoast_breadcrumbs_output() {
    if ( function_exists( 'yoast_breadcrumb' ) ) {
        yoast_breadcrumb(
            '<div class="yoast-breadcrumbs">',
            '</div>'
        );
    }
}

/**
 * Calculate reading time for Posts
 */
function calculate_reading_time( $post_id ) {
    if ( !in_array( get_post_type( $post_id ), ['post'], true ) ) {
        return;
    }

    $content = get_post_field( 'post_content', $post_id );
    $wordCount = str_word_count( wp_strip_all_tags( $content ) );

    $wordsPerMinute = 180;
    $readingTime = ceil( $wordCount / $wordsPerMinute );

    update_field( 'reading_time', $readingTime, $post_id );
}

add_action( 'save_post', 'calculate_reading_time', 20 );

/**
 * Remove gutenberg editor from default posts
 */
add_filter( 'use_block_editor_for_post_type', function ( $use_block_editor, $post_type ) {
    if ( $post_type === 'post' ) {
        return false;
    }

    return $use_block_editor;
}, 10, 2 );

/**
 * View count for Post
 */
function update_post_view_count($post_id) {
    if ( !is_single() || is_admin() ) return;

    $postType = get_post_type($post_id);
    if ( !in_array($postType, ['post']) ) return;

    $cookieName = 'viewed_post_' . $post_id;

    if (!isset($_COOKIE[$cookieName])) {
        $views = get_field('view_count', $post_id);
        $views = ($views) ? $views + 1 : 1;

        update_field('view_count', $views, $post_id);

        setcookie($cookieName, '1', time() + 86400, '/');
    }
}

function track_post_views() {
    if (is_single()) {
        global $post;
        update_post_view_count($post->ID);
    }
}

add_action('wp_head', 'track_post_views');

/**
 * Remove link from logo on home page
 */
add_filter('get_custom_logo', function( $html ) {
    if ( is_front_page() || is_home() ) {
        $html = preg_replace( '/<a[^>]*?>/', '<span>', $html );
        $html = str_replace( '</a>', '</span>', $html );
    }

    return $html;
});

/**
 * Remove tag <p> from widgets
 */
add_filter( 'widget_block_content', function ( $content ) {
    $content = trim( $content );

    $content = preg_replace('/^\s*<p>\s*/i', '', $content  );

    $content = preg_replace( '/\s*<\/p>\s*$/i', '', $content );

    return $content;
}, 20 );

/**
 * Remove contain-intrinsic-size css property
 */
add_action( 'template_redirect', function() {
    if ( is_author() ) {
        global $wp_query;
        $wp_query->set_404();
        status_header( 404 );
        nocache_headers();
        include( get_404_template() );
        exit;
    }

    ob_start( function( $buffer ) {
        return preg_replace(
            '/<style>img:is\(\[sizes="auto" i\], \[sizes\^="auto," i\]\) \{ contain-intrinsic-size: [^}]+ \}<\/style>/',
            '',
            $buffer
        );
    });
});

add_action( 'shutdown', function() {
    if ( ob_get_level() ) {
        ob_end_flush();
    }
});

/**
 * Get theme location by menu id
 */
function get_theme_location_by_menu_id( $menu_id ) {
    $locations = get_nav_menu_locations();

    foreach ( $locations as $location => $assignedMenuId ) {
        if ( (int) $assignedMenuId === (int) $menu_id ) {
            return $location;
        }
    }

    return null;
}

/**
 * Get image mime type
 */
function get_image_mime_type($url) {
    $ext = strtolower( pathinfo($url, PATHINFO_EXTENSION) );

    return match ($ext) {
        'jpg', 'jpeg' => 'image/jpeg',
        'png'         => 'image/png',
        'webp'        => 'image/webp',
        'gif'         => 'image/gif',
        'svg'         => 'image/svg+xml',
        'avif'        => 'image/avif',
        default        => false,
    };
}

/**
 * Format number readable
 */
function format_number_readable($number) {
    return number_format($number, 0, '.', ',');
}

/**
 * SVG support
 */
function support_svg_upload_types( $mimes ) {
    $mimes['svg']  = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}

add_filter( 'upload_mimes', 'support_svg_upload_types' );
function fix_svg_mime_type( $data, $file, $filename, $mimes ) {
    $ext = current( explode( '.', $filename ) );
    
    if ( in_array( strtolower( $ext ), [ 'svg', 'svgz' ] ) ) {
        $data['ext']  = $ext;
        $data['type'] = 'image/svg+xml';
    }
    
    return $data;
}

add_filter( 'wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 4 );
function svg_admin_styles() {
    echo '<style type="text/css">
        .attachment-266x266, .thumbnail img[src$=".svg"], .media-icon img[src$=".svg"] {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}

add_action( 'admin_head', 'svg_admin_styles' );