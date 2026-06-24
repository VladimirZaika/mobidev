<?php
get_header();

$sectionName = 'not-found';

$content = get_field('404_content', 'options');
$btn = get_field('404_btn', 'options');

if ( !empty($content) || !empty($btn) ): ?>
    <section class="section section-<?php  echo $sectionName; ?>">
        <div class="container <?php echo $sectionName; ?>-container">

            <?php if ( !empty($content) ): ?>
                <div class="content-wrapper"><?= prepare_macros( $content ); ?></div>
            <?php endif;

            if ( !empty($btn) ): ?>
                <div class="btn-wrapper">
                    <?php
                        $target = $btn['target'] ? $btn['target']: '_self';
                        $url = $btn['url'] ? $btn['url']: '';
                        $descr = $btn['title'] ? $btn['title']: '';
                    
                        $btnArgs = [
                            'label' => $descr,
                            'type' => 'primary',
                            'link' => $url,
                            'target' => $target,
                        ];

                        get_template_part( 'components/button', null, $btnArgs );
                    ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
<?php endif;

get_footer();
