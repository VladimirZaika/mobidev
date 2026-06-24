<?php
$viewCount = ( isset($args['view_count']) && !empty($args['view_count']) ) ? $args['view_count'] : '';

if ( !empty($viewCount) ): ?>
    <span class="view-count"><?= $viewCount; ?></span>
<?php endif; ?>