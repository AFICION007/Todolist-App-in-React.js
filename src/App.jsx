import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const AddTask = (event) => {
    event.preventDefault();
    const todoInput = event.target.elements.task;
    if (todoInput.value) {
      setTodos([...todos, { id: count, task: todoInput.value }]);
      console.log(todos);
      setCount(count + 1);
      todoInput.value = "";
    } else {
      alert("Kindly write task");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(todos);
  };

  const [editingId, setEditingId] = useState(-1);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (id, task) => {
    setEditingId(id);
    setEditedText(task);
  };

  const handleEditSubmit = (id) => {
    if (editedText.trim() !== "") {
      var newTodos = [...todos];

      for (let todo of newTodos) {
        if (todo.id === id) {
          todo.task = editedText.trim();
          break;
        }
      }

      setTodos(newTodos);
    } else {
      handleDelete(id);
    }
    setEditingId(-1);
    setEditedText("");
  };

  const [searchQuery, setSearchQuery] = useState("");
  // Function to filter todos based on the search query
  const filteredTodos = todos.filter(({ task }) =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="form-container">
        <form onSubmit={AddTask}>
          <input id="task" type="text" placeholder="Write task" />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="todolist-container">
        <ul>
          {filteredTodos.map(({ id, task }) => {
            if (id !== editingId) {
              return (
                <li key={id}>
                  {task}
                  <button onClick={() => handleDelete(id)}>delete</button>
                  <button onClick={() => handleEdit(id, task)}>edit</button>
                </li>
              );
            } else {
              return (
                <li>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(event) => setEditedText(event.target.value)}
                  />
                  <button type="button" onClick={() => handleEditSubmit(id)}>
                    submit edit
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="search task"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button>Search</button>
      </div>
    </>
  );
};

export default App;
