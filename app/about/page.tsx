'use client'
import { useState } from "react";

const About = () => {
  const lists = [{'apple': 'Editabl', 'mango': 'Oil','Banna':'Food'}];
  const names=['Kofi','Abu','Sadic','Ama'];

  const [a,b,c,d]=names;
  
  const[count,setCount]=useState(0)

  return (
    <div className="m-5">
      <ul>
        {lists.map((l) => (
          <li key={l.apple}>{l.apple}
          <li>{l.mango}</li>
          <li>{l.Banna}</li>
          </li>
         
        ))}
      </ul>
      {count}
      <br />
      {a}
      {b}
      <br />
       <button onClick={()=>setCount(c=>c+1)}>add</button>
       <br />
       <button onClick={()=>setCount(c=>c-1)}>decrease</button>
    </div>
  );
};

export default About;
