 <?php if (function_exists('wp_pagenavi')) : wp_pagenavi(); ?>
 	<p>&nbsp;</p>
        <?php else : ?>

		<?php global $wp_rewrite;
        $paginate_base = get_pagenum_link(1);
        if (strpos($paginate_base, '?') || ! $wp_rewrite->using_permalinks()) {
            $paginate_format = '';
            $paginate_base = add_query_arg('paged', '%#%');
        } else {
            $paginate_format = (substr($paginate_base, -1 ,1) == '/' ? '' : '/') .
            user_trailingslashit('page/%#%/', 'paged');;
            $paginate_base .= '%_%';
        }
        
        echo '<div class="navigation wp-pagenavi">'. "\n";
        echo paginate_links( array(
            'base' => $paginate_base,
            'format' => $paginate_format,
            'total' => $wp_query->max_num_pages,
            'mid_size' => 3,
            'current' => ($paged ? $paged : 1),
			'show_all' => false,
            'type' => 'plain',
			'prev_next' => true,
            'prev_text' => __('&laquo;'),
            'next_text' => __('&raquo;'),
        ));
        echo "\n</div><!--END navigation-->\n"; 
		echo "<br class='clearboth'>" . "\n"; ?>
	
	<?php endif; ?>