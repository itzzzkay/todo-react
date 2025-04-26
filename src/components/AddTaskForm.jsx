import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const AddTaskForm = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newTodo.title.trim()) {
      console.log("No task added.");
      return;
    }

    const addedTask = { ...newTodo };

    console.log("Sending task to the server:", addedTask);

    try {
      const resp = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedTask),
      });

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        throw new Error("Failed to add task");
      }

      const todoTask = await resp.json();

      console.log("Task added :", todoTask);

      setTodos([...todos, todoTask]);

      setNewTodo({ title: "", completed: false });
    } catch (error) {
      console.error("Error :", error);
    }
  }

  return (
    <div className="add-task-container">
      <form id="add-task-form" onSubmit={handleSubmit}>
        <Input
          id="task-input"
          placeholder="Add a new task..."
          required
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />

        <Button id="add-task-btn">
          <i className="fas fa-plus"></i>
        </Button>
      </form>
    </div>
  );
};
export default AddTaskForm;
