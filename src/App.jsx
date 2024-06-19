import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TodoPage } from "./Pages/TodosPage";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { Navbar } from "./components/Navbar";
import { AddTodoForm } from "./components/AddTodo";
import { TodoDetails } from "./Pages/TodoDetails";
import { SimpleSnackbar } from "./components/SimpleSnackbar";

export default function App() {
  const BASE_URL = "http://localhost:8001/todos";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleSnackBar(msg) {
    setMessage(msg);
    setOpen(true);
  }

  async function onAdd(e) {
    e.preventDefault();
    const formElem = e.target.parentNode.parentNode;
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          title: formElem.todoTitle.value,
          isComplete: false,
        }),
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      handleSnackBar("Todo Added Successfully");
      formElem.todoTitle.value = "";
    } catch (err) {
      console.log(err);
      handleSnackBar("Something Went Wrong!");
    }
  }

  return (
    <>
      <Navbar />
      <SimpleSnackbar open={open} setOpen={setOpen} message={message} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos">
          <Route index element={<TodoPage />} />
          <Route
            path=":id"
            element={<TodoDetails handleSnackBar={handleSnackBar} />}
          />
          <Route path="create" element={<AddTodoForm onAdd={onAdd} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
