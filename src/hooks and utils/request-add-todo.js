export const requestAddTodo = (newTodo) => {
    if (!newTodo.trim()) return Promise.reject('Заголовок не может быть пустым');
    const newTask = { title: newTodo, completed: false };

    return fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(newTask),
    })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Новая задача добавлена, ответ от сервера:', response);
            return response; // Возвращаем ответ, чтобы его можно было использовать снаружи
        });
};
