window.onload = function() {
    const todoInput = document.getElementById('todo');
    const addbtn = document.getElementById('addbtn');
    const list = document.getElementById('todoList');

    let toDoList = JSON.parse(localStorage.getItem('todos')) || [];
    let count = toDoList.length;

    // 기존에 저장된 할 일 목록을 화면에 렌더링
    toDoList.forEach(todo => {
        renderTodoItem(todo);
    });

    addbtn.addEventListener('click', (e) => {
        e.preventDefault();
        count++;

        const newTodo = {
            id: count,
            text: todoInput.value
        };

        toDoList.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(toDoList));

        renderTodoItem(newTodo);

        todoInput.value = ''; // 입력 필드 초기화
    });

    function renderTodoItem(todo) {
        const item = document.createElement("li");
        item.className = "new_todo";
        item.setAttribute('data-id', todo.id);

        const seq = document.createElement("p");
        seq.className = "todoseq";
        seq.innerText = todo.id + ".";

        const text = document.createElement('span');
        text.textContent = todo.text;

        const removebtn = document.createElement('button');
        removebtn.className = "rmbtn";
        removebtn.innerText = "X";

        item.appendChild(seq);
        item.appendChild(text);
        item.appendChild(removebtn);

        list.appendChild(item);

        removebtn.addEventListener('click', (e) => {
            e.preventDefault();
            const item = e.target.parentElement;
            const itemId = parseInt(item.getAttribute('data-id'));

            // 해당 할 일 삭제
            toDoList = toDoList.filter(todo => todo.id !== itemId);
            localStorage.setItem('todos', JSON.stringify(toDoList));
            item.remove();

            // 목록이 비어있으면 count를 0으로 초기화
            if (toDoList.length === 0) {
                count = 0;
            }
        });
    }
};
