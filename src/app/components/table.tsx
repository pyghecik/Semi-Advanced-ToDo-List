"use client";

import { useTaskStore, useTableStore } from "../store";
import Task from "./task";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  title: string;
  color: string;
};

export default function Table({ id, title, color }: Props) {
  const { removeTable } = useTableStore();
  const { tasks } = useTaskStore();
  const { setNodeRef } = useDroppable({ id });

  const tasksForThisTable = tasks.filter((task) => task.tableId === id);

  return (
    <div
      ref={setNodeRef}
      className="border border-black m-[2.75rem] p-4 w-[24rem] rounded-[.35rem]"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl pointer-events-none select-none">{title}</h1>
        <svg
          onClick={() => removeTable(id)}
          className="w-6 h-6 text-black cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.15"
            d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <div className="bg-white border border-black p-2 w-[22rem] min-h-[5rem] rounded-[.35rem] flex flex-col gap-2">
        {tasksForThisTable.length === 0 ? (
          <p className="text-gray-500 pointer-events-none select-none">
            There are no tasks in this table.
          </p>
        ) : (
          tasksForThisTable.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              tableId={id}
            />
          ))
        )}
      </div>
    </div>
  );
}
