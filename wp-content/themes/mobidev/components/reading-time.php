<?php
$readingTime = ( isset($args['reading_time']) && !empty($args['reading_time']) ) ? $args['reading_time'] : '';

if ( !empty($readingTime) ): ?>
    <span class="reading-time"><?= $readingTime . ' min'; ?></span>
<?php endif; ?>