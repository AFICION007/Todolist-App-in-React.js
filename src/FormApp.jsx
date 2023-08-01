import React, { useEffect, useMemo, useState } from "react";

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
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    priority: "",
  });

  const handleFilterBy = (event) => {
    event.preventDefault();
    const { filterFrom, filterTo, filterCategory, filterPriority } =
      event.target.elements;

    setFilters({
      fromDate: filterFrom.value,
      toDate: filterTo.value,
      category: filterCategory.value,
      priority: filterPriority.value,
    });
  };

  const handleFilterReset = (event) => {
    event.preventDefault();
    setFilters({
      fromDate: "",
      toDate: "",
      category: "",
      priority: "",
    });

    const filterForm = event.target.closest("form");
    filterForm.reset();
  };

  const filteredTodos = todos.filter(
    ({ task, subtask, tag, due_date, category, priority }) => {
      const isMatchingSearch =
        task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtask.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.toLowerCase().includes(searchQuery.toLowerCase());

      const isMatchingFilter =
        (!filters.fromDate ||
          new Date(due_date) >= new Date(filters.fromDate)) &&
        (!filters.toDate || new Date(due_date) <= new Date(filters.toDate)) &&
        (!filters.category || filters.category === category) &&
        (!filters.priority || filters.priority === priority);

      return isMatchingSearch && isMatchingFilter;
    }
  );

  const [sortby, setSortBy] = useState("");
  const [order, setOrder] = useState("ascending");

  const sortedTodos = useMemo(() => {
    const priorityValues = { low: 0, medium: 1, high: 2 };

    return [...filteredTodos].sort((todo1, todo2) => {
      if (order === "ascending") {
        if (sortby === "due_date") {
          return new Date(todo1.due_date) - new Date(todo2.due_date);
        }
        if (sortby === "priority") {
          return (
            priorityValues[todo1.priority] - priorityValues[todo2.priority]
          );
        }
      } else {
        if (sortby === "due_date") {
          return new Date(todo2.due_date) - new Date(todo1.due_date);
        }
        if (sortby === "priority") {
          return (
            priorityValues[todo2.priority] - priorityValues[todo1.priority]
          );
        }
      }
    });
  }, [filteredTodos, sortby, order]);

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
          {sortedTodos.map(
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
              </li>
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
      <br />

      <div className="filterby-container">
        <span>FILTER BY</span>
        <form
          onSubmit={handleFilterBy}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div>
            <span>Date:</span>
            <br />
            <label htmlFor="filterFrom">From</label>
            <input type="date" id="filterFrom" name="filterFrom" />
            <br />
            <label htmlFor="filterTo">To</label>
            <input type="date" id="filterTo" name="filterTo" />
            <br />
          </div>
          <div>
            <label htmlFor="filterCategory">Category:</label>
            <br />
            <select id="filterCategory" name="filterCategory">
              <option value="">All</option>
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
          </div>
          <div>
            <label htmlFor="filterPriority">Priority:</label>
            <br />
            <select id="filterPriority" name="filterPriority">
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <br />
          </div>
          <button type="submit">Submit filters</button>
          <button onClick={handleFilterReset}>Reset filters</button>
        </form>
      </div>
      <br />

      <div className="sortby-container">
        <span>SORT BY</span>
        <select
          name="sortby"
          id="sortby"
          value={sortby}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="">None</option>
          <option value="due_date">Due date</option>
          <option value="priority">Priority</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select
          name="order"
          id="order"
          value={order}
          onChange={(event) => setOrder(event.target.value)}
        >
          <option value="ascending">ascending</option>
          <option value="descending">descending</option>
        </select>
      </div>
    </>
  );
};

export default FormApp;
