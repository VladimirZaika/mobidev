<?php
/**
 * mobidev functions
 *
 * @package mobidev
 */

if ( !defined( 'ABSPATH' ) ) {
	exit;
}

$includes = [
	'includes/custom-post-types.php',  // Register custom post types
	'includes/custom-taxonomies.php',  // Register custom taxonomies
	'includes/theme-default.php',      // Set up theme defaults and registers support for various WordPress feaures.
	'includes/custom-menu.php',        // Register menu
	'includes/widgets.php',            // Register widget area
	'includes/scripts.php',            // Enqueue scripts and styles
	'includes/custom-functions.php',   // Custom functions
    'includes/custom-ajax.php',        // Load more
    'includes/shortcodes.php',        // Shortcodes
];

foreach ( $includes as $file ) {
	locate_template( $file, true, true );
}

add_action( 'after_setup_theme', 'include_plugin_settings' );
function include_plugin_settings() {
	if ( function_exists( 'acf_add_local_field_group' ) ) {
		locate_template( 'includes/plugin-settings/acf.php', true, true );
	}
}