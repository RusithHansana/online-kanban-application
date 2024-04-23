import React, { useState, useEffect } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAddTasksMutation } from '../../../slices/api/tasksApiSlice.js';

import Task from '../Task/Task';
import { Plus, Trash2 } from 'react-feather'
import { toast } from 'react-toastify';

import './Card.scss';

const Card = ({ card, handleCardDelete }) => {
    const [enabled, setEnabled] = useState(false);
    const [taskList, setTaskList] = useState(card.tasks);
    const [newTask, setNewTask] = useState("");

    const [addTasks] = useAddTasksMutation();

    const handleAddTask = async (e) => {
        if (newTask === "") return;

        if (e.key === 'Enter' || e.type === 'click') {
            try {
                const response = await addTasks({ task: newTask, cardId: card._id }).unwrap();
                response && setTaskList([...taskList, response]);
                e.target.value = "";
            } catch (error) {
                toast.error('Failed to add task');
            }
        }
    }

    const deteleCard = () => {
        handleCardDelete(card._id);
    }

    const handleTaskInput = (e) => {
        setNewTask(e.target.value);
    }

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <div className="app__card">
            <div className="cardheader">
                <h1 className="app__card-title"

                >
                    {card.cardName}
                </h1>
                <Trash2 onClick={() => deteleCard()} />
            </div>
            <Droppable
                droppableId={card._id}
                type="task"
            >
                {
                    (provided) => (
                        <ul
                            className="app__card-tasklist"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                taskList.map((task, index) => (
                                    <Draggable
                                        draggableId={task._id}
                                        index={index}
                                        type="task"
                                        key={task._id}
                                    >
                                        {
                                            (provided) => (
                                                <li
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <Task task={task} />
                                                </li>
                                            )
                                        }
                                    </Draggable>

                                ))}
                            {provided.placeholder}
                            <div className='addtask'>
                                <Plus className='addbtn' onClick={handleAddTask} />
                                <input
                                    type='text'
                                    placeholder='Add new task'
                                    onChange={handleTaskInput}
                                    onKeyDown={handleAddTask}
                                />
                            </div>
                        </ul>
                    )
                }
            </Droppable>
        </div>
    )
}


export default Card;