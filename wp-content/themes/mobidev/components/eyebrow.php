<?php
$eyebrow = ( isset($args['text']) && !empty($args['text']) ) ? $args['text'] : '';

if ( !empty($eyebrow) ): ?>
    <div class="eyebrow-wrapper">
        <span class="eyebrow"><?= $eyebrow; ?></span>
    </div>
<?php endif;