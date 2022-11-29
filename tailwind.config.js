module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		animation: {
			flash: 'flash 1s infinite step-end',
		},
		colors: {
			primary: 'rgb(var(--color-primary) / <alpha-value>)',
			secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
			tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
		},
		fontFamily: {
			sans: ['Atlas Grotesk', 'sans-serif'],
		},
		fontSize: {
			base: 'clamp(1.0625rem, 2.75vw, 6rem)',
		},
		keyframes: {
			flash: {
				'0%, 100%': {
					opacity: 1,
				},
				'50%': {
					opacity: 0,
				},
			},
		},
		extend: {
			minWidth: {
				'1/2': '50%',
			},
			width: {
				7.5: '1.875rem',
			},
		},
	},
	plugins: [],
}
