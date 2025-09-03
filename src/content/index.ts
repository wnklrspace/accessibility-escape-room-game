const Content = {
	0: {
		title: 'Welcome Screen!!',
		description:
			'Assign roles, explain keyboard-only play, and introduce built-in tools: a contrast checker and an alt-text guide. Activate the visible Skip to main link to begin.',
	},
	1: {
		title: 'Contrast Lock',
		description:
			'Test six color pairs. Identify the only pair that meets AA for normal text (≥4.5:1). Code is the foreground hex of the correct card (e.g., #124734).',
	},
	2: {
		title: 'Alt Text Mystery',
		description:
			'Choose the best alt text for an image (purposeful, concise, no redundancy). Wrong answers beep and explain. Code is a keyword in the correct alt (e.g., ramp).',
	},
	3: {
		title: 'Keyboard Navigation Trap',
		description:
			'Navigate a faux page with keyboard only. Use the Skip to main link, proper headings, and a real button. Code is a 4-digit number revealed on activation (e.g., 1959).',
	},
	4: {
		title: 'Screen Reader Riddle',
		description:
			'Compare two versions via audio/transcript. Pick the one with semantic structure, landmarks, and meaningful links. Code is the acronym formed by correct choices (e.g., SLM).',
	},
	5: {
		title: 'ARIA Label Mix-up',
		description:
			'Fix five issues: non-native buttons, inconsistent names, aria-hidden labels, noisy live regions, and tabindex -1. Code appears after all fixes (e.g., NATIVE).',
	},
	6: {
		title: 'Final Lock: The Treasure Page',
		description:
			'Enter all previous codes. Page also self-checks contrast, alt text, keyboard path, and naming consistency. On pass, unlock treasure.',
	},
	7: {
		title: 'U DID IT!!',
		description:
			'Celebrate, show time/hints used, list key takeaways, and offer a downloadable retrospective card.',
	},
};

export default Content;
