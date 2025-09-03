import { fetchGameOrRedirect, firstIncompletePage } from '@/lib/gameServer';
import { redirect } from 'next/navigation';

export default async function GamePage({
	params,
}: {
	params: { gameId: string; pageId: string };
}) {
	const pageNo = Number(params.pageId);
	if (!Number.isFinite(pageNo) || pageNo < 1 || pageNo > 6)
		redirect(`/game/${params.gameId}`);

	const game = await fetchGameOrRedirect(params.gameId);
	const required = firstIncompletePage(game);

	if (required !== 7 && pageNo > required) {
		// trying to skip ahead → send to required page
		redirect(`/game/${game.id}/p/${required}`);
	}

	// Render your puzzle/challenge UI here.
	// When the user "finds the key", call the /api to mark completion and go forward.
	return (
		<main style={{ padding: 24 }}>
			<h1>Page {pageNo}</h1>
			<form
				action={`/api/game/progress`}
				method='post'
				style={{ marginTop: 12 }}>
				{/* simple progressive enhancement; client-side can also do fetch() */}
				<input
					type='hidden'
					name='page'
					value={pageNo}
				/>
				<input
					type='hidden'
					name='gameId'
					value={game.id}
				/>
				<button
					formAction={async () => {}}
					type='submit'>
					I found the key
				</button>
			</form>
		</main>
	);
}
