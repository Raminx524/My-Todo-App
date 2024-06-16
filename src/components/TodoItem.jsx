export function TodoItem(props) {
  const { todo, onCheckBox, onDelete } = props;
  return (
    <div className="todo-item" key={todo.id}>
      <h2>{todo.title}</h2>
      <div className="input-container">
        <label htmlFor="isTodoComplete">isCompleted?</label>
        <input
          type="checkbox"
          id="isTodoComplete"
          checked={props.todo.isComplete}
          onChange={(e) => onCheckBox(props.todo, e.target.checked)}
        />
        <div className="del-btn" onClick={() => onDelete(props.todo.id)}>
          🗑️
        </div>
      </div>
    </div>
  );
}
