"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const priorities = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const [selectedPriority, setSelectedPriority] = useState<string>("1");

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value);
  };

  const handleAddTask = () => {
    if (title.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority: selectedPriority,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setSelectedPriority("1");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="w-2/3 h-screen border-[#575757] border rounded-3xl flex flex-col bg-[#201F1F]">
      <div className="flex flex-col py-5 gap-4 px-10">
        <input
          className="border-0 outline-none focus:outline-none bg-transparent"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          className="border-0 outline-none focus:outline-none bg-transparent"
          placeholder="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="flex flex-row pb-5 gap-4 px-10">
        <div>
          <span>Priority:</span>
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="bg-transparent outline-none focus:outline-none"
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex ml-auto gap-4">
          <button
            className="bg-red-500 p-1 rounded-md"
            onClick={() => {
              setTitle("");
              setDescription("");
              setSelectedPriority("1");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 p-1 rounded-md"
            onClick={handleAddTask}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border-[#575757] py-5 border-t border-b flex px-10 flex-row gap-5"
          >
            <span className="flex justify-center items-center text-white">
              {task.id}
            </span>
            <div className="flex flex-col">
              <span className="text-white">{task.title}</span>
              <span className="text-gray-400">{task.description}</span>
            </div>
            <span className="text-white">Priority: {task.priority}</span>
            <button
              className="ml-auto bg-red-500 p-1 rounded-md text-white"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
