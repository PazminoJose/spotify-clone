// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    "tailwindFunctions": ["clsx,classNames"],
    "trailingComma": "none",
    "printWidth": 110,
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};