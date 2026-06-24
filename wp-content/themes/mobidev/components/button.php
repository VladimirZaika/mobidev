<?php
$preloader = ( isset($args['preloader']) && !empty($args['preloader']) ) ? true : false;
$type = ( isset($args['type']) && !empty($args['type']) ) ? $args['type'] : 'primary';
$label = ( isset($args['label']) && !empty($args['label']) ) ? $args['label'] : '';
$link = ( isset($args['link']) && !empty($args['link']) ) ? $args['link'] : '#';
$target = ( isset($args['target']) && !empty($args['target']) ) ? $args['target'] : '_self';
$disabled = ( isset($args['disabled']) && $args['disabled'] ) ? true : false;
$class = ( isset($args['custom_class']) && !empty($args['custom_class']) ) ? ' ' . $args['custom_class'] : '';

if ( $disabled ) {
    $class .= ' disabled';
    $type = 'secondary';
}

$class = $type . $class;

if ( !empty($label) ):

    if ( $preloader ): ?>
        <div class="button-preloader-wrap">
    <?php endif; ?>

        <a
            class="button button-<?= $class; ?>"
            href="<?= $link; ?>"
            aria-label="<?= $label; ?>"
            target="<?= $target; ?>"
        >
            <span class="button-text"><?= $label; ?></span>
        </a>
    <?php if ( $preloader ):
        get_template_part( 'components/preloader' ); ?>

        </div>
    <?php endif;
endif; ?>