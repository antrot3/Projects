<?php global $options; $options = get_option('anvil_theme_options'); ?>
<?php get_header(); ?>
    <div id="main-content">
    	<div class="breadcrumbs">
			<?php
                if (function_exists('bcn_display')) {
                    bcn_display();
                }
            ?>
		</div><!--END breadcrumbs-->
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<div class="metabar">
				<?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
            </div><!-- END of metabar -->
			<div class="entry">
                <?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('index-thumb', array('class' => 'page-thm alignright border') ); ?>
					<?php the_content(); ?><p class="clearboth">&nbsp;</p>
				<?php wp_link_pages(array(
											'before' => '<div class="navigation wp-pagenavi nextpage"><span>' . __('Pages:') . '</span>', 
											'after' => '</div>',
											'link_before' => '', 'link_after' => '',
											'next_or_number' => 'number', 
											'nextpagelink' => '<span>' . __('&raquo;') . '</span>',
											'previouspagelink' => '<span>' . __('&laquo;') . '</span>', 
											'pagelink' => '{ % }',
											'echo' => 1 )); ?>
			</div><!--END entry-->
			<?php edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
		</div><!--END post-->
		<?php comments_template(); ?>
		<?php endwhile; endif; ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>