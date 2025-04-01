import { useState } from 'react';
import styles from './app.module.css';
import { Todo } from './components';
import { useDebounce } from './useDebounce'; // импортируем наш хук
import {
    requestAddTodo,
    requestDeleteTodo,
    requestUpdateTodo,
    useRequestGetTodos,
} from './hooks and utils';

export const App = () => {
    const [isRefreshing, setisRefreshing] = useState(false);

    const [newTodo, setNewTodo] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // сырое значение из поля поиска
    const [isSorted, setIsSorted] = useState(false);

    const refreshTodoList = () => setisRefreshing(!isRefreshing);

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
        <div className={styles.app}>
            <h1>Список задач</h1>

            <div className={styles.newTodoPanel}>
                <input
                    className={styles.newTodo}
                    type="text"
                    placeholder="Добавить дело..."
                    value={newTodo}
                    onChange={({ target }) => setNewTodo(target.value)}
                />
                <button onClick={() => requestAddTodo(newTodo, setNewTodo, refreshTodoList)}>
                    Добавить
                </button>
            </div>

            <button onClick={() => setIsSorted(!isSorted)}>
                {isSorted ? 'Отключить сортировку' : 'Сортировать А-Я'}
            </button>
            <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
            />

            <div>
                {sortedTodos.map(({ id, title, completed }) => (
                    <Todo
                        key={id}
                        id={id}
                        title={title}
                        completed={completed}
                        onDelete={requestDeleteTodo}
                        onUpdate={requestUpdateTodo}
                        refreshTodoList={refreshTodoList}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
