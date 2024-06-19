import { useEffect, useState, useMemo } from "react";
import { TodoList } from "../components/TodoList";
import { AddTodoForm } from "../components/AddTodo";
import { Stats } from "../components/Stats";
import { Filter } from "../components/Filter";
import { SimpleSnackbar } from "../components/SimpleSnackbar";
import { Link, Outlet, useLocation } from "react-router-dom";
const BASE_URL = "http://localhost:8001/todos";

export function TodoPage() {
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
        handleSnackBar("No response from Json-Server");
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

  return (
    <>
      <h1>My Todos:</h1>
      <Stats todos={todos} />
      <div className="filter-and-btn">
        <Filter
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          selectVal={selectVal}
          setSelectVal={setSelectVal}
        />
        <Link to="/todos/create">Add Todo</Link>
      </div>
      <div className="content">
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          loading={loading}
        />
      </div>
      <Outlet />
    </>
  );
}
