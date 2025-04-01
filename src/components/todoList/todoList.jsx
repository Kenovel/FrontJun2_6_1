import { useRequestGetTodos } from '../../hooksAndUtils';
import { useDebounce } from '../../useDebounce';
import { Todo } from '../todo/todo';
import styles from './todoList.module.css';

export const TodoList = ({ isRefreshing, searchQuery, isSorted, setIsSorted, refreshTodoList }) => {
    const { todos } = useRequestGetTodos(isRefreshing);
    // Применяем debounce для searchQuery с задержкой 500 мс
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Используем дебаунсированное значение для фильтрации
    const filteredTodos = todos.filter((todo) =>
        (todo.title || '').toLowerCase().includes((debouncedSearchQuery || '').toLowerCase()),
    );
    const sortedTodos = isSorted
        ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
        : filteredTodos;

    return (
        <div>
            {sortedTodos.map(({ id, title, completed }) => (
                <Todo
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    refreshTodoList={refreshTodoList}
                />
            ))}
        </div>
    );
};
