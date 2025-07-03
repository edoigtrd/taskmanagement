export default [
    {
        languageOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                // Node.js globals
                require: 'readonly',
                module: 'readonly',
                __filename: 'readonly',
                __dirname: 'readonly'
            }
        },
        rules: {
            // Allow the use of console
            'no-console': 'off',

            // Example rule: enforce consistent semi-colon usage
            'semi': ['error', 'always'],
        },
    }
];