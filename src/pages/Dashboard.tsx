import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSeries } from "../context/SeriesContext";

interface Series {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string;
}

const [dispatch, state] = useSeries()

export default function Dashboard() {
  const nav = useNavigate();

  // 🔹 tipagem explícita
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function fetchSeries() {
    setLoading(true);

    try {
      const res = await fetch("https://api.tvmaze.com/shows");
      const data: Series[] = await res.json();
      setSeries(data);

      console.log("Your response:", data);
    } catch (err) {
      setError(`Message: ${err}`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
  if (!query) return;

  const fetchSearch = async () => {
    setLoading(true);
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await res.json();
    // API retorna { show: Series }
    setSeries(data.map((d: any) => d.show));
    setLoading(false);
  };

  fetchSearch();
}, [query]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo" onClick={() => nav("/dashboard")}>
          ᨒ
        </h2>
        <nav className="sidebar-nav">
          <Link to="/series" className="sidebar-link">
            Browse
          </Link>
          <Link to="/favourites" className="sidebar-link">
            Favourites
          </Link>
          <Link to="/stats" className="sidebar-link">
            Stats
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Series Tracker Dashboard</h1>
          <p className="dashboard-subtitle">
            Find out the best TV Shows out there!
          </p>
        </header>

        <input
  className="search-input"
  type="text"
  placeholder="Search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>

        <section className="dashboard-content">
          {/* Grid de séries */}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <section className="series-grid">
            {series.map((s) => (
              <div key={s.id} className="series-card">
                <img
                  src={
                    s.image
                      ? s.image.medium
                      : "https://via.placeholder.com/210x295"
                  }
                  alt={s.name}
                />
                <h3>{s.name}</h3>
                <p>{s.genres.join(", ")}</p>
                <span>⭐ {s.rating.average || "N/A"}</span> <button onClick={() => dispatch({ type: "ADD_FAV", payload: s })}>
              💛 Add Favourite
              </button>
              </div>
            ))}
          </section>

          <Outlet />
        </section>
      </main>
    </div>
  );
}
