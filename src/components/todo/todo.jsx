import { useState } from 'react';
import styles from './todo.module.css';

export const Todo = ({ id, title, completed, onUpdate, onDelete, refreshTodoList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title || '');

    const handleSave = () => {
        // Вызываем onUpdate, передавая обновленный заголовок
        onUpdate(id, { title: newTitle }, refreshTodoList);
        setIsEditing(false);
    };

    return (
        <div className={styles.todo}>
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onUpdate(id, { completed: !completed }, refreshTodoList)}
                />
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
                    <button onClick={handleSave}>💾 Сохранить</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>✏️ Редактировать</button>
                )}

                <button onClick={() => onDelete(id, refreshTodoList)}>🗑 Удалить</button>
            </div>
        </div>
    );
};
