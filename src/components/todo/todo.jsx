import { useState } from 'react';
import styles from './todo.module.css';
import { requestDeleteTodo, requestUpdateTodo } from '../../hooksAndUtils';

export const Todo = ({ id, title, completed, refreshTodoList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title || '');

    const handleSaveChanges = async () => {
        try {
            await requestUpdateTodo(id, { title: newTitle });
            refreshTodoList();
            setIsEditing(false); // Закрываем режим редактирования ТОЛЬКО если запрос успешен
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleToggleComplete = async () => {
        try {
            await requestUpdateTodo(id, { completed: !completed });
            refreshTodoList();
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await requestDeleteTodo(id);
            refreshTodoList();
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    return (
        <div className={styles.todo}>
            <div>
                <input type="checkbox" checked={completed} onChange={handleToggleComplete} />
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                ) : (
                    <span>{title || ''}</span>
                )}
            </div>

            <div>
                {isEditing ? (
                    <button onClick={handleSaveChanges}>💾 Сохранить</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>✏️ Редактировать</button>
                )}

                <button onClick={handleDelete}>🗑 Удалить</button>
            </div>
        </div>
    );
};
