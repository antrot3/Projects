<?php
global $options;
$options = get_option('anvil_theme_options'); 
?>
<?php
	/* The footer widget area is triggered if any of the areas
	 * have widgets. So let's check that first.
	 *
	 * If none of the sidebars have widgets, then let's bail early.
	 */
	if (   ! is_active_sidebar( 'above-footer-left-outer-widgets'  )
		&& ! is_active_sidebar( 'above-footer-left-inner-widgets' )
		&& ! is_active_sidebar( 'above-footer-right-inner-widgets'  )
		&& ! is_active_sidebar( 'above-footer-right-outer-widgets' )
	)
		return;
	// If we get this far, we have widgets. Let do this.
?>

<div id="above-footer">
    <section class="leftout">
       	<?php if ( is_active_sidebar('above-footer-left-outer-widgets') ) : ?>
            	<?php dynamic_sidebar('above-footer-left-outer-widgets'); ?>
            <?php else : ?>
            <h5 class="leftout"><?php _e( 'Left Outer Widget Area', 'wordsmith-anvil' ); ?></h5>
        <?php endif; ?>
    </section><!-- END leftout -->
    
    <section class="leftin">
		
        <?php if ( is_active_sidebar('above-footer-left-inner-widgets') ) : ?>
        	<?php dynamic_sidebar('above-footer-left-inner-widgets'); ?>
            <?php else : ?>
            <h5 class="leftin"><?php _e( 'Left Inner Widget Area', 'wordsmith-anvil' ); ?></h5>
        <?php endif; ?>
      
    </section><!-- END leftin -->
    
    <section class="rightin">

        <?php if ( is_active_sidebar('above-footer-right-inner-widgets') ) : ?>
        	<?php dynamic_sidebar('above-footer-right-inner-widgets'); ?>
			<?php else : ?>
            <h5 class="rightin"><?php _e( 'Right Inner Widget Area', 'wordsmith-anvil' ); ?></h5>
        <?php endif; ?>

        </section><!-- END rightin -->
        
    <section class="rightout">

       		<?php if ( is_active_sidebar('above-footer-right-outer-widgets') ) : ?>   				
                <?php dynamic_sidebar('above-footer-right-outer-widgets'); ?>
                <p class="shim">&nbsp;</p>
                <?php else : ?>
                <h5 class="rightout"><?php _e( 'Right Outer Widget Area', 'wordsmith-anvil' ); ?></h5>
                <p class="shim">&nbsp;</p>           	
        <?php endif; ?>
      
    </section><!-- END rightout -->
    
</div><!-- END above-footer -->