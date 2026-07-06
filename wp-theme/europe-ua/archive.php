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

  <main class="container article-list">
    <h1 class="article-list__title"><?php the_archive_title(); ?></h1>

    <?php if (have_posts()) : ?>
      <div class="article-list__grid">
        <?php while (have_posts()) : the_post(); ?>
          <a href="<?php the_permalink(); ?>" class="article-card">
            <?php if (has_post_thumbnail()) : ?>
              <div class="article-card__img"><?php the_post_thumbnail('medium'); ?></div>
            <?php endif; ?>
            <p class="article-card__title"><?php the_title(); ?></p>
            <p class="article-card__meta"><?php echo esc_html(get_the_date('d.m.Y, H:i')); ?></p>
          </a>
        <?php endwhile; ?>
      </div>
      <div class="article-list__pagination"><?php the_posts_pagination(); ?></div>
    <?php else : ?>
      <p>Поки що немає матеріалів у цій категорії.</p>
    <?php endif; ?>
  </main>

  <footer class="footer">
    <div class="container">
      <p>europe.ua · твоя громада, де б ти не був</p>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>
