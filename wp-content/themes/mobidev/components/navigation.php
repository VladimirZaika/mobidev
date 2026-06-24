<?php
$menu = ( isset($args['menu']) && !empty($args['menu']) ) ? $args['menu'] : '';

$menuArgs = [
    'theme_location'  => 'primary',
    'container'       => 'nav',
    'container_class' => 'menu-wrapper',
    'menu_class'      => 'menu-list',
    'orderby'         => 'menu_order',
    'order'           => 'ASC',
];

if ( !empty($menu) && function_exists('get_theme_location_by_menu_id') ):
    $menuLocation = get_theme_location_by_menu_id($menu);
    
    if ( $menuLocation ):
        $menuArgs['theme_location'] = $menuLocation;
    endif;
endif;

wp_nav_menu( $menuArgs );
?>