import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: "task1", content: "Task 1", color: "#4fc3f7" },
    { id: "task2", content: "Task 2", color: "#29b6f6" },
    // Add more tasks as needed
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: `${task.color}`,
                      }}
                    >
                      {task.content}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
