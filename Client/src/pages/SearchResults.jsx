import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(`/posts/search?q=${query}`);
        console.log("Received search results:", res.data);
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          <pre className="mb-6 bg-gray-100 p-3 rounded text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((post) => (
              <div key={post._id} className="border rounded-xl p-4 shadow">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">
                  Tags: {post.tags.join(", ")}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-3">
                  {post.content.slice(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
