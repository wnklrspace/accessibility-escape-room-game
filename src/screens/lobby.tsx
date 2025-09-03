'use client';
import { useGame } from '@/store/game';

export default function Lobby() {
	const { game } = useGame();

	if (!game) return <p>Loading...</p>;

	return (
		<main style={{ padding: 24 }}>
			<h1>Game Lobby</h1>
			<p>
				<b>Game ID:</b> {game.id}
			</p>
			<ul>
				{[1, 2, 3, 4, 5, 6].map((n) => (
					<li key={n}>
						Page {n}: {game[`page${n as 1}`] ? '✅' : '⏳'}
					</li>
				))}
			</ul>
		</main>
	);
}
