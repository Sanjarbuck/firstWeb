module.exports = {
    syntax: 'postcss-scss',
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                }
            }]
        })
    ]
}
