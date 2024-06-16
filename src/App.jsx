import { useEffect, useState, useMemo } from "react";
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodo";
import { Stats } from "./components/Stats";
import { Filter } from "./components/Filter";
const BASE_URL = "http://localhost:8001/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  useEffect(() => {
    async function getTodos() {
      try {
        setLoading(true);
        const fetchedData = await (await fetch(BASE_URL)).json();
        setTodos(fetchedData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, []);
  useEffect(() => console.log(todos), [todos]);

  const filteredTodos = useMemo(() => {
    if (selectVal !== "") {
      return todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchVal.toLowerCase()) &&
          todo.isComplete === selectVal
      );
    }
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [todos, searchVal, selectVal]);

  async function onCheckBox(todoToUpdate, newStatus) {
    try {
      const res = await fetch(`${BASE_URL}/${todoToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todoToUpdate, isComplete: newStatus }),
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoToUpdate.id) {
            return newTodo;
          }
          return todo;
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function onDelete(todoId) {
    try {
      await fetch(`${BASE_URL}/${todoId}`, { method: "DELETE" });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId);
      });
    } catch (err) {
      console.log(err);
    }
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
      formElem.todoTitle.value = "";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>My Todos:</h1>
      <Stats todos={todos} />
      <Filter
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        selectVal={selectVal}
        setSelectVal={setSelectVal}
      />
      <div className="content">
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          loading={loading}
          onCheckBox={onCheckBox}
          onDelete={onDelete}
        />
        <AddTodoForm onAdd={onAdd} />
      </div>
    </>
  );
}

export default App;
