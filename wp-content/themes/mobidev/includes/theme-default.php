<?php
add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain( 'kison', get_theme_file_uri( 'languages' ) );

		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			]
		);

		add_theme_support(
			'post-formats',
			[
				'aside',
				'image',
				'video',
				'quote',
				'link',
			]
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			[
				'height'      => 200,
				'width'       => 50,
				'flex-width'  => true,
				'flex-height' => true,
			]
		);

		register_nav_menus(
			[
				'primary' => __( 'Primary Menu', 'kison' ),
			]
		);
	}
);

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
add_action(
	'after_setup_theme',
	function () {
		if ( ! isset( $GLOBALS['content_width'] ) ) {
			$GLOBALS['content_width'] = apply_filters( 'kison_content_width', 1236 );
		}
	},
	0
);

function kison_customize_register($wp_customize) {
    // Primary color
    $wp_customize->add_setting('primary_color', [
        'default'   => '#305CDE',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', [
        'label'    => __('Primary Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'primary_color',
    ]));

    // Secondary color
    $wp_customize->add_setting('secondary_color', [
        'default'   => '#88A0B8',
        'transport' => 'refresh',
    ]);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'secondary_color', [
        'label'    => __('Secondary Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'secondary_color',
    ]));

    // Text color
    $wp_customize->add_setting('text_color', [
        'default'   => '#ffffff',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'text_color', [
        'label'    => __('Text Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'text_color',
    ]));

    // Body color
    $wp_customize->add_setting('body_color', [
        'default'   => '#1e1e1e',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'body_color', [
        'label'    => __('Body Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'body_color',
    ]));

    // Header & Footer color
    $wp_customize->add_setting('header_footer_color', [
        'default'   => '#303943',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_footer_color', [
        'label'    => __('Header & Footer Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'body_color',
    ]));

    // Error color
    $wp_customize->add_setting('error_color', [
        'default'   => '#C64D34',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'error_color', [
        'label'    => __('Error Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'error_color',
    ]));

    // Success color
    $wp_customize->add_setting('success_color', [
        'default'   => '#61FF87',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'success_color', [
        'label'    => __('Success Color', 'kison'),
        'section'  => 'colors',
        'settings' => 'success_color',
    ]));

    // Optional color #1
    $wp_customize->add_setting('optional_color_1', [
        'default'   => '#cbcbcb',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'optional_color_1', [
        'label'    => __('Optional Color #1', 'kison'),
        'section'  => 'colors',
        'settings' => 'optional_color_1',
    ]));

    // Font controls
    $wp_customize->add_section('brand_fonts', [
        'title'    => __('Fonts (Child Theme)', 'mobidev'),
        'priority' => 30,
    ]);

    $wp_customize->add_setting('body_font', [
        'default'   => 'Inter, sans-serif',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control('body_font', [
        'label'    => __('Body Font', 'mobidev'),
        'section'  => 'brand_fonts',
        'settings' => 'body_font',
        'type'     => 'select',
        'choices'  => [
            'Inter, sans-serif'      => 'Inter',
            'Roboto, sans-serif'     => 'Roboto',
            'Raleway, sans-serif'    => 'Raleway',
        ],
    ]);

    $wp_customize->add_setting('heading_font', [
        'default'   => 'Roboto, sans-serif',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control('heading_font', [
        'label'    => __('Heading Font', 'mobidev'),
        'section'  => 'brand_fonts',
        'settings' => 'heading_font',
        'type'     => 'select',
        'choices'  => [
            'Inter, sans-serif'      => 'Inter',
            'Roboto, sans-serif'     => 'Roboto',
            'Raleway, sans-serif'    => 'Raleway',
        ],
    ]);
}

add_action('customize_register', 'kison_customize_register');