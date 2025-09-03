'use client';
import React from 'react';
import { useGame } from "@/store/game";

const LobbyScreen: React.FC = () => {
	const { gameId } = useGame();

	return (
		<main>
			<h1>You a re currently in the lobby of {gameId}</h1>
		</main>
	);
};

export default LobbyScreen;