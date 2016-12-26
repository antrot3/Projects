<?php get_header(); ?>
    <div id="main-content">
	<?php if (have_posts()) : ?>
		<h2>Pretraži <span class="findit">&nbsp;</span>&nbsp;&quot;<span class="simple-red sevenfive"><?php echo esc_html($s); ?></span>&quot;</h2>
        <hr />
		<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
		<?php while (have_posts()) : the_post(); ?>
			<div <?php post_class() ?> id="post-<?php the_ID(); ?>">
				<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<div class="metabar">
					<?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
                    </div><!-- END of metabar -->
				<div class="entry">
					<?php //the_excerpt(); ?> 
                    <?php the_content(); ?><br class="clearboth" />
				</div><!--END entry-->
			</div><!--END post -->
		<?php endwhile; ?>
		<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
	<?php else : ?>
		<p><?php _e( 'Whoops. Oddly enough, it appears there were no results found that matched your search. <br /><br/>Try another search term.', 'wordsmith-anvil' ); ?></p>
	<?php endif; ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>