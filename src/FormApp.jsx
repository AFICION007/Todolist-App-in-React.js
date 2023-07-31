import React, { useEffect, useState } from "react";

const FormApp = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const AddTask = (event) => {
    event.preventDefault();

    const { task, is_completed, category, due_date, priority, subtask, tag } =
      event.target.elements;

    setTodos([
      ...todos,
      {
        id: count,
        task: task.value,
        is_completed: is_completed.value,
        category: category.value,
        due_date: due_date.value,
        priority: priority.value,
        subtask: subtask.value,
        tag: tag.value,
      },
    ]);

    setCount(count + 1);

    event.target.reset();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const FilteredTodos = todos.filter(({ task, subtask, tag }) => {
    return (
      task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subtask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <div className="form-container">
        <form onSubmit={AddTask}>
          <label htmlFor="task">Write task:</label>
          <input id="task" type="text" name="task" placeholder="task" />
          <br />

          <label htmlFor="is_completed" id="checkbox" className="switch">
            Completed:
          </label>
          <input id="is_completed" name="is_completed" type="checkbox" />
          <br />

          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
            <option value="">None</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="shopping">Shopping</option>
            <option value="finance">Finance</option>
            <option value="health and wellness">Health and Wellness</option>
            <option value="social">Social</option>
            <option value="hobbies">Hobbies</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <br />

          <label htmlFor="due_date">Due Date:</label>
          <input id="due_date" name="due_date" type="date" required />
          <br />

          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" required>
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />

          <label htmlFor="subtask">Add subtask:</label>
          <input className="subtask" id="subtask" type="text" required></input>
          {/* <button type="button" onclick="">
          Add another subtask
        </button> */}
          <br />

          <label htmlFor="tag">Add tag:</label>
          <input className="tag" id="tag" type="text" required></input>
          {/* <button type="button" onclick="">
          Add another tag
        </button> */}
          <br />
          <br />

          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="todolist-container">
        <ul>
          {FilteredTodos.map(
            ({
              id,
              task,
              is_completed,
              category,
              due_date,
              priority,
              subtask,
              tag,
            }) => (
              <>
                <li key={id}>
                  <span>{task}</span>
                  <br />
                  <input type="checkbox" checked={is_completed}></input>
                  <br />
                  <span>{category}</span>
                  <br />
                  <span>{due_date}</span>
                  <br />
                  <span>{priority}</span>
                  <br />
                  <span>{subtask}</span>
                  <br />
                  <span>{tag}</span>
                  <br />
                </li>
                <button onClick={() => handleDelete(id)}>delete</button>
                {/* <button
                  onClick={() =>
                    handleEdit(
                      id,
                      task,
                      is_completed,
                      category,
                      due_date,
                      priority,
                      subtask,
                      tag
                    )
                  }
                >
                  edit
                </button> */}
              </>
            )
          )}
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

export default FormApp;
