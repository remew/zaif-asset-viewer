module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'script',
        'ecmaFeatures': {
            'impliedStrict': false,
        },
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': [
            'off',
        ],
        'array-callback-return': [
            'error',
        ],
        'eqeqeq': [
            'error',
            'always',
            {'null': 'ignore'},
        ],
        'no-multi-spaces': [
            'error',
        ],
        'strict': [
            'error',
            'global',
        ],
        'callback-return': [
            'error',
        ],
        'global-require': [
            'error',
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'never',
                'exports': 'never',
                'functions': 'ignore',
            },
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'no-lonely-if': [
            'error',
        ],
        'no-trailing-spaces': [
            'error',
        ],
        'one-var': [
            'error',
            'never',
        ],
        'no-var': [
            'error',
        ],
        'prefer-const': [
            'error',
        ],
    },
};
