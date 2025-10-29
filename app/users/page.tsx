"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load all users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  // 🔹 Create a new user
  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      await loadUsers();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create user");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">👥 User Management</h1>

      {/* Form to create user */}
      <form
        onSubmit={createUser}
        className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {/* Display users */}
      <h2 className="text-xl font-semibold mt-6 mb-2">All Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <ul className="divide-y border rounded bg-white shadow">
          {users.map((user) => (
            <li key={user.id} className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
              <span className="text-gray-500 text-sm">ID: {user.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
