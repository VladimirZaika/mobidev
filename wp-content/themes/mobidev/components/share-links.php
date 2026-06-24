<?php
$postUrl   = urlencode( get_permalink() );
$postTitle = urlencode( get_the_title() );

$defaultLabel = 'Share link';

$twitterIcon = get_field('twitter_icon', 'options');
$twitterLabel = get_field('twitter_label', 'options') ?? $defaultLabel;

$fbIcon = get_field('fb_icon', 'options');
$fbLabel = get_field('fb_label', 'options') ?? $defaultLabel;

$redditIcon = get_field('reddit_icon', 'options');
$redditLabel = get_field('reddit_label', 'options') ?? $defaultLabel;

$linkedInIcon = get_field('linkedin_icon', 'options');
$linkedInLabel = get_field('linkedin_label', 'options') ?? $defaultLabel;

$mailIcon = get_field('mail_icon', 'options');
$mailLabel = get_field('mail_label', 'options') ?? $defaultLabel;

$copyIcon = get_field('copy_icon', 'options');
$copyLabel = get_field('copy_label', 'options') ?? $defaultLabel;

if ( isset($postUrl) && !empty($postUrl)): ?>
    <div class="share-links-wrapper">
        <?php if ( !empty($mailIcon) ): ?>
            <a class="share-link email" href="mailto:?subject=<?php echo $postTitle; ?>&body=<?php echo $postUrl; ?>" target="_blank" rel="noopener" aria-label="<?= $mailLabel; ?>">
                <?php $iconArgs = [
                        'img' => $mailIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </a>
        <?php endif;

        if ( !empty($twitterIcon) ): ?>
            <a class="share-link twitter" href="https://twitter.com/intent/tweet?url=<?php echo $postUrl; ?>&text=<?php echo $postTitle; ?>" target="_blank" rel="noopener" aria-label="<?= $twitterLabel; ?>">
                <?php $iconArgs = [
                        'img' => $twitterIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </a>
        <?php endif;

        if ( !empty($fbIcon) ): ?>
            <a class="share-link facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $postUrl; ?>" target="_blank" rel="noopener" aria-label="<?= $fbLabel; ?>">
                <?php $iconArgs = [
                        'img' => $fbIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </a>
        <?php endif;

        if ( !empty($redditIcon) ): ?>
            <a class="share-link reddit" href="https://www.reddit.com/submit?url=<?php echo $postUrl; ?>&title=<?php echo $postTitle; ?>" target="_blank" rel="noopener" aria-label="<?= $redditLabel; ?>">
                <?php $iconArgs = [
                        'img' => $redditIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </a>
        <?php endif;

        if ( !empty($linkedInIcon) ): ?>
            <a class="share-link linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $postUrl; ?>&title=<?php echo $postTitle; ?>" target="_blank" rel="noopener" aria-label="<?= $linkedInLabel; ?>">
                <?php $iconArgs = [
                        'img' => $linkedInIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </a>
        <?php endif;

        if ( !empty($copyIcon) ): ?>
            <button class="share-button copy-link-btn copy" data-url="<?php echo esc_url( get_permalink() ); ?>" type="button" aria-label="<?= $copyLabel; ?>">
                <?php $iconArgs = [
                        'img' => $copyIcon,
                        'mob_size' => 'full',
                    ]; ?>

                <span class="img-wrapper">
                    <?php get_template_part( 'components/image', null, $iconArgs ); ?>
                </span>
            </button>
        <?php endif; ?>
    </div>
<?php endif; ?>