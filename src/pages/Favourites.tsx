import { useSeries } from "../context/SeriesContext";

export default function Favourites() {
  const { state, dispatch } = useSeries();

  if (state.favourites.length === 0) {
    return <p style={{ padding: "2rem" }}>No favourites yet 💔</p>;
  }

  return (
    <div className="favourites-page">
      <h2>My Favourites</h2>
      <div className="series-grid">
        {state.favourites.map((s) => (
          <div key={s.id} className="series-card">
            <img
              src={s.image ? s.image.medium : "https://via.placeholder.com/210x295"}
              alt={s.name}
            />
            <h3>{s.name}</h3>
            <p>{s.genres.join(", ")}</p>
            <span>⭐ {s.rating.average || "N/A"}</span>
            <button
              onClick={() => dispatch({ type: "REMOVE_FAV", payload: s.id })}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
