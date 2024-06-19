import { TodoItem } from "./TodoItem";
import Skeleton from "@mui/material/Skeleton";

export function TodoList(props) {
  const { todos, filteredTodos, loading } = props;

  if (loading) return <Skeleton variant="rounded" width={768} height={200} />;
  if (todos.length === 0) return <p>No Todos Found!</p>;
  return (
    <div className="todos-container">
      {filteredTodos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
}
