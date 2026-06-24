<?php
$label = ( isset($args['label']) && !empty($args['label']) ) ? $args['label'] : '';
$link = ( isset($args['link']) && !empty($args['link']) ) ? $args['link'] : '#';
$target = ( isset($args['target']) && !empty($args['target']) ) ? $args['target'] : '_self';
$class = ( isset($args['custom_class']) && !empty($args['custom_class']) ) ? ' ' . $args['custom_class'] : '';

if ( !empty($label) ): ?>
    <a
        class="link<?= $class; ?>"
        href="<?= esc_url($link); ?>"
        target="<?= esc_attr($target); ?>"
        aria-label="<?= esc_html($label); ?>"
    >
    <span><?= esc_html($label); ?></span>
    </a>
<?php endif; ?>