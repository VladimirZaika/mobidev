<?php get_header();
$currentTerm = get_queried_object();

if ( $currentTerm && ! is_wp_error( $currentTerm ) ):
    $name = $currentTerm->name;
    $tax = $currentTerm->taxonomy ?? $name;
    $slug = $currentTerm->slug ?? $currentTerm->rewrite['slug'];
    $sectionClass = ( isset($slug) && !empty($slug) ) ? ' section-' . $slug . ' section-' . $tax : '';
    $firstPostObj = '';

    $eyebrow = get_field('eyebrow', $currentTerm);
    $customHeading = get_field('heading_custom', $currentTerm);
    $title = $customHeading ? get_field('custom_title', $currentTerm) : $name;
    $descr = $currentTerm->description;
    $relatedArticle = get_field('related_article', $currentTerm);
endif;

$sectionName = 'archive';
$blockId = wp_unique_id('block-');
$blockId_2 = wp_unique_id('grid-block-');
$index = 0;

yoast_breadcrumbs_output(); ?>

<section
    class="section-<?= $sectionName; ?>-top section-<?= $sectionName . $sectionClass; ?>"

    <?php if ( $blockId ): ?>
        id="<?php echo $blockId; ?>"
    <?php endif; ?>
>
    <div class="container <?= $sectionName; ?>-container">
        <?php if ( !empty($title) || !empty($descr) ): ?>
            <div class="text-wrapper">
                <?php if ( !empty($eyebrow) ):
                    get_template_part( 'components/eyebrow', null, ['text' => $eyebrow] );
                endif;
                
                if ( !empty($title) ) : ?>
                    <div class="title-wrapper">
                        <h1><?= prepare_macros( $title ); ?></h1>
                    </div>
                <?php endif;

                if ( !empty($descr) ) : ?>
                    <div class="content-wrapper">
                        <?= wpautop( $descr ); ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif;

        $currentTermId = $currentTerm->term_id;
        $terms = get_terms([
            'taxonomy' => $tax,
            'hide_empty' => true,
            'orderby'    => 'count',
            'order'      => 'DESC',
        ]);

        if ( !empty($terms) && !is_wp_error($terms) ) : ?>
            <div class="filter-wrapper">
                <ul class="filter-list">
                    <?php foreach ( $terms as $term ):
                        $isActive = $term->term_id === $currentTermId;
                        $name = $term->parent == 0 ? 'All' :  $term->name;
                        $filterBtnArgs = [
                                'label' => $name,
                                'link' => get_term_link($term),
                                'target' => '_self',
                                'type' => 'filter',
                                'custom_class' => $isActive ? 'active' : '',
                            ]; ?>

                        <li>
                            <?php get_template_part( 'components/button', null, $filterBtnArgs ); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
    </div>
</section>

<section
    class="section-<?= $sectionName; ?>-grid section-<?= $sectionName . $sectionClass; ?>"

    <?php if ( $blockId_2 ): ?>
        id="<?php echo $blockId_2; ?>"
    <?php endif; ?>
>
    <div class="container <?= $sectionName; ?>-container">
        <?php if ( have_posts() ): ?>
            <div class="title-wrapper grid-card-title-wrapper">
                <?php if ( $currentTerm->parent == 0 ): ?>
                    <h2><?php _e('All articles', 'mobidev'); ?></h2>
                <?php else: ?>
                    <h2><?= esc_html( $currentTerm->name ) . ' articles'; ?></h2>
                <?php endif; ?>
            </div>

            <div class="post-cards-wrapper">
                <?php while ( have_posts() ) : the_post();
                    $postObj = get_post();
                    $index++;

                        get_template_part( 'components/post-card', null, [ 'post' => $postObj, 'index' => $index ] );
                endwhile; ?>
            </div>

            <div class="btn-wrapper load-more-btn-wrapper">
                <?php
                    $btnArgs = [
                        'label' => 'Show more',
                        'link' => '#',
                        'target' => '_self',
                        'type' => 'dark',
                        'preloader' => true,
                    ];

                    get_template_part( 'components/button', null, $btnArgs );
                ?>
            </div>

        <?php else:
            if ( empty($firstPostObj) ): ?>
                <p><?php _e( 'Posts Not Found.', 'mobidev' ); ?></p>
            <?php endif;
        endif; ?>
    </div>
</section>

<?php
    if ( is_active_sidebar('section-sidebar') ):
        dynamic_sidebar( 'section-sidebar' );
    endif;

    get_footer();
?>
