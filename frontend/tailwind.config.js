/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,html,vue,svelte}",
    ],
    theme: {
        extend: { },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};
