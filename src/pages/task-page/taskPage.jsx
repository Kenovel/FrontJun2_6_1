import { useNavigate, useParams } from 'react-router-dom';
import styles from './taskPage.module.css';
import todoStyles from '../../commonTodoStyles.module.css';
import { useRequestGetTodoById } from '../../hooksAndUtils/use-request-get-todo-by-id';
import { requestDeleteTodo, requestUpdateTodo } from '../../hooksAndUtils';
import { useEffect, useState } from 'react';

export const TaskPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { todo, setTodo } = useRequestGetTodoById(params.id);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title || '');

    useEffect(() => {
        if (isEditing) {
            setNewTitle(todo.title);
        }
    }, [isEditing, todo.title]);

    const handleSaveChanges = async () => {
        try {
            await requestUpdateTodo(todo.id, { title: newTitle });
            setTodo({ ...todo, title: newTitle });
            setIsEditing(false); // Закрываем режим редактирования ТОЛЬКО если запрос успешен
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleToggleComplete = async () => {
        try {
            await requestUpdateTodo(todo.id, { completed: !todo.completed });
            setTodo({ ...todo, completed: !todo.completed });
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await requestDeleteTodo(todo.id);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    return (
        <div>
            <div className={todoStyles.todo}>
                <div className={styles.header}>
                    <button onClick={() => navigate(-1)}>{'<- Вернуться назад'}</button>
                    <div className={styles.todoStatusWrapper}>
                        <span>Статус задачи:</span>
                        <input
                            className={todoStyles.checkbox}
                            type="checkbox"
                            checked={todo.completed}
                            onChange={handleToggleComplete}
                        />
                    </div>
                </div>
                {isEditing ? (
                    <textarea
                        className={styles.todoInput}
                        type="text"
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                ) : (
                    <div className={styles.todoTitle}>{todo.title || ''}</div>
                )}
            </div>

            <div className={styles.buttonPanel}>
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
