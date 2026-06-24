<?php
$id = ( isset($args['id']) && !empty($args['id']) ) ? $args['id'] : '';
$date = get_the_date( 'F j, Y', $id );

if ( isset($date) && !empty($date) ): ?>
    <span class="post-date"><?= esc_html($date); ?></span>
<?php endif; ?>