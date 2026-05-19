{{domain}} {

    root * {{deployDir}}/current
    encode gzip zstd
    file_server

    handle /api* {
        reverse_proxy {{backend}}
    }

    handle_errors {
        root * /var/www/errors
        file_server
    }
}
