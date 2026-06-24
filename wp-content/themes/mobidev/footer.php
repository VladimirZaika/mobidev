<?php
/**
 * The footer
 *
 * @package mobidev
 */
$currentTerm = get_queried_object();

$id = get_the_ID();
$insertAfterFooterCode = get_field('insert_after_footer_code', 'options');
$copyright = get_field('copyright', 'options');
$footerText = get_field('footer_text', 'options');
$customClass = get_field('footer_custom_class', $id) ? ' ' . get_field('footer_custom_class', $id) : '';

$popupShow = get_field('popup_show', 'options');
 ?>
        <!-- Main end -->
        </main>
            <?php if ( !$popupShow ):
                $popupArgs = [
                    'options' => true,
                ];
                
                get_template_part( 'components/popup', null, $popupArgs );
            endif; ?>

            <footer class="footer<?= $customClass; ?>">
                <div class="container footer-container">
                    <div class="footer-wrapper">
                        <div class="footer-content-wrapper">
                            <div class="logo footer-logo">
                                <?php get_template_part( 'components/logo' ); ?>
                            </div>

                            <?php if ( !empty($footerText) ): ?>
                                <div class="footer-content">
                                    <?= $footerText; ?>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="navigation-wrapper">
                            <?php if ( has_nav_menu( 'primary' ) ): ?>
                                <div class="menu-column">
                                    <span class="menu-title"><?php _e('Menu', 'mobidev'); ?></span>
                                    <?php get_template_part( 'components/navigation' ); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div class="copyright-wrapper">
                        <?php if ( has_nav_menu( 'landing' ) ): ?>
                            <div class="privacy-navigation-wrapper">
                                <?php
                                    get_template_part( 'components/navigation', null, ['menu' => 5] );
                                ?>
                            </div>
                        <?php endif;

                        if ( !empty($copyright) ): ?>
                            <div class="copyright-item">
                                <span><?php echo $copyright; ?></span>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </footer>
        <!-- Wrapper End -->
        </div>

        <?php
            echo $insertAfterFooterCode;

            wp_footer();
        ?>
    </body>
</html>