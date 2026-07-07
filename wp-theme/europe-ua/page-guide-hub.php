<?php
/* Template Name: Довідник (хаб гайдів) */
if (!defined('ABSPATH')) exit;

// Хаб один шаблон на обидві країни — яку саме визначає власний slug сторінки
// (сторінка вкладена під /dovidnyk/, але slug лишається "nimechchyna"/"polshcha").
$europe_ua_hub_map = [
    'nimechchyna' => ['tag' => 'guide-germany', 'label' => 'Німеччини'],
    'polshcha'    => ['tag' => 'guide-poland',  'label' => 'Польщі'],
];
$europe_ua_hub_slug = get_post_field('post_name');
$europe_ua_hub = $europe_ua_hub_map[$europe_ua_hub_slug] ?? null;

// Порядок фіксований: спершу те, що треба знати одразу (легалізація, гроші),
// потім житло й побутове. Тема без жодного опублікованого гайда просто не
// рендериться — порожніх заголовків розділів на сторінці нема.
$europe_ua_hub_themes = [
    'tema-legalizatsiya' => 'Легалізація',
    'tema-hroshi'        => 'Гроші та виплати',
    'tema-zhytlo'        => 'Житло',
    'tema-povsyakdenne'  => 'Повсякденне',
];
?>
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

  <main class="container guide-hub">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <h1 class="guide-hub__title"><?php the_title(); ?></h1>
      <div class="guide-hub__intro"><?php the_content(); ?></div>
    <?php endwhile; endif; ?>

    <?php if (!$europe_ua_hub) : ?>
      <p>Довідник для цієї сторінки поки не налаштовано.</p>
    <?php else :
      $europe_ua_hub_has_any = false;
      foreach ($europe_ua_hub_themes as $theme_slug => $theme_label) :
        $europe_ua_hub_query = new WP_Query([
          'post_type'      => 'post',
          'post_status'    => 'publish',
          'posts_per_page' => 20,
          'orderby'        => 'modified',
          'order'          => 'DESC',
          'tax_query'      => [
            'relation' => 'AND',
            ['taxonomy' => 'post_tag', 'field' => 'slug', 'terms' => $europe_ua_hub['tag']],
            ['taxonomy' => 'post_tag', 'field' => 'slug', 'terms' => $theme_slug],
          ],
        ]);
        if (!$europe_ua_hub_query->have_posts()) continue;
        $europe_ua_hub_has_any = true;
    ?>
      <h2 class="section-title"><?php echo esc_html($theme_label); ?></h2>
      <div class="guide-hub__list">
        <?php while ($europe_ua_hub_query->have_posts()) : $europe_ua_hub_query->the_post(); ?>
          <a href="<?php the_permalink(); ?>" class="guide-hub__item">
            <span class="guide-hub__item-title"><?php the_title(); ?></span>
            <span class="guide-hub__item-meta">оновлено <?php echo esc_html(get_the_modified_date('d.m.Y')); ?></span>
          </a>
        <?php endwhile; wp_reset_postdata(); ?>
      </div>
    <?php endforeach;
      if (!$europe_ua_hub_has_any) : ?>
        <p>Поки що жоден гайд не опубліковано — перші зʼявляться найближчим часом.</p>
    <?php endif; endif; ?>

    <p class="article__back"><a href="<?php echo esc_url(home_url('/')); ?>">← На головну</a></p>
  </main>

  <footer class="footer">
    <div class="container">
      <p>europe.ua · твоя громада, де б ти не був</p>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>
