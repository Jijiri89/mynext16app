'use client'
import Image from "next/image";
import { useState } from "react";

function Home() {
  const [counter,setCounter]=useState(0);
  const increaseCount=()=>{
    setCounter(c=>c+1);
  }

  const decreaseCount=()=>{
   if(counter>0)
     setCounter(c=>c-1);
  }

  return (
    <div className="m-5 ">Hello Nextjs 16
    <p className="px-10">{counter}</p>
    <br />
    <button className="px-10 my-2 bg-blue-700 text-white" onClick={increaseCount}>Add</button>
    <br />
    <button className="px-5 bg-red-700 text-white" onClick={decreaseCount}>Decrease</button>
    </div>
   
  );
}
export default Home;