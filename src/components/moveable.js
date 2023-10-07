"use client";

import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";

export default function MoveableTest(props) {
  const [targets, setTargets] = useState([]);
  const counter = props.counter;
  const moveR = useRef(null);
  const moveR2 = useRef(null);
  const cubes = [];

  for (let i = 0; i < counter; ++i) {
    cubes.push(i);
  }

  return (
    <div className="elements selecto-area overflow-hidden relative">
      <div>
        <Moveable
          ref={moveR2}
          target={targets}
          resizable={true}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          snappable={true}
          startDragRotate={0}
          throttleDragRotate={0}
          keepRatio={false}
          bounds={{ left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onDrag={(e) => {
            console.log(targets);
            e.target.style.transform = e.transform;
          }}
          onClickGroup={(e) => {
            moveR2.current.clickTarget(e.inputEvent, e.inputTarget);
          }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}
        />

        <Selecto
          ref={moveR}
          dragContainer={".elements"}
          selectableTargets={[".target"]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={false}
          toggleContinueSelect={["shift"]}
          ratio={0}
          keyContainer={window}
          onDragStart={(e) => {
            const moveable = moveR2.current;
            const target = e.inputEvent.target;
            if (
              moveable.isMoveableElement(target) ||
              targets.some((t) => t === target || t.contains(target))
            ) {
              e.stop();
            }
          }}
          onSelectEnd={(e) => {
            const moveable = moveR2.current;
            if (e.isDragStart) {
              e.inputEvent.preventDefault();

              moveable.waitToChangeTarget().then(() => {
                moveable.dragStart(e.inputEvent);
              });
            }
            setTargets(e.selected);
          }}
        />
        <div className="elements selecto-area">
          {cubes.map((i) => (
            <div className="cube target text-red-500 absolute" key={i}>
              OLA
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
