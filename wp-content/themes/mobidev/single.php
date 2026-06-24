<?php /**
 * Post: Blog
*
* This is the template that displays the single Blog post
*/

get_header();
$id = get_the_ID();
$sectionName = 'single-blog';
$sectionName_2 = 'related-articles';
$blockId = wp_unique_id('block-');

$customHeading = get_field('heading_custom', $id);
$title = $customHeading ? get_field('custom_title', $id) : get_the_title();
$readingTime = get_field('reading_time', $id);

$postThumbnailId = get_post_thumbnail_id($id);

$viewCount = (int) get_field('view_count', $id);
$increaseCounter = get_field('increase_counter', $id);

$audioLink = get_field('audio', $id);
$audioTitle = get_field('audio_title', $id);

$floatMsgArgs = [
    'text' => get_field('blog_post_float_msg_text', 'options'),
    'image' => get_field('blog_post_float_msg_icon', 'options'),
    'custom_class' => 'blog-post-float-msg',
];

$audioArgs = [
    'audio' => $audioLink,
    'audio_title' => $audioTitle,
];

if ( $increaseCounter ):
    $increasedCount = (int) get_field('view_count_upd', $id);

    $viewCount += $increasedCount;
endif;

if ( $postThumbnailId ):
    $img = [
        'url'   => wp_get_attachment_image_url( $postThumbnailId, 'full' ),
        'sizes' => [
            'medium_large' => wp_get_attachment_image_url( $postThumbnailId, 'medium_large' ),
        ],
        'alt'   => get_post_meta( $postThumbnailId, '_wp_attachment_image_alt', true ),
    ];
endif;

yoast_breadcrumbs_output(); ?>

<section
    class="section-single section-<?php echo $sectionName; ?>"

    <?php if ( $blockId ): ?>
        id="<?php echo $blockId; ?>"
    <?php endif; ?>
>
    <div class="container <?php echo $sectionName; ?>-container">
        <div class="post-wrapper">
            <?php if ( !empty($title) ): ?>
                <div class="title-wrapper">
                    <h1><?= prepare_macros( $title ); ?></h1>
                </div>
            <?php endif; ?>

            <div class="info-wrapper">
                <?php get_template_part( 'components/date', null, ['id' => $id] ); ?>

                <div class="counts-wrapper">
                    <?php if ( !empty($readingTime) ):
                        get_template_part( 'components/reading-time', null, ['reading_time' => $readingTime] );
                    endif;

                    if ( !empty($viewCount) ):
                        get_template_part( 'components/view-count', null, ['view_count' => $viewCount] );
                    endif; ?>
                </div>
            </div>

            <?php if ( !empty($img) ): ?>
                <div class="img-wrapper">
                    <?php get_template_part( 'components/image', null, ['img' => $img] ); ?>
                </div>
            <?php endif;

            get_template_part( 'components/audio', null, $audioArgs ); ?>

            <div class="content-wrapper">
                <?php get_template_part( 'components/loop' ); ?>
            </div>

            <?php
                get_template_part( 'components/share-links');
                get_template_part( 'components/float-message', null, $floatMsgArgs );
            ?>
        </div>
    </div>
</section>

<?php if ( is_active_sidebar('section-sidebar') ):
    dynamic_sidebar( 'section-sidebar' );
endif;

get_footer();