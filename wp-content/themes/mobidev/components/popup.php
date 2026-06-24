<?php
if ( session_status() === PHP_SESSION_NONE ):
    session_start();
endif;

if ( isset($_SESSION['popup_shown']) && $_SESSION['popup_shown'] === true ):
    return;
endif;

$options = ( isset($args['options']) && !empty($args['options']) ) ? true : false;
$btnClass = ( isset($args['btn_class']) && !empty($args['btn_class']) ) ? $args['btn_class'] : '';
$visible = ( isset($args['visible']) && !empty($args['visible']) ) ? 'visible' : 'hidden';
$popupStatus = ( isset($args['popup_status']) && !empty($args['popup_status']) && $args['popup_status'] === 'off' ) ? 'popup-overlay-transparent' : 'popup-overlay';
$popupOverlayClass = $popupStatus . ' ' . $visible;

$title = ( isset($args['title']) && !empty($args['title']) ) ? $args['title'] : '';
$text = ( isset($args['text']) && !empty($args['text']) ) ? $args['text'] : '';

$img = ( isset($args['image']) && !empty($args['image']) ) ? $args['image'] : '';
$mobSize = ( isset($args['mob_size']) && !empty($args['mob_size']) ) ? $args['mob_size'] : '';

$btn = ( isset($args['btn']) && !empty($args['btn']) ) ? $args['btn'] : '';

$bgc = ( isset($args['bgc']) && !empty($args['bgc']) ) ? 'background-color: ' . $args['bgc'] . ';' : false;
$bgImg = ( isset($args['image_desk']) && !empty($args['image_desk']) ) ? $args['image_desk'] : '';
$bgImgMob = ( isset($args['image_mob']) && !empty($args['image_mob']) ) ? $args['image_mob'] : '';

if ( $options ):
    $title = get_field('popup_title', 'options');
    $text = get_field('popup_text', 'options');

    $img = get_field('popup_img', 'options');

    $btn = get_field('popup_btn', 'options');

    $bgc = get_field('popup_bgc', 'options') ? 'background-color: ' . get_field('popup_bgc', 'options') . ';' : false;
    $bgImg = get_field('popup_bg_img_desk', 'options');
    $bgImgMob = get_field('popup_bg_img_mob', 'options');
endif;

$background = $bgc ? 'style="' . $bgc . '"' : false;

if ( !empty($title) || !empty($text) || !empty($img) ): ?>
    <div class="<?= $popupOverlayClass ?>"
        <?php if ( $background ):
            echo $background;
        endif; ?>
    >
        <div class="popup-wrapper">
            <div class="container">
                <div class="popup">
                    <?php if ( !empty($bgImg) || !empty($bgImgMob) ):
                        $bgArgs = [
                            'img' => $bgImg,
                            'img_mob' => $bgImgMob,
                            'mob_size' => $mobSize,
                        ]; ?>

                        <div class="bg-img-wrapper">
                            <?php get_template_part( 'components/image', null, $bgArgs ); ?>
                        </div>
                    <?php endif;

                    if ( !empty($img) ): ?>
                        <div class="img-wrapper">
                            <?php get_template_part( 'components/image', null, ['img' => $img, 'mob_size' => $mobSize] ); ?>
                        </div>
                    <?php endif;

                    if ( !empty($title) ): ?>
                        <div class="title-wrapper">
                            <span class="popup-title"><?= prepare_macros( $title ); ?></span>
                        </div>
                    <?php endif;

                    if ( !empty($text) ): ?>
                        <div class="content-wrapper">
                            <p class="popup-text"><?= prepare_macros( $text ); ?></p>
                        </div>
                    <?php endif;

                    if ( !empty($btn) ): ?>
                        <div class="btn-wrapper">
                            <?php
                                if ( !empty($btn) ):
                                    $target = $btn['target'] ? $btn['target']: '_self';
                                    $url = $btn['url'] ? $btn['url']: '';
                                    $descr = $btn['title'] ? $btn['title']: '';
                                
                                    $btnArgs = [
                                        'label' => $descr,
                                        'type' => 'primary',
                                        'link' => $url,
                                        'target' => $target,
                                        'custom_class' => $btnClass,
                                    ];

                                    get_template_part( 'components/button', null, $btnArgs );
                                endif;
                            ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    
    <?php $_SESSION['popup_shown'] = true;
endif; ?>