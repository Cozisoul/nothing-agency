/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// TMM-OS Definitive Palette
				bg: '#111111',       // System Black
				fg: '#FFF8E7',       // Cosmic Latte
				accent: '#FF4500',   // OrangeRed (The "Poetic" Spark)
				muted: '#888888',    // Structural Grey
				'bg-light': '#1A1A1A', // Secondary Surface
			},
			fontFamily: {
				// The "Office" Voice
				sys: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
				// The "Annotation" Voice
				mono: ['Menlo', 'Courier New', 'monospace'],
			},
			fontSize: {
				// Fluid Typography (Clamps for perfect scaling)
				'fluid-h1': 'clamp(3rem, 6vw, 6rem)',
				'fluid-h2': 'clamp(1.5rem, 3vw, 3rem)',
				'fluid-body': 'clamp(1rem, 1.1vw, 1.25rem)',
				'fluid-sm': 'clamp(0.75rem, 0.9vw, 0.875rem)',
			},
			spacing: {
				// The Systematic Grid Gaps
				'layout-gap': 'clamp(1rem, 4vw, 3rem)',
			},
			transitionTimingFunction: {
				// The "Heavy" Ease (for that premium feel)
				'heavy': 'cubic-bezier(0.25, 1, 0.5, 1)',
			}
		},
	},
	plugins: [],
}
