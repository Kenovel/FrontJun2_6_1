import { useState } from 'react';
import styles from './controlPanel.module.css';
import { requestAddTodo } from '../../hooksAndUtils';

export const ControlPanel = ({
    isSorted,
    setIsSorted,
    searchQuery,
    setSearchQuery,
    refreshTodoList,
}) => {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = async () => {
        try {
            await requestAddTodo(newTodo); // Добавляем задачу
            refreshTodoList(); // Обновляем список задач
            setNewTodo(''); // Очищаем поле ввода
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    };

    return (
        <>
            <div className={styles.newTodoPanel}>
                <input
                    className={styles.newTodo}
                    type="text"
                    placeholder="Добавить дело..."
                    value={newTodo}
                    onChange={({ target }) => setNewTodo(target.value)}
                />
                <button onClick={handleAddTodo}>Добавить</button>
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
        </>
    );
};
