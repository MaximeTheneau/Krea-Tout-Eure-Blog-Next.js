<?php

add_action( 'rest_api_init', 'api_test' );
function api_test() {
    register_rest_route( 'krea/v1', '/pages', array(
        'methods' => 'GET',
        'callback' => 'get_categories_callback',
    ) );
}

function get_categories_callback() {

    $list_page = get_pages();
    $list_page = array_map(function($page) {
        return [
            'id' => $page->ID,
            'title' => $page->post_title,
            'slug' => $page->post_name,
            'content' => $page->post_content,
            'media' => array(
                'small'=>get_the_post_thumbnail_url($page->id, 'small'),
                'medium'=>get_the_post_thumbnail_url($page->id, 'medium'),
                'large'=>get_the_post_thumbnail_url($page->id, 'large'),
            )
        ];
    }, $list_page);
    
        

    return $list_page;
}