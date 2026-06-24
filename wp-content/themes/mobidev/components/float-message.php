<?php
$icon = ( isset($args['image']) && !empty($args['image']) ) ? $args['image'] : '';
$text = ( isset($args['text']) && !empty($args['text']) ) ? $args['text'] : '';
$customClass = ( isset($args['custom_class']) && !empty($args['custom_class']) ) ? ' ' . $args['custom_class'] : '';

if ( !empty($icon) || !empty($text) ): ?>
    <div class="float-msg-wrapper<?= $customClass; ?>">
        <?php if ( !empty($icon) ): ?>
            <div class="icon-wrapper">
                <?php get_template_part( 'components/image', null, ['img' => $icon] ); ?>
            </div>
        <?php endif;

        if ( !empty($text) ): ?>
            <div class="title-wrapper">
                <span class="float-msg-title"><?= $text; ?></span>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>
