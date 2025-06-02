"use client";

import { useCreateFormStore, useTableStore, useTaskStore } from "../store";
import { Slide, toast } from "react-toastify";

export default function CreateForm() {
  const {
    selectedType,
    setSelectedType,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    created,
    setCreated,
    closed,
    setClosed,
    clearInput,
  } = useCreateFormStore();

  const { addTable, tables } = useTableStore();
  const { addTask } = useTaskStore();

  const style =
    "hover:bg-purple-300 border-1 border-black p-4 m-3 w-[10rem] text-center cursor-pointer rounded-[.35rem] ";

  const success = (message: string) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  const failed = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white border-1 border-black w-[24rem] rounded-[.35rem] flex flex-col items-center">
        <div className="flex mt-6">
          <div
            onClick={() => {
              clearInput();
              setSelectedType(0);
            }}
            className={selectedType !== 0 ? style : style + " bg-purple-300"}
          >
            Task
          </div>
          <div
            onClick={() => {
              clearInput();
              setSelectedType(1);
            }}
            className={selectedType !== 1 ? style : style + " bg-purple-300"}
          >
            Table
          </div>
        </div>

        {/* Title */}
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title.."
          type="text"
          className="border-1 border-black p-4 m-3 w-[21.5rem] rounded-[.35rem] "
        />

        {/* Description / Color */}
        {selectedType !== 1 ? (
          <input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description.."
            type="text"
            className="border-1 border-black p-4 m-3 w-[21.5rem] rounded-[.35rem] "
          />
        ) : (
          <input
            key="color-input"
            name="color"
            value={color}
            type="color"
            onChange={(e) => setColor(e.target.value)}
          />
        )}

        {/* Create button */}
        <div
          onClick={() => {
            if (selectedType === 1 && tables.length === 4) {
              clearInput();
              setClosed(true);
              failed("Can't create more than 4 tables!");
            } else if (selectedType === 1 && title.trim() !== "") {
              // Create new TABLE
              addTable(title, color);
              setClosed(true);
              clearInput();
              success("You've created new table!");
            } else if (selectedType === 0 && title.trim() === "") {
              failed("Add title and description before clicking create!");
            } else if (selectedType === 0 && title !== "") {
              // Create new TASK in first table (if exists)
              if (tables.length === 0) {
                failed("There are no tables, add them before you add tasks!");
                return;
              }

              const firstTableId = tables[0].id;

              addTask(firstTableId, title, description);
              setClosed(true);
              success("You've created new task!");
              clearInput();
            }
          }}
          className="hover:bg-green-300 border-1 border-black bg-green-400 p-4 m-3 w-[14rem] text-center cursor-pointer rounded-[.35rem] "
        >
          CREATE
        </div>

        {/* Cancel button */}
        <p
          onClick={() => setClosed(true)}
          className="underline opacity-55 cursor-pointer mb-4"
        >
          cancel
        </p>
      </div>
    </div>
  );
}
