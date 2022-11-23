<?php

add_action( 'rest_api_init', 'api_posts' );
function api_posts() {
    register_rest_route( 'krea/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_api_posts',
    ) );
}

function get_api_posts() {

    $list_posts = get_posts();

    $list_posts = array_map(function($post) {

        return [
            'id' => $post->ID,
            'title' => $post->post_title,
            'slug' => $post->post_name,
            'content' => array(
                'small'=>get_the_post_thumbnail_url($post->ID, 'small'),
                'medium'=>get_the_post_thumbnail_url($post->ID, 'medium'),
                'large'=>get_the_post_thumbnail_url($post->ID, 'large'),
            )
        ];
    }, $list_posts);

    $data ['posts'] = $list_posts;

    return $data;
}