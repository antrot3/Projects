<?php get_header(); ?>
    <div id="main-content">
		<?php if (have_posts()) : ?>

 			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

			<?php /* If this is a category archive */ if (is_category()) { ?>
				<h2><?php printf(__ ('Post Archives from the  &#8216;%s&#8217; Category', 'wordsmith-anvil'), single_cat_title("", false))?></h2>

			<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h2><?php printf(__ ('Post Archives tagged &#8216;%s&#8217;', 'wordsmith-anvil'), single_tag_title("", false))?></h2>

			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2><?php _e('Daily Archives for', 'wordsmith-anvil') ?>  <?php the_time(__ ('F jS, Y', 'wordsmith-anvil')); ?></h2>

			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2><?php _e('Monthly Archives for', 'wordsmith-anvil') ?> <?php the_time(__ ('F, Y', 'wordsmith-anvil')) ?></h2>

			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2><?php _e('Yearly Archives for', 'wordsmith-anvil') ?> <?php the_time(__ ('Y', 'wordsmith-anvil')) ?></h2>

			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2><?php _e('Blog Archives', 'wordsmith-anvil') ?></h2>
			
			<?php } ?>
            <hr />
			<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
			<?php while (have_posts()) : the_post(); ?>
				<div <?php post_class() ?>>
					<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
					<div class="metabar">
					<?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
                    </div><!-- END of metabar -->
					<div class="entry">
						<?php $thetitle = "<span class='readabout'>" . get_the_title() . "</span>"; ?>
                	<?php $morestory = "<p class='read'>&hellip; Continue reading the story &quot;" . $thetitle . "&quot;</p>"; ?>
                    <?php //the_content(__($morestory, 'wordsmith-anvil')); ?>
                        <?php //the_excerpt(); ?>
                        <?php the_content(); ?>
					</div><!-- END entry -->
				</div><!--END post -->
			<?php endwhile; ?>
			<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
	<?php else : ?>
		<p><?php _e( 'Whoops. Oddly enough, it appears there were no results found that match your request. Perhaps searching will help find a related post.', 'wordsmith-anvil' ); ?></p>
			<div class="aligncenter"><?php get_search_form(); ?></div><!--END search_form()-->
	<?php endif; ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
    <div class="clearit">
    <?php get_template_part( 'inc/above', 'footer');          // Above Footer Include  - locate_template() will not work - (inc/above-footer.php) ?>
    </div><!-- END clearit (wrap for above footer)-->
<?php get_footer(); ?>