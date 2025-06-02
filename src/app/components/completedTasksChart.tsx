"use client";

import { useTaskStore } from "../store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

// Niestandardowy tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const tasks = payload[0].payload.tasks;

    return (
      <div className="bg-white p-3 rounded border-1 border-black break-words max-w-[20.5rem]">
        <p className="mb-1">Completed tasks:</p>
        {tasks.map((task: any, index: number) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">• {task.title}</p>
            <p className="text-sm text-gray-600 ml-1.5">{task.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function CompletedTasksChart() {
  const completedTasks = useTaskStore((state) => state.completedTasks);

  // Grupuj po dacie, ale zamiast liczby, trzymaj tablice zadań
  const data = useMemo(() => {
    const tasksPerDay: Record<string, typeof completedTasks> = {};

    for (const task of completedTasks) {
      const date = task.completedAt;
      if (!tasksPerDay[date]) {
        tasksPerDay[date] = [];
      }
      tasksPerDay[date].push(task);
    }

    return Object.entries(tasksPerDay).map(([date, tasks]) => ({
      date,
      count: tasks.length,
      tasks,
    }));
  }, [completedTasks]);

  return (
    <div className="w-[700px] h-[400px] bg-white p-6 rounded-[.35rem] border-1 border-black">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
