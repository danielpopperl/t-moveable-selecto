"use client";
import MoveableTest from "@/components/moveable";
import dynamic from "next/dynamic";
import React, { createRef, useEffect, useRef, useState } from "react";
import { unmountComponentAtNode } from "react-dom";

export default function Home() {
  const [inst, setInst] = useState([]);
  const [increment, setIncrement] = useState(0);

  function newI(e) {
    setIncrement((prev) => increment + 1);
  }
  function newI2(e) {
    setIncrement((prev) => increment - 1);
  }

  return (
    <div className="moveable app">
      <button onClick={(e) => newI(e)}> TEST </button>
      <button onClick={(e) => newI2(e)}> decre </button>

      <div className="max-w-8 max-h-30 bg-white">
        <MoveableTest counter={increment} />
      </div>
    </div>
  );
}
