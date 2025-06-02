"use client";

import { useEditFormStore, useTaskStore } from "../store";
import { Slide, toast } from "react-toastify";

export default function EditForm() {
  const {
    taskId,
    title,
    description,
    setTitle,
    setDescription,
    setClosed,
    clearEditForm,
  } = useEditFormStore();

  const { updateTask, deleteTask, markTask, completedTasks } = useTaskStore();

  if (!taskId) return null; // zabezpieczenie — nie wyświetlaj, jeśli brak ID

  const handleSave = () => {
    if (taskId && title.trim() !== "") {
      updateTask(taskId, title, description);
      setClosed(true);
      clearEditForm();
    }
  };

  const handleDelete = () => {
    if (taskId) {
      deleteTask(taskId);
      setClosed(true);
      clearEditForm();
    }
  };

  const handleMarkDone = () => {
    if (taskId) {
      markTask(taskId);
      setClosed(true);
      clearEditForm();
    }
  };

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

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="bg-white border-1 border-black w-[24rem] rounded-[.35rem] flex flex-col items-center">
        <h1 className="mt-6 text-xl font-bold">Edit Task</h1>

        {/* Title */}
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title.."
          type="text"
          className="border-1 border-black p-4 m-3 w-[21.5rem] rounded-[.35rem]"
        />

        {/* Description */}
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description.."
          type="text"
          className="border-1 border-black p-4 m-3 w-[21.5rem] rounded-[.35rem]"
        />

        <div className="flex gap-2 m-3">
          {/* Save button */}
          <div
            onClick={() => {
              success("You've saved your changes!");
              handleSave();
            }}
            className="hover:bg-green-300 border-1 border-black bg-green-400 p-4 w-[14rem] text-center cursor-pointer rounded-[.35rem]"
          >
            SAVE
          </div>

          {/* Mark done button */}
          <div
            onClick={() => {
              success("You've completed your task!");
              handleMarkDone();
            }}
            className="flex items-center justify-center hover:bg-green-300 border border-black bg-green-400 p-3 w-[4rem] cursor-pointer rounded-[.35rem]"
          >
            <svg
              className="w-8 h-8 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Cancel button */}
        <p
          onClick={() => {
            setClosed(true);
            clearEditForm();
          }}
          className="underline opacity-55 cursor-pointer mb-2"
        >
          cancel
        </p>

        {/* Delete button */}
        <p
          onClick={() => {
            success("You've deleted your task!");
            handleDelete();
          }}
          className="underline opacity-55 cursor-pointer mb-4 text-red-500"
        >
          delete
        </p>
      </div>
    </div>
  );
}
