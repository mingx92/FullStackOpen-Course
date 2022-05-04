module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'indent': [
            'error',
            4
        ],
        'linebreak-style': 0,
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 0
    }
}
