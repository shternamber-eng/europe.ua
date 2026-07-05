<?php
if (!defined('ABSPATH')) exit;

function europe_ua_setup() {
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'europe_ua_setup');

function europe_ua_enqueue_assets() {
    wp_enqueue_style('europe-ua-fonts', 'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&display=swap', [], null);
    wp_enqueue_style('europe-ua-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
    wp_enqueue_script('europe-ua-app', get_template_directory_uri() . '/app.js', [], wp_get_theme()->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'europe_ua_enqueue_assets');
