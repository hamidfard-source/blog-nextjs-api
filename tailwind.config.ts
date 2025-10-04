import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw"

export default withUt({
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				persianBlue: {
					50: "#f3f5fb",
					100: "#c8cfee",
					200: "#9da9e1",
					300: "#7284d4",
					400: "#475ec7",
					500: "#1c39bb",
					600: "#162d95",
					700: "#102270",
					800: "#0b164a",
					900: "#050b25",
				},
				persianIndigo: {
					50: "#f4f3f8",
					100: "#cdc6df",
					200: "#a699c5",
					300: "#7f6cac",
					400: "#583f93",
					500: "#32127a",
					600: "#280e61",
					700: "#1e0a49",
					800: "#140730",
					900: "#090318",
				},
				persianGreen: {
					50: "#f2faf9",
					100: "#c1e9e5",
					200: "#91d8d0",
					300: "#60c7bc",
					400: "#30b6a7",
					500: "#00a693",
					600: "#008475",
					700: "#006358",
					800: "#00423a",
					900: "#00211d",
				},
				persianRed: {
					50: '#fdf3f3',
					100: '#fce4e4',
					200: '#facece',
					300: '#f5acac',
					400: '#ed7c7c',
					500: '#e15252',
					600: '#cc3333',
					700: '#ac2929',
					800: '#8e2626',
					900: '#772525',
					950: '#400f0f',
				},
				comet: {
					50: '#f5f7f9',
					100: '#e8ebf1',
					200: '#d6dce7',
					300: '#b9c4d7',
					400: '#98a6c2',
					500: '#7f8db2',
					600: '#6d78a3',
					700: '#616994',
					800: '#52587b',
					900: '#4c516d',
					950: '#2d2f3e',
				},
				white: {
					smoke: "#f5f5f5",
					gainsboro: "#e0e0e0",
				},
				dark: {
					tone: "#121212",
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			fontFamily: {
				roboto: [
					'var(--font-roboto)'
				],
				robotoMono: [
					'var(--font-roboto-mono)'
				],
				vazirmatn: [
					'var(--font-vazirmatn)'
				]
			},
		},
	},
	plugins: [require('tailwindcss-motion'), require("tailwindcss-animate")],
}) satisfies Config;
