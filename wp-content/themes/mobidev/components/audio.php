<?php
$audioLink = ( isset($args['audio']) && !empty($args['audio']) ) ? $args['audio'] : false;
$audioTitle = ( isset($args['audio_title']) && !empty($args['audio_title']) ) ? $args['audio_title'] : 'Listen to the audio';
$audioUrl = false;

if ( isset($audioLink['url']) && !empty($audioLink['url']) ):
    $audioUrl = $audioLink['url'];
endif;

if ( $audioUrl ): ?>
    <div class="audio-wrapper">
        <div class="audio-player-container">
            <p class="audio-title"><?php echo esc_html($audioTitle); ?></p>
            <audio class="audio" autoplay playsinline crossorigin controls>
                <source src="<?= esc_url($audioUrl) ?>"
                    type="audio/mp3">
            </audio>
        </div>
    </div>
<?php endif; ?>