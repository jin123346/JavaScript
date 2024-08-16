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
        addTodo();
    });

    // Enter 키를 누를 때 할 일을 추가하는 함수 호출
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enter 키로 인한 기본 동작(폼 제출) 방지
            addTodo();
        }
    });

    function addTodo() {
        count++;

        const newTodo = {
            id: count,
            text: todoInput.value
        };

        toDoList.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(toDoList));

        renderTodoItem(newTodo);

        todoInput.value = ''; // 입력 필드 초기화
    }

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

            toDoList = toDoList.filter(todo => todo.id !== itemId);
            localStorage.setItem('todos', JSON.stringify(toDoList));
            item.remove();

            if (toDoList.length === 0) {
                count = 0;
            }
        });
    }
};
