<?php get_header(); ?>
	<div id="content">
		<?php get_sidebar(); ?>
		<div id="posts" class="categoryposts">
		<h3 id="categorytitle">Posts written in <?php single_month_title(' ', display) ?></h3>
		<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
				<li><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>
		<?php endwhile; ?>
			<div class="navigation">
				<div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
				<div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
			</div>
		<?php else : ?>
			<h2 class="center">Not Found</h2>
			<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php include (TEMPLATEPATH . "/searchform.php"); ?>
		<?php endif; ?>
		</div>
	</div>
<?php get_footer(); ?>