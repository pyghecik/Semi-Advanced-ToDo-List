"use client";

import { useEditFormStore } from "../store";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  tableId: string;
};

export default function Task({ id, title, description }: TaskProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const { setTaskId, setTitle, setDescription, setClosed } = useEditFormStore();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleEditClick = () => {
    setTaskId(id);
    setTitle(title);
    setDescription(description);
    setClosed(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="bg-white border border-black p-2 w-[21rem] min-h-[5rem] rounded-[.35rem] flex items-center gap-2 touch-none"
        {...listeners}
        {...attributes}
      >
        <div className="flex-1 overflow-hidden break-words cursor-grab">
          <h1 className="select-none">{title}</h1>
        </div>

        <svg
          onMouseEnter={() => setShow(false)}
          onMouseLeave={() => setShow(true)}
          onClick={handleEditClick}
          className="w-6 h-6 text-black cursor-pointer self-center flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
      </div>

      {show && description && (
        <div
          className="absolute max-w-[18.5rem] w-max border border-black p-2 bg-white text-sm px-2 py-1 rounded z-50 pointer-events-none break-words select-none"
          style={{
            left: pos.x + 10,
            top: pos.y + 10,
            position: "fixed",
          }}
        >
          {description}
        </div>
      )}
    </>
  );
}
