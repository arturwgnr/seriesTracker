import { useReducer, createContext, useContext } from "react";

interface Series {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string;
}

interface SeriesState {
  favourites: Series[];
}

type SeriesAction =
  | { type: "ADD_FAV"; payload: Series }
  | { type: "REMOVE_FAV"; payload: number };

function seriesReducer(state: SeriesState, action: SeriesAction): SeriesState {
  switch (action.type) {
    case "ADD_FAV":
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };

    case "REMOVE_FAV":
      return {
        ...state,
        favourites: state.favourites.filter((s) => s.id !== action.payload),
      };

    default:
      return state;
  }
}

const initialState: SeriesState = {
  favourites: [],
};

const SeriesContext = createContext<{
  state: SeriesState;
  dispatch: React.Dispatch<SeriesAction>;
} | undefined>(undefined);

export default function SeriesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(seriesReducer, initialState);

  return (
    <SeriesContext.Provider value={{ state, dispatch }}>
      {children}
    </SeriesContext.Provider>
  );
}

export function useSeries() {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries must be used within a SeriesProvider");
  }
  return context; // 🔹 faltava isso
}
