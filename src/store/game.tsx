"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";

type Id = string | number;
type Game = {
	id: string;
	page1: boolean;
	page2: boolean;
	page3: boolean;
	page4: boolean;
	page5: boolean;
	page6: boolean;
	completed_at: string | null;
} | null;

interface GameContextValue {
	gameId: Id | null;
	setGameId: React.Dispatch<React.SetStateAction<Id | null>>;
	game: Game | undefined;
	loading: boolean;
	error: Error | undefined;

	refresh: () => Promise<void>;
	startGame: () => Promise<void>;
	mark: (page: number) => Promise<void>;
	completeGame: () => Promise<void>;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

// util: normalize to stable key
const toId = (v: Id | null): Id | null => {
  if (v == null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = Number.parseInt(String(v), 10);
	return Number.isFinite(n) ? n : String(v);
};

type ProviderProps = {
	/** optional hint; real id comes from the server cookie after start */
	gameId?: Id | null;
	children: React.ReactNode;
};

const GameProvider: FC<ProviderProps> = ({ gameId = null, children }) => {
	const [currentId, setCurrentId] = useState<Id | null>(() => toId(gameId));
	const [game, setGame] = useState<Game | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	useEffect(() => {
		setCurrentId(toId(gameId));
	}, [gameId]);

	const key = useMemo(() => String(currentId ?? 'none'), [currentId]);

	const refresh = async () => {
		setLoading(true);
		setError(undefined);
		try {
			const res = await fetch('/api/game/state', { cache: 'no-store' });
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || 'Failed to load game');

			const srvGame: Game = json?.game ?? null;
			setGame(srvGame);
			setCurrentId(srvGame?.id ?? null);
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to load game'));
			setGame(undefined);
		} finally {
			setLoading(false);
		}
	};

	const startGame = async () => {
		setLoading(true);
		setError(undefined);
		try {
			const res = await fetch('/api/game/start', { method: 'POST' });
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || 'Failed to start game');
			// cookies set server-side; just refresh to fetch the state
			await refresh();
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to start game'));
		} finally {
			setLoading(false);
		}
	};

	const mark = async (page: number) => {
		if (!(page >= 1 && page <= 6)) {
			setError(new Error('Page must be between 1 and 6'));
			return;
		}
		setLoading(true);
		setError(undefined);
		try {
			const res = await fetch('/api/game/progress', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ page }),
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || 'Failed to update progress');
			await refresh();
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to update progress'));
		} finally {
			setLoading(false);
		}
	};

	const completeGame = async () => {
		setLoading(true);
		setError(undefined);
		try {
			const res = await fetch('/api/game/complete', { method: 'POST' });
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || 'Failed to complete game');
			await refresh();
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to complete game'));
		} finally {
			setLoading(false);
		}
	};

	// auto-load on mount & whenever the provided id hint changes
	useEffect(() => {
		refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	const value = useMemo<GameContextValue>(
		() => ({
			gameId: currentId,
			setGameId: setCurrentId,
			game,
			loading,
			error,
			refresh,
			startGame,
			mark,
			completeGame,
		}),
		[currentId, game, loading, error],
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
};

export default GameProvider;
