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
type Game = unknown;
type Loader = (gameId: Id) => Promise<Game>;

interface GameContextValue {
  gameId: Id;
  setGameId: React.Dispatch<React.SetStateAction<Id>>;
  game: Game | undefined;
  loading: boolean;
  error: Error | undefined;
  refresh: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

const toId = (v: Id): Id => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : v;
};

type ProviderProps = {
  gameId: Id;
  children: React.ReactNode;
  loader?: Loader;
  games?: Record<string, Game | undefined>;
};

const GameProvider: FC<ProviderProps> = ({ gameId, children, loader, games }) => {
  const [currentId, setCurrentId] = useState<Id>(() => toId(gameId));
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const next = toId(gameId);
    setCurrentId((prev) => (prev !== next ? next : prev));
  }, [gameId]);

  const key = useMemo(() => String(currentId), [currentId]);

  const load = async () => {
    setLoading(true);
    setError(undefined);
    try {
      if (loader) {
        const data = await loader(currentId);
        setGame(data);
      } else if (games) {
        setGame(games[key]);
      } else {
        setGame(undefined);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to load game"));
      setGame(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [key, loader, games]);

  const value = useMemo<GameContextValue>(
    () => ({
      gameId: currentId,
      setGameId: setCurrentId,
      game,
      loading,
      error,
      refresh: load,
    }),
    [currentId, game, loading, error]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
};

export default GameProvider;
