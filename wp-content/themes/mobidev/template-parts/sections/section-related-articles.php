<?php
$id = get_the_ID();

$titleTag = ( isset($args['title_tag']) && !empty($args['title_tag']) ) ? $args['title_tag'] : 'h5';
$title = ( isset($args['title']) && !empty($args['title']) ) ? $args['title'] : '';
$fullCard = ( isset($args['full_card']) && !empty($args['full_card']) ) ? true : false;
$sliderDesk = ( isset($args['desk_slider']) && !empty($args['desk_slider']) ) ? ' data-desk-slider="1"' : '';
$wrapper = ( isset($args['wrapper']) && !empty($args['wrapper']) ) ? true : false;
$hideExcerpt = ( isset($args['hide_excerpt']) && $args['hide_excerpt'] ) ? true : false;

$relatedArticles = get_field('related_articles', $id);

if ( !empty($relatedArticles) ):
    if ( $wrapper ): ?>
        <section class="section section-related-articles">
            <div class="container related-articles-container"> 
    <?php endif; ?>
        <div class="related-articles-wrapper">
            <?php if ( !empty($title) ): ?>
                <div class="title-wrapper">
                    <?= '<' . $titleTag . '>' . prepare_macros( $title ) . '</' . $titleTag . '>'; ?>
                </div>
            <?php endif; ?>

            <div class="related-articles swiper"<?= $sliderDesk; ?>>
                <div class="swiper-wrapper">
                    <?php foreach( $relatedArticles as $article ):
                        if ( isset($article) && !empty($article) ):
                            if ( !$fullCard ):
                                get_template_part( 'components/related-article-card', null, ['post' => $article, 'slide' => true,] );
                            else:
                                get_template_part( 'components/post-card', null, ['post' => $article, 'slide' => true, 'hide_excerpt' => $hideExcerpt,] );
                            endif;
                        endif;
                    endforeach; ?>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    <?php if ( $wrapper ): ?>
            </div>
        </section> 
    <?php endif; ?>
<?php endif; ?>