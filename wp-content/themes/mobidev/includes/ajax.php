<?php
/**
 * Load more posts.
 */
function load_more_posts() {
    $paged        = intval( $_POST['paged'] ?? 1 );
    $termId       = intval( $_POST['id'] ?? 0 );
    $taxonomy     = sanitize_text_field( $_POST['taxonomy'] ?? '' );
    $postType     = sanitize_text_field( $_POST['post_type'] ?? 'post' );
    $postsPerPage = intval( get_option( 'posts_per_page' ) );

    if ( !$termId && !$taxonomy && !$postType ) {
        wp_send_json_error('Not enough data');
    }

    $args = [
        'post_type'      => $postType,
        'post_status'    => 'publish',
        'posts_per_page' => $postsPerPage,
        'paged'          => $paged,
    ];

    if ( $termId || $taxonomy ) {
        $args['tax_query'][] = [
            'field'           => 'term_id',
            'terms'           => $termId,
            'taxonomy'        => $taxonomy,
            'include_children' => true,
        ];
    }

    $query = new WP_Query($args);

    ob_start();

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $postObj = get_post();

            get_template_part( 'components/post-card', null, ['post' => $postObj] );
        }
    }

    $html = ob_get_clean();
    $hasMore = $query->found_posts > ( $paged * $postsPerPage );
    
    wp_send_json_success( [
        'html' => $html,
        'has_more' => $hasMore,
    ] );

    die();
}

add_action( 'wp_ajax_load_more_posts', 'load_more_posts' );
add_action( 'wp_ajax_nopriv_load_more_posts', 'load_more_posts' );