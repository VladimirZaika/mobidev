<?php
/**
 * ACF JSON
 */
function acf_json_save_point( $path ) {
    return get_stylesheet_directory() . '/acf-json';
}

add_filter( 'acf/settings/save_json', 'acf_json_save_point' );

/**
 * ACF options
 */
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page( [
        'page_title'    => 'Theme General Settings',
        'menu_title'    => 'Theme Settings',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ] );

	acf_add_options_sub_page( [
        'page_title'    => 'Styles and Scripts Settings',
        'menu_title'    => 'Styles and Scripts',
        'parent_slug'   => 'theme-general-settings',
    ] );

    acf_add_options_sub_page( [
        'page_title'    => 'Header Settings',
        'menu_title'    => 'Header',
        'parent_slug'   => 'theme-general-settings',
    ] );

    acf_add_options_sub_page( [
        'page_title'    => 'Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'theme-general-settings',
    ] );
}


/**
 * Dinamyc date
 */
if ( !is_admin() ) {
    add_filter( 'acf/load_value/name=copyright', function ( $value ) {
        return str_replace( '@year', date( 'Y' ), $value );
    } );
}

/**
 * Add Custom Field (Nav Menu)
 */
add_filter('acf/load_field/name=landing_nav_menu', function ($field) {
    $menus = wp_get_nav_menus();

    $choices = [];

    foreach ( $menus as $menu ) {
        $choices[$menu->term_id] = $menu->name;
    }

    $field['choices'] = $choices;

    return $field;
});
