<?php global $options, $fc ; $options = get_option('anvil_theme_options'); ?>
		</div><!-- END page-wrap -->
        <footer class="clearit">
        	<div class="description">
			<?php if ( isset($options['tagline']) && ($options['tagline']!="") ) { ?>
            	<a href="<?php echo home_url(); ?>"><?php bloginfo('description'); ?></a> 
                <?php } else { ?>
                <?php // ?>
                <?php } ?>
            <br />
            <?php if ( isset($options['wordpress_credits']) && ($options['wordpress_credits']!="") ) { ?>
            	<a href="<?php echo esc_url( __('http://wordpress.org/', 'wordsmith-anvil') ); ?>"
						title="<?php esc_attr_e('Semantic Personal Publishing Platform', 'wordsmith-anvil'); ?>" >					<?php printf( __('Proudly powered by %s.', 'wordsmith-anvil'), 'WordPress' ); ?> </a>
                <?php } else { ?>
                <?php // ?>
                <?php } ?>
            </div>    <!--END description -->
			<div class="copyright">
            <?php global $themename, $devcredit; 
				if ( isset($options['copyright_name']) && ($options['copyright_name']!="") ) { ?>
            &copy; <?php echo date("Y") . '&nbsp;&ndash;&nbsp;'; echo (stripslashes ($options['copyright_name'])); ?>
            	<?php } else { ?>
                <?php echo ' &copy; ' . date("Y") ; ?>
            	<?php } ?>
                
				<?php if ( isset($options['developer_credit']) && ($options['developer_credit']!="") ) { ?>
            	<?php echo '<br />' . $themename . '&nbsp;Theme&nbsp;&bull;&nbsp;' . $devcredit ; ?>
                <?php } else { ?>
                <?php // ?>
                <?php } ?>
                
                <?php if ( isset($options['hidden_developer_link']) && ($options['hidden_developer_link']!="") ) { ?>
            	<?php echo '<br />' . $fc ; ?>
                <?php } else { ?>
                <?php // ?>
                <?php } ?>
                
                </div><!--END copyright -->
            <div class="footer-links">
            	<?php if ( isset($options['footer_links']) && ($options['footer_links']!="") ) { ?>
                	<?php if ( isset($options['ftr_url_1']) && ($options['ftr_url_1']!="") && isset($options['ftr_title_1']) && ($options['ftr_title_1']!="") ) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_1']) . '">' . stripslashes ($options['ftr_title_1']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                    <?php if ( isset($options['ftr_url_2']) && ($options['ftr_url_2']!="") && isset($options['ftr_title_2']) && ($options['ftr_title_2']!="")) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_2']) . '">' . stripslashes ($options['ftr_title_2']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                    <?php if ( isset($options['ftr_url_3']) && ($options['ftr_url_3']!="") && isset($options['ftr_title_3']) && ($options['ftr_title_3']!="")) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_3']) . '">' . stripslashes ($options['ftr_title_3']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                    <?php if ( isset($options['ftr_url_4']) && ($options['ftr_url_4']!="") && isset($options['ftr_title_4']) && ($options['ftr_title_4']!="")) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_4']) . '">' .stripslashes ($options['ftr_title_4']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                    <?php if ( isset($options['ftr_url_5']) && ($options['ftr_url_5']!="") && isset($options['ftr_title_5']) && ($options['ftr_title_5']!="")) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_5']) . '">' .stripslashes ($options['ftr_title_5']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                    <?php if ( isset($options['ftr_url_6']) && ($options['ftr_url_6']!="") && isset($options['ftr_title_6']) && ($options['ftr_title_6']!="")) echo '&laquo;&nbsp; <a href="' . stripslashes ($options['ftr_url_6']) . '">' .stripslashes ($options['ftr_title_6']) . '</a>&nbsp;&raquo;&nbsp;'; else // nadda  ?>
                <?php } ?></div><!-- END footer-links -->
		</footer>
	<?php wp_footer(); ?>
</body>
</html>   