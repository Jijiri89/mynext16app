"use client";
import { useState, useEffect } from "react";

export default function PostPage() {
  const [posts, setPosts] = useState<{ id: number; title: string; author: string }[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Load all posts from API
  const loadPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  // Create a new post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    if (res.ok) {
      setTitle("");
      setAuthor("");
      loadPosts(); // reload list
    } else {
      alert("Failed to create post");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>

      {/* Display Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border p-3 rounded shadow-sm hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600">By {post.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
