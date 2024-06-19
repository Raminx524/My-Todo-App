import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export function TodoDetails(props) {
  const BASE_URL = "http://localhost:8001/todos";
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState(false);
  const label = { inputProps: { "aria-label": "isComplete Status" } };
  const { handleSnackBar } = props;
  const { id } = useParams();

  async function onCheckBox(todoToUpdate, newStatus) {
    try {
      await fetch(`${BASE_URL}/${todoToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todoToUpdate, isComplete: newStatus }),
      });
      setStatus((prevStatus) => !prevStatus);
    } catch (err) {
      console.log(err);
    }
  }

  async function onDelete(todoId) {
    try {
      await fetch(`${BASE_URL}/${todoId}`, { method: "DELETE" });
      handleSnackBar("Todo Deleted Successfully");
    } catch (err) {
      console.log(err);
      handleSnackBar("Something Went Wrong!");
    }
  }

  async function fetchTodo() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const resTodo = await res.json();
      setTodo(resTodo);
      setLoading(false);
      setStatus(resTodo.isComplete);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchTodo();
  }, []);

  if (loading) return <div>loading...</div>;
  else
    return (
      <>
        <h1>TodoDetails</h1>
        <div className="todo-content">
          <h2>{todo.title}</h2>
          <div className="input-container">
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={status}
                  color="success"
                  onChange={(e) => onCheckBox(todo, e.target.checked)}
                />
              }
              label="Complete"
            />
            <Tooltip title="Delete Todo">
              <div className="del-btn" onClick={() => onDelete(todo.id)}>
                🗑️
              </div>
            </Tooltip>
          </div>
        </div>
      </>
    );
}
