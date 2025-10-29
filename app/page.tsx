"use client";
import React, { useState } from "react";

export default function Page() {
  const [counter, setCounter] = useState<number>(0);

  const increaseCount = () => setCounter(c => c + 1);
  const decreaseCount = () => setCounter(c => (c > 0 ? c - 1 : 0));

  return (
    <div className="p-5">
      <h1>Counter: {counter}</h1>
      <button className="px-5 bg-green-700 text-white mr-2" onClick={increaseCount}>
        Increase
      </button>
      <button className="px-5 bg-red-700 text-white" onClick={decreaseCount}>
        Decrease
      </button>
      <br />
      <input
        type="number"
        value={counter}
        onChange={(e) => setCounter(Number(e.target.value))}
        className="mt-3 border p-2"
      />
    </div>
  );
}
