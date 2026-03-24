import { useState } from "react";

function StarPicker({ rating, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
          }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
        >
          {i <= (hover || rating) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
}

function MovieCard({ movie, onRemove }) {
  return (
    <div
      style={{
        border: "0.5px solid #ccc",
        borderRadius: 12,
        padding: "1rem 1.25rem",
        marginBottom: 12,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ fontWeight: 500, fontSize: 16 }}>{movie.title}</h3>
        <button
          onClick={() => onRemove(movie.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            color: "#999",
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ margin: "6px 0", fontSize: 16 }}>
        {movie.rating
          ? "⭐".repeat(movie.rating) + `  ${movie.rating}/5`
          : "No rating"}
      </div>

      {movie.review && (
        <p
          style={{
            fontSize: 13,
            color: "#666",
            fontStyle: "italic",
            borderTop: "0.5px solid #eee",
            paddingTop: 8,
            marginTop: 6,
          }}
        >
          "{movie.review}"
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  function handleAdd() {
    if (!title.trim()) return;
    setMovies([
      { id: Date.now(), title: title.trim(), review: review.trim(), rating },
      ...movies,
    ]);
    setTitle("");
    setReview("");
    setRating(0);
  }

  function handleRemove(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "1.5rem 1rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: "1.5rem" }}>
        My Movie Watchlist
      </h1>

      {movies.length > 0 && (
        <p style={{ fontSize: 13, color: "#888", marginBottom: "1rem" }}>
          {movies.length} movie{movies.length !== 1 ? "s" : ""} logged
        </p>
      )}

      <div
        style={{
          border: "0.5px solid #ddd",
          borderRadius: 12,
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 12,
            color: "#666",
          }}
        >
          Add a movie
        </h2>

        <input
          type="text"
          placeholder="Movie title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            marginBottom: 10,
            borderRadius: 8,
            border: "0.5px solid #ccc",
            fontSize: 14,
          }}
        />

        <textarea
          rows={2}
          placeholder="Write a review (optional)..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            marginBottom: 10,
            borderRadius: 8,
            border: "0.5px solid #ccc",
            fontSize: 14,
            resize: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <label style={{ fontSize: 13, color: "#666" }}>Rating:</label>
          <StarPicker rating={rating} onChange={setRating} />
        </div>

        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 8,
            border: "0.5px solid #ccc",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            background: "none",
          }}
        >
          Add to watchlist
        </button>
      </div>

      {movies.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            padding: "2rem",
            border: "0.5px dashed #ddd",
            borderRadius: 12,
          }}
        >
          No movies yet — add one above!
        </p>
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onRemove={handleRemove} />
        ))
      )}
    </div>
  );
}
