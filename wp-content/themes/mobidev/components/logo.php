<?php
$logo = get_custom_logo();

if ( $logo ): ?>
    <?= $logo; ?>
<?php else: ?>
    <p class="header-text">
        <?php bloginfo( 'name' ); ?>
    </p>
<?php endif; ?>