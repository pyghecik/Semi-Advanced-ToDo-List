// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

/* ------------------------------- CreateFormStore --------------------------------- */
type CreateFormState = {
  selectedType: number;
  title: string;
  description: string;
  color: string;
  created: boolean;
  closed: boolean;

  setSelectedType: (type: number) => void;
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setColor: (color: string) => void;
  setCreated: (created: boolean) => void;
  setClosed: (closed: boolean) => void;
  clearInput: () => void;
};

export const useCreateFormStore = create<CreateFormState>()(
  persist(
    (set) => ({
      selectedType: 0,
      title: "",
      description: "",
      color: "#75ed8f",
      created: false,
      closed: true,

      setSelectedType: (type) => set({ selectedType: type }),
      setTitle: (title) => set({ title }),
      setDescription: (desc) => set({ description: desc }),
      setColor: (color) => set({ color }),
      setCreated: (created) => set({ created }),
      setClosed: (closed) => set({ closed }),

      clearInput: () =>
        set({
          selectedType: 0,
          title: "",
          description: "",
          color: "#75ed8f",
        }),
    }),
    {
      name: "create-form-storage",
    }
  )
);

/* ------------------------------- TableStore --------------------------------- */
export type Table = {
  id: string;
  title: string;
  color: string;
};

type TableStore = {
  tables: Table[];
  addTable: (title: string, color: string) => void;
  removeTable: (id: string) => void;
};

export const useTableStore = create<TableStore>()(
  persist(
    (set) => ({
      tables: [],
      addTable: (title, color) =>
        set((state) => ({
          tables: [
            ...state.tables,
            {
              id: uuidv4(),
              title,
              color,
            },
          ],
        })),
      removeTable: (id) =>
        set((state) => ({
          tables: state.tables.filter((table) => table.id !== id),
        })),
    }),
    {
      name: "table-storage",
    }
  )
);

/* ------------------------------- TaskStore --------------------------------- */
export type Task = {
  id: string;
  title: string;
  description: string;
  tableId: string;
};

type CompletedTask = {
  id: string;
  title: string;
  description: string;
  completedAt: string;
};

type TaskStore = {
  tasks: Task[];
  completedTasks: CompletedTask[];
  addTask: (tableId: string, title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  markTask: (id: string) => void;
  moveTask: (id: string, newTableId: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      completedTasks: [],
      addTask: (tableId, title, description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuidv4(),
              title,
              description,
              tableId,
            },
          ],
        })),
      updateTask: (id, title, description) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title, description } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      markTask: (id) =>
        set((state) => {
          const taskToMark = state.tasks.find((task) => task.id === id);
          if (!taskToMark) return {};

          const formattedDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          return {
            tasks: state.tasks.filter((task) => task.id !== id),
            completedTasks: [
              ...state.completedTasks,
              {
                id: taskToMark.id,
                title: taskToMark.title,
                description: taskToMark.description,
                completedAt: formattedDate,
              },
            ],
          };
        }),
      moveTask: (id, newTableId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, tableId: newTableId } : task
          ),
        })),
    }),
    {
      name: "task-storage",
    }
  )
);

/* ------------------------------- EditFormStore --------------------------------- */
type EditFormState = {
  taskId: string | null;
  title: string;
  description: string;
  saved: boolean;
  closed: boolean;

  setTaskId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setSaved: (saved: boolean) => void;
  setClosed: (closed: boolean) => void;
  clearEditForm: () => void;
};

export const useEditFormStore = create<EditFormState>()(
  persist(
    (set) => ({
      taskId: null,
      title: "",
      description: "",
      saved: false,
      closed: true,

      setTaskId: (id) => set({ taskId: id }),
      setTitle: (title) => set({ title }),
      setDescription: (desc) => set({ description: desc }),
      setSaved: (saved) => set({ saved }),
      setClosed: (closed) => set({ closed }),

      clearEditForm: () =>
        set({
          taskId: null,
          title: "",
          description: "",
          saved: false,
          closed: true,
        }),
    }),
    {
      name: "edit-form-storage",
    }
  )
);
