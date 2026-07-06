<?php
if (!defined('ABSPATH')) exit;

function europe_ua_setup() {
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'europe_ua_setup');

// Одноразовий фікс: сайт був на "простих" permalinks (?p=123), через що
// /wp-json/... REST-шляхи віддавали 404. Перемикаємо на /%postname%/ і
// скидаємо rewrite-правила. Ідемпотентно — після першого спрацювання
// нічого не пише і не викликає flush повторно.
function europe_ua_ensure_pretty_permalinks() {
    if (get_option('permalink_structure') !== '/%postname%/') {
        update_option('permalink_structure', '/%postname%/');
        flush_rewrite_rules();
    }
}
add_action('init', 'europe_ua_ensure_pretty_permalinks');

// Категорії країн створює бот (hromada-bot) через REST API і часто лишає
// їм технічну назву = slug (напр. "nimechchyna"), бо йому це байдуже. Тут —
// людські назви для футера сайту; для невідомого slug'а показуємо як є.
function europe_ua_category_label($cat) {
    $labels = [
        'ukraina'        => 'Україна',
        'zhyttia-tryvaie'=> 'Життя триває',
        'nimechchyna'    => 'Німеччина',
        'polshcha'       => 'Польща',
        'chekhiia'       => 'Чехія',
        'brytaniia'      => 'Британія',
        'ispaniia'       => 'Іспанія',
        'italiia'        => 'Італія',
        'niderlandy'     => 'Нідерланди',
        'yevrokomisiya'  => 'Європейська комісія',
    ];
    return $labels[$cat->slug] ?? $cat->name;
}

function europe_ua_enqueue_assets() {
    wp_enqueue_style('europe-ua-fonts', 'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&display=swap', [], null);
    wp_enqueue_style('europe-ua-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
    wp_enqueue_script('europe-ua-app', get_template_directory_uri() . '/app.js', [], wp_get_theme()->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'europe_ua_enqueue_assets');
