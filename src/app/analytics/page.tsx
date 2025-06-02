"use client";

import Navbar from "../components/navbar";
import CompletedTasksChart from "../components/completedTasksChart";
import { useTaskStore } from "../store";

export default function Home() {
  const { completedTasks } = useTaskStore();

  return (
    <>
      <Navbar />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {completedTasks.length == 0 ? (
          <h1 className="text-2xl font-light mb-4">
            Complete created task to see analytics!
          </h1>
        ) : (
          <>
            <h1 className="text-2xl font-light mb-4">Completed tasks!</h1>
            <CompletedTasksChart />
          </>
        )}
      </div>
    </>
  );
}
