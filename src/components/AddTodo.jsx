import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function AddTodoForm(props) {
  const { onAdd } = props;
  return (
    <form id="addTodoForm">
      <h2>Add Todo</h2>
      <div className="form-inputs">
        <label htmlFor="todoTitle">Title:</label>
        <TextField
          id="todoTitle"
          label="Todo Name"
          name="todoTitle"
          variant="outlined"
        />
        <Button variant="contained" onClick={onAdd}>
          Add Todo
        </Button>
      </div>
    </form>
  );
}
