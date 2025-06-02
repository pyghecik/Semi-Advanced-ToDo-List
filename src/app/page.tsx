"use client";

import Navbar from "./components/navbar";
import CreateForm from "./components/createForm";
import {
  useCreateFormStore,
  useTableStore,
  useEditFormStore,
  useTaskStore,
} from "./store";
import Table from "./components/table";
import EditForm from "./components/editForm";
import { ToastContainer } from "react-toastify";
import { DndContext } from "@dnd-kit/core";

export default function Home() {
  const { closed: closedCreate, setClosed: setClosedCreate } =
    useCreateFormStore();
  const { closed: closedEdit } = useEditFormStore();
  const { tables } = useTableStore();
  const { moveTask } = useTaskStore();

  return (
    <DndContext
      onDragEnd={(event) => {
        const { over, active } = event;
        if (over && over.id !== active.data.current?.tableId) {
          moveTask(active.id as string, over.id as string);
        }
      }}
    >
      <div>
        <Navbar onClick={() => setClosedCreate(false)} />
        {closedCreate !== true && <CreateForm />}
        {closedEdit !== true && <EditForm />}

        <div className="px-4">
          <div className="flex items-start justify-center flex-wrap">
            {tables.map((table) => (
              <Table
                key={table.id}
                id={table.id}
                title={table.title}
                color={table.color}
              />
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </DndContext>
  );
}
