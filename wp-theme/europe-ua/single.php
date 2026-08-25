<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

  <header class="header">
    <div class="container header__inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
        <span class="logo__mark" aria-hidden="true"></span>
        europe.ua
      </a>
    </div>
  </header>

  <main class="container article">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article <?php post_class(); ?>>
        <p class="article__meta">
          <?php
          $cats = get_the_category();
          if ($cats) {
            echo '<a class="article__cat" href="' . esc_url(get_category_link($cats[0]->term_id)) . '">' . esc_html($cats[0]->name) . '</a> · ';
          }
          echo esc_html(get_the_date('d.m.Y, H:i'));
          ?>
        </p>
        <h1 class="article__title"><?php the_title(); ?></h1>
        <?php
        $author_name = get_post_meta(get_the_ID(), 'author_name', true) ?: get_the_author();
        $author_role = get_post_meta(get_the_ID(), 'author_role', true) ?: get_the_author_meta('public_role');
        ?>
        <p class="article__byline">
          <?php echo esc_html($author_name); ?><?php if ($author_role) : ?> · <?php echo esc_html($author_role); ?><?php endif; ?>
        </p>
        <?php if (has_post_thumbnail()) : ?>
          <div class="article__image"><?php the_post_thumbnail('large'); ?></div>
        <?php endif; ?>
        <div class="article__content">
          <?php the_content(); ?>
        </div>
        <div class="article__author-box">
          <p><strong><?php echo esc_html($author_name); ?></strong><?php if ($author_role) : ?>, <?php echo esc_html($author_role); ?><?php endif; ?></p>
          <p><?php echo esc_html(get_the_author_meta('description')); ?></p>
        </div>
      </article>
    <?php endwhile; endif; ?>

    <p class="article__back"><a href="<?php echo esc_url(home_url('/')); ?>">← На головну</a></p>
  </main>

  <footer class="footer">
    <div class="container">
      <p>europe.ua · твоя громада, де б ти не був</p>
      <nav class="footer__categories" aria-label="Про сайт">
        <a href="<?php echo esc_url(home_url('/pro-nas/')); ?>">Про нас</a>
        <a href="<?php echo esc_url(home_url('/redaktsiyna-polityka/')); ?>">Редакційна політика</a>
        <a href="<?php echo esc_url(home_url('/kontakty/')); ?>">Контакти</a>
      </nav>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>
