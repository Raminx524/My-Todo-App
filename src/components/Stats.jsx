export function Stats(props) {
  const { todos } = props;
  if (todos.length != 0) {
    const completedTodos = todos.filter((todo) => todo.isComplete);
    const progressVal = completedTodos.length / todos.length;
    return (
      <div className="todos-summary">
        <span>Total Todos: {todos.length}</span>
        <span>Completed: {completedTodos.length}</span>
        <span>Left to Complete: {todos.length - completedTodos.length}</span>
        <div>
          Progress: <progress value={progressVal}></progress>
        </div>
      </div>
    );
  }
  return null;
}
