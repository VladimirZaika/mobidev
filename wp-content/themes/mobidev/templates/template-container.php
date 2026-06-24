<?php 
/**
 * Template Name: Template With Container
 */

get_header(); ?>

<div class="basic-wrapper">
    <div class="container basic-container">
        <?php get_template_part( 'components/loop' ); ?>
    </div>
</div>

<?php get_footer();