<?php
function dynamic_styles() {
    global $wp_query;

    $id = get_queried_object_id();
    $audio = get_field( 'audio', $id );

    $notFoundPageVer = filemtime( get_theme_file_path('dist/css/template/not-found/not-found.css') );
    $tmplContainerVer = filemtime( get_theme_file_path('dist/css/template/template-container/template-container.css') );

    $plyrStyleVer = filemtime( get_theme_file_path('libs/plyr/library.3.7.8/plyr.css') );
    $plyrCustomStyleVer = filemtime( get_theme_file_path('libs/plyr/audio.css') );
    $plyrScriptVer = filemtime( get_theme_file_path('libs/plyr/library.3.7.8/plyr.polyfilled.js') );
    $plyrCustomScriptVer = filemtime( get_theme_file_path('libs/plyr/audio.js') );
    
    $styleVersion = filemtime( get_theme_file_path('dist/css/main.css') );
    $scriptVersion = filemtime( get_theme_file_path('dist/js/main.js') );

    $singleBlogStyleVer = filemtime( get_theme_file_path('dist/css/template/single-blog/single-blog.css') );
    $archiveBlogStyleVer = filemtime( get_theme_file_path('dist/css/template/archive-blog/archive-blog.css') );

    $popupTimer = get_field('popup_timer', 'options') ? intval(get_field('popup_timer', 'options')) : 3;
    $postsPerPage = intval( get_option( 'posts_per_page' ) ) ?: 3;

    $wpData = [
        'ajaxUrl'      => admin_url('admin-ajax.php'),
        'id'           => $id,
        'taxonomy'     => get_queried_object()->taxonomy ?? '',
        'postType'     => get_post_type() ?? 'post',
        'maxPosts'     => $wp_query->found_posts,
        'popupTimer'   => $popupTimer,
        'postsPerPage' => $postsPerPage,
    ];

	wp_enqueue_style('mobidev-variables', get_stylesheet_uri());
	wp_enqueue_style( 'mobidev-styles', get_theme_file_uri( 'dist/css/main.css' ), [], $styleVersion  );

    wp_enqueue_script( 'mobidev-scripts', get_theme_file_uri( 'dist/js/main.js' ), [], $scriptVersion, true );

    if ( is_page_template( 'templates/template-container.php' ) ) {
        wp_enqueue_style( 'tmpl-container-style', get_theme_file_uri( 'dist/css/template/template-container/template-container.css' ), [], $tmplContainerVer );
    }

    if ( is_404() ) {
        wp_enqueue_style( 'not-found-styles', get_theme_file_uri( 'dist/css/template/not-found/not-found.css' ), [], $notFoundPageVer );
    }

    if ( $audio ) {
			wp_enqueue_style( 'plyr-css', get_template_directory_uri() . '/libs/plyr/library.3.7.8/plyr.css', [], $plyrStyleVer );
            wp_enqueue_style( 'plyr-custom-css', get_stylesheet_directory_uri() . '/libs/plyr/audio.css', ['plyr-css'], $plyrCustomStyleVer );

            wp_enqueue_script( 'plyr-js', get_template_directory_uri() . '/libs/plyr/library.3.7.8/plyr.polyfilled.js', [], $plyrScriptVer, true );
			wp_enqueue_script( 'plyr-custom-js', get_stylesheet_directory_uri() . '/libs/plyr/audio.js', ['plyr-js'], $plyrCustomScriptVer, true );
    }

    if ( is_singular('post') ) {
        wp_enqueue_style( 'single-blog-styles', get_theme_file_uri( 'dist/css/template/single-blog/single-blog.css' ), [], $singleBlogStyleVer  );
    }

    if ( is_archive() && get_post_type() === 'post' ) {
        wp_enqueue_style( 'blog-archive-style', get_theme_file_uri( 'dist/css/template/archive-blog/archive-blog.css' ), [], $archiveBlogStyleVer );
    }

    wp_localize_script( 'mobidev-scripts', 'wpData', $wpData );
    
    $primaryColor = get_theme_mod('primary_color', '#305CDE');
    $secondaryColor = get_theme_mod('secondary_color', '#88A0B8');
    $textColor = get_theme_mod('text_color', '#ffffff');
    $bodyColor = get_theme_mod('body_color', '#1e1e1e');
    $errorColor = get_theme_mod('error_color', '#C64D34');
    $successColor = get_theme_mod('success_color', '#61FF87');
    $optionalColor1 = get_theme_mod('optional_color_1', '#cbcbcb');
    $bodyFont = get_theme_mod('body_font', 'Inter, sans-serif');
    $headingFont = get_theme_mod('heading_font', 'Roboto, sans-serif');
    $headerFooterColor = get_theme_mod('header_footer_color', '#303943');

    $customCss = "
        :root {
            --primary-color: $primaryColor;
            --primary-color-80: rgba(" . hexToRgb($primaryColor) . ", 0.8);
            --primary-color-70: rgba(" . hexToRgb($primaryColor) . ", 0.7);
            --primary-color-54: rgba(" . hexToRgb($primaryColor) . ", 0.54);

            --secondary-color: $secondaryColor;
            --secondary-color-60: rgba(" . hexToRgb($secondaryColor) . ", 0.6);
            --secondary-color-50: rgba(" . hexToRgb($secondaryColor) . ", 0.5);
            --secondary-color-45: rgba(" . hexToRgb($secondaryColor) . ", 0.45);
            --secondary-color-35: rgba(" . hexToRgb($secondaryColor) . ", 0.35);
            --secondary-color-25: rgba(" . hexToRgb($secondaryColor) . ", 0.25);
            --secondary-color-15: rgba(" . hexToRgb($secondaryColor) . ", 0.15);

            --text-color: $textColor;
            --text-color-85: rgba(" . hexToRgb($textColor) . ", 0.85);
            --text-color-75: rgba(" . hexToRgb($textColor) . ", 0.75);
            --text-color-65: rgba(" . hexToRgb($textColor) . ", 0.65);
            --text-color-50: rgba(" . hexToRgb($textColor) . ", 0.5);
            --text-color-40: rgba(" . hexToRgb($textColor) . ", 0.4);
            --text-color-20: rgba(" . hexToRgb($textColor) . ", 0.20);
            --text-color-14: rgba(" . hexToRgb($textColor) . ", 0.14);

            --body-color: $bodyColor;
            --body-color-80: rgba(" . hexToRgb($bodyColor) . ", 0.8);
            --body-color-50: rgba(" . hexToRgb($bodyColor) . ", 0.5);
            --body-color-30: rgba(" . hexToRgb($bodyColor) . ", 0.3);
            --body-color-10: rgba(" . hexToRgb($bodyColor) . ", 0.1);
            --body-color-5: rgba(" . hexToRgb($bodyColor) . ", 0.05);

            --header-footer-color: $headerFooterColor;
            
            --error-color: $errorColor;

            --success-color: $successColor;
            
            --optional-color-1: $optionalColor1;
            

            --body-font: $bodyFont;
            --heading-font: $headingFont;
        }";

    wp_add_inline_style( 'mobidev-variables', $customCss );
};

add_action('wp_enqueue_scripts', 'dynamic_styles');