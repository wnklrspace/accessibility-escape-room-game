'use client';
import { useGame } from '@/store/game';
import { useStep } from '@/store/steps';
import Content from '@/content';

export default function GamePage() {
	const { stepId, content } = useStep();
	const { game } = useGame();

	return (
		<main style={{ padding: 24 }}>
			<h1>Page {game?.id}</h1>
			<p>{content.title}</p>
			<p>{content.description}</p>
		</main>
	);
}
