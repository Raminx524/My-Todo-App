import { Link } from "react-router-dom";

export function TodoItem(props) {
  const { todo } = props;
  return (
    <div className="todo-item" key={todo.id}>
      <h2>{todo.title}</h2>
      <Link to={`/todos/${todo.id}`}>See Details</Link>
    </div>
  );
}
