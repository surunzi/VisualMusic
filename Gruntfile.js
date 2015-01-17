module.exports = function (grunt) {
    
grunt.initConfig({
    connect: {
        server: {
            options: {
                keepalive: true,
                hostname: 'localhost',
                port: 8003
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');

}