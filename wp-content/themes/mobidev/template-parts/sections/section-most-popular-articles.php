<?php
$title = ( isset($args['title']) && !empty($args['title']) ) ? $args['title'] : '';
$postType = ( isset($args['post']) && !empty($args['post']) ) ? $args['post'] : 'newsroom';
$postCount = ( isset($args['count']) && !empty($args['count']) ) ? $args['count'] : 3;

$rawQuery = new WP_Query( [
    'post_type'      => $postType,
    'posts_per_page' => -1,
    'meta_query'     => [
        [
            'key'     => 'view_count',
            'compare' => 'EXISTS',
            'type'    => 'NUMERIC',
        ],
        [
            'key'     => 'view_count_upd',
            'compare' => 'EXISTS',
            'type'    => 'NUMERIC',
        ],
    ],
    'post_status'    => 'publish',
] );

$posts = $rawQuery->posts;

usort( $posts, function($a, $b) {
    $a_count  = (int) get_field('view_count', $a->ID);
    $b_count  = (int) get_field('view_count', $b->ID);

    $a_additional = get_field('increase_counter', $a->ID) ? (int) get_field('view_count_upd', $a->ID) : 0;
    $b_additional = get_field('increase_counter', $b->ID) ? (int) get_field('view_count_upd', $b->ID) : 0;

    $a_total = $a_count + $a_additional;
    $b_total = $b_count + $b_additional;

    return $b_total <=> $a_total;
} );

$popularArticles = array_slice( $posts, 0, $postCount );

if ( !empty($popularArticles) ): ?>
    <div class="related-articles-wrapper">
        <?php if ( !empty($title) ): ?>
            <div class="title-wrapper">
                <span class="h5"><?= prepare_macros( $title ); ?></span>
            </div>
        <?php endif; ?>

        <div class="related-articles swiper">
            <div class="swiper-wrapper">
                <?php foreach( $popularArticles as $article ):
                    if ( isset($article) && !empty($article) ):
                        get_template_part( 'components/related-article-card', null, ['post' => $article, 'slide' => true] );
                    endif;
                endforeach; ?>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
<?php endif; ?>