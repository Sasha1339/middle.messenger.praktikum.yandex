module.exports = {
    root: true,
    ignorePatterns: ['node_modules/**/*.*'],
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json']
            },
            plugins: ['@typescript-eslint'],
            extends: [
                'plugin:prettier/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking'
            ],
            rules: {
                'react/jsx-filename-extension': 'off',
                'import/extensions': 'off',
                'import/no-extraneous-dependencies': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                'prettier/prettier': [
                    'error',
                    {
                        printWidth: 120,
                        tabWidth: 4,
                        semi: true,
                        singleQuote: true,
                        trailingComma: 'none',
                        singleAttributePerLine: true,
                        endOfLine: 'auto',
                        bracketSameLine: true
                    }
                ]
            }
        }
    ]
};
