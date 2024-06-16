import { TodoItem } from "./TodoItem";

export function TodoList(props) {
  const { todos, filteredTodos, loading, onCheckBox, onDelete } = props;

  if (loading) return <p>Loading...</p>;
  if (todos.length === 0) return <p>No Todos Found!</p>;
  return (
    <div className="todos-container">
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheckBox={onCheckBox}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
