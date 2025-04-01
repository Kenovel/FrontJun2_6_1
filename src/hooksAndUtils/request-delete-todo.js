export const requestDeleteTodo = (id) => {
    return fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Фен удален, ответ сервера:', response);
            return response; // Возвращаем ответ, чтобы можно было обработать снаружи
        })
        .catch((error) => {
            console.error('Ошибка удаления:', error);
            throw error; // Прокидываем ошибку дальше
        });
};
