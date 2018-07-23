module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "indent": [
            "error",
            2,
            {"SwitchCase" :1},
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "ignore"
        }],
        "eol-last": ["error", "always"],
        "no-console": 0,
        "no-alert": ["warn"],
        "no-debugger": ["warn"],
        "array-callback-return": "error",
        "eqeqeq": ["error", "always"],
        "no-useless-return": "error",
        "arrow-parens": [
            2,
            "as-needed",
            {
                "requireForBlockBody": true
            }
        ],
        "no-useless-constructor": "error",
        "no-global-assign": 0,

    }
};
