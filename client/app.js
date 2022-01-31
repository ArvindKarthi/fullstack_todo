//variables
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoListContainer = document.querySelector("#todo_list_container");

//functions
const createTodoBox = (todo) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const button = document.createElement("button");
  li.setAttribute("data-todoId", `${todo._id}`);
  p.innerText = todo.name;
  button.innerText = "Delete Todo";
  let liClassList = [
    "flex",
    "justify-between",
    "p-2",
    "shadow-xl",
    "mb-3",
    "rounded-md",
    "items-center"
  ];
  li.classList.add(...liClassList);
  let buttonClassList = [
    "px-3",
    "py-2",
    "text-sm",
    "bg-red-600",
    "text-white",
    "rounded-md",
    "cursor-pointer",
    "self-center"
  ];
  button.classList.add(...buttonClassList);
  button.addEventListener("click", () => {
    deleteTodo(todo._id);
  });
  li.append(p, button);
  return li;
};

const updateTodoContainer = (todo) => {
  todoListContainer.appendChild(createTodoBox(todo));
};

//async functions
const getAllTodos = async () => {
  try {
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    if (data?.todosList) {
      todoListContainer.innerHTML = "";
      data.todosList.forEach((data) => {
        updateTodoContainer(data);
      });
    }
  } catch (err) {
    console.log(err);
    !todoListContainer.classList.contains("hidden") &&
      todoListContainer.classList.add("hidden");
  }
};
getAllTodos();

const addTodo = async (todoValue) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let data = JSON.stringify({
    "todo": {
      name: todoValue,
      priority: "normal"
    }
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow"
  };
  try {
    const res = await fetch(
      "http://localhost:3000/todos/create",
      requestOptions
    );
    const resData = await res.json();
    updateTodoContainer(resData.todo);
  } catch (err) {
    console.log(err);
  }
};

async function deleteTodo(id) {
  try {
    let requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    const res = await fetch(
      `http://localhost:3000/todos/${id}`,
      requestOptions
    );
    const resData = await res.json();
    if (resData?.message) {
      getAllTodos();
    }
  } catch (err) {
    console.log(err);
  }
}

//event listeners
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(todoInput.value);
});
