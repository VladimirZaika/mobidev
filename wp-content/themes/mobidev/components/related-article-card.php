<?php
$postCard = ( isset($args['post']) && !empty($args['post']) ) ? $args['post'] : '';
$slide = ( isset($args['slide']) && $args['slide'] ) ? ' swiper-slide' : '';

if ( !empty($postCard) ): 
    $postId = $postCard->ID;
    $postLink = get_permalink($postId);
    $title = $postCard->post_title;

    $readingTime = get_field('reading_time', $postId);

    $viewCount = (int) get_field('view_count', $postId);
    $increaseCounter = get_field('increase_counter', $postId);

    if ( $increaseCounter ):
        $increasedCount = (int) get_field('view_count_upd', $postId);

        $viewCount += $increasedCount;
    endif;
?>
    <div class="related-article-card post-card<?= $slide; ?>">
        <?php if ( !empty($title) ): ?>
            <div class="title-wrapper">
                <span class="articles-wrapper-title"><?= esc_html($title); ?></span>
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
    </div>
<?php endif; ?>