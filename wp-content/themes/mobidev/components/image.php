<?php
$imgDesk = ( isset($args['img']) && !empty($args['img']) ) ? $args['img'] : false;
$imgMob = ( isset($args['img_mob']) && !empty($args['img_mob']) ) ? $args['img_mob'] : false;
$section = ( isset($args['section']) && !empty($args['section']) ) ? ' ' . $args['section'] . '-sudden-bg' : '';
$img = !empty($imgDesk) ? $imgDesk : $imgMob;
$mobSize = ( isset($args['mob_size']) && !empty($args['mob_size']) ) ? $args['mob_size'] : false;
$width = ( isset($args['width']) && !empty($args['width']) ) ? $args['width'] : '';
$height = ( isset($args['height']) && !empty($args['height']) ) ? $args['height'] : '';
$mimeType = null;

if ( $img ):
    $mimeType = get_image_mime_type( $img['url'] );
endif;

if ( isset($img) && !empty($img) ):
    if ( !empty($section) ): ?>
        <div class="sudden-bg-wrapper image-bg-wrapper<?= $section; ?>">
    <?php endif; ?>

    <picture>
        <?php if ( !empty($imgDesk) && !empty($imgMob) ):
            $mimeTypeMob = get_image_mime_type( $imgMob['url'] );
            $mimeTypeDesk = get_image_mime_type( $imgDesk['url'] );

            if ( $mobSize === 'full' ): ?>
                <source
                    srcset="<?= esc_url($imgMob['url']); ?>"
                    media="(max-width: 767px)"

                    <?php if ( $mimeTypeMob ): ?>
                        type="<?= $mimeTypeMob; ?>"
                    <?php endif; ?>
                >
            <?php else: ?>
                <source
                    srcset="<?= esc_url($imgMob['sizes']['medium_large']); ?>"
                    media="(max-width: 767px)"

                    <?php if ( $mimeTypeMob ): ?>
                        type="<?= $mimeTypeMob; ?>"
                    <?php endif; ?>
                >
            <?php endif; ?>
            
            <source
                srcset="<?= esc_url($imgDesk['url']); ?>"
                media="(min-width: 768px)"

                <?php if ( $mimeTypeDesk ): ?>
                    type="<?= $mimeTypeDesk; ?>"
                <?php endif; ?>
            >
        <?php else:
            if ( $mobSize === 'full' ): ?>
                <source
                    srcset="<?= esc_url($img['url']); ?>"

                    <?php if ( $mimeType ): ?>
                        type="<?= $mimeType; ?>"
                    <?php endif; ?>
                >
            <?php else: ?>
                <source
                    srcset="<?= esc_url($img['sizes']['medium_large']); ?>"
                    media="(max-width: 767px)"

                    <?php if ( $mimeType ): ?>
                        type="<?= $mimeType; ?>"
                    <?php endif; ?>
                >

                <source
                    srcset="<?= esc_url($img['url']); ?>"
                    media="(min-width: 768px)"
                    
                    <?php if ( $mimeType ): ?>
                        type="<?= $mimeType; ?>"
                    <?php endif; ?>
                >
            <?php endif; ?>
        <?php endif;?>

        <img
            src="<?= esc_url($img['url']); ?>" alt="<?= esc_attr($img['alt']); ?>"

            <?php if ( !empty($width) ): ?>
                width="<?= $width; ?>"
            <?php endif;

            if ( !empty($height) ): ?>
                height="<?= $height; ?>"
            <?php endif; ?>
        >
    </picture>
    
    <?php if ( !empty($section) ): ?>
        </div>
    <?php endif;
endif; ?>