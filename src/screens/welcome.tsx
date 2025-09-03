'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Welcome() {
	const [loading, setLoading] = useState(false);
	const r = useRouter();

	const start = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/game/start', { method: 'POST' });
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || 'Failed to start');
			r.push(json.lobbyUrl);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main style={{ padding: 24 }}>
			<h1>Welcome</h1>
			<button
				onClick={start}
				disabled={loading}>
				Start a new game
			</button>
		</main>
	);
}
