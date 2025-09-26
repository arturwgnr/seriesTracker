import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <header className="landing-hero">
        <h1 className="logo">ᨒ Series Tracker</h1>
        <p className="tagline">
          Discover, track and favourite your next binge-worthy series.
        </p>

        <div className="landing-actions">
          <Link to="/dashboard" className="btn-primary">Browse Series</Link>
          <Link to="/favourites" className="btn-secondary">My Favourites</Link>
        </div>
      </header>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Powered by TVMaze API • Crafted by Artur Wagner</p>
      </footer>
    </div>
  );
}
