<?php
$postCard = ( isset($args['post']) && !empty($args['post']) ) ? $args['post'] : '';
$index = ( isset($args['index']) && !empty($args['index']) ) ? $args['index'] : '';
$slide = ( isset($args['slide']) && $args['slide'] ) ? ' swiper-slide' : '';
$hideExcerpt = ( isset($args['hide_excerpt']) && $args['hide_excerpt'] ) ? true : false;

if ( !empty($postCard) ):
    $postId = $postCard->ID;
    $postLink = get_permalink($postId);

    $postThumbnailId = get_post_thumbnail_id($post->ID);

    if ( $postThumbnailId ):
        $img = [
            'url'   => wp_get_attachment_image_url( $postThumbnailId, 'full' ),
            'sizes' => [
                'medium_large' => wp_get_attachment_image_url( $postThumbnailId, 'medium_large' ),
            ],
            'alt'   => get_post_meta( $postThumbnailId, '_wp_attachment_image_alt', true ),
        ];
    endif;

    $viewCount = (int) get_field('view_count', $postId);
    $increaseCounter = get_field('increase_counter', $postId);

    if ( $increaseCounter ):
        $increasedCount = (int) get_field('view_count_upd', $postId);

        $viewCount += $increasedCount;
    endif;

    $title = $postCard->post_title; 
    $excerpt = $postCard->post_excerpt;
    $readingTime = get_field('reading_time', $postId); ?>
    
    <article class="card post-card<?= $slide; ?>" data-index="<?= $index; ?>">
        <?php if ( !empty($img) ): ?>
            <div class="img-wrapper">
                <?php get_template_part( 'components/image', null, ['img' => $img] ); ?>
            </div>
        <?php endif;

        if ( !empty($title) ): ?>
            <div class="title-wrapper">
                <h5><?= esc_html($title); ?></h5>
            </div>
        <?php endif;

        if ( !empty($postCard->post_excerpt) && !$hideExcerpt ): ?>
            <div class="content-wrapper post-card-content-wrapper">
                <p><?= esc_html($excerpt); ?></p>
            </div>
        <?php endif; ?>

        <div class="info-wrapper">
            <?php get_template_part( 'components/date', null, ['id' => $postId] ); ?>

            <div class="counts-wrapper">
                <?php if ( !empty($readingTime) ):
                    get_template_part( 'components/reading-time', null, ['reading_time' => $readingTime] );
                endif;

                if ( !empty($viewCount) ):
                    get_template_part( 'components/view-count', null, ['view_count' => $viewCount] );
                endif; ?>
            </div>
        </div>

        <div class="btn-wrapper">
            <?php
                if ( isset($postLink) && !empty($postLink) ):
                    $target = '_self';
                    $url = $postLink;
                    $descr = 'See more';
                
                    $linkArgs = [
                        'label' => $descr,
                        'link' => $url,
                        'target' => $target,
                    ];

                    get_template_part( 'components/link', null, $linkArgs );
                endif;
            ?>
        </div>
    </article>
<?php endif; ?>