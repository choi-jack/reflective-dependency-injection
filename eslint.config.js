// @ts-check

import base from '@choi-jack/eslint-config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...base,
    {
        ignores: [
            'dist',
        ],
    },
);
