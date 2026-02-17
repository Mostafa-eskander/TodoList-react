import React, { useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png';
import Todo from './Todo.jsx';
import { useEffect } from 'react';

const TodoList = () => {
    const [todoList,setTodoList] = useState(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []);
    const inputText = useRef();
    const inputDate = useRef()

    // add
    const addTask = () => {
        const textValue = inputText.current.value.trim();
        const dateValue = inputDate.current.value;

        if(textValue === "" && dateValue === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: textValue,
            date: dateValue,
            isComplete: false
        }

        setTodoList((prev) => [...prev, newTodo]);

        inputText.current.value = "";
        inputDate.current.value = "";
    }

    // delete
    const deleteTask = (id) => {
        setTodoList((prev) => {
            return prev.filter((item) => item.id !== id)
        })
    }

    //toggle
    const toggle = (id) => {
        setTodoList((prev) => {
            return (prev.map((item) => {
                if(item.id === id) {
                    return {...item, isComplete: !item.isComplete}
                }
                return item
            })

            )
        })
    } 

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(todoList))
    },[todoList]);

    return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
{/* --- title --- */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="todo_icon" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>
{/* --- input box --- */}
        <div className='flex flex-wrap flex-col sm:flex-row items-center gap-3 my-7'>
                <input ref={inputText} type="text" placeholder='Add You Task' className='bg-violet-300 h-10 py-3 pl-4 pr-2 flex-1 rounded-xl text-white placeholder:text-slate-600' />
                <input ref={inputDate} type="date" className='bg-violet-300 h-10 rounded-xl px-2 w-full sm:w-auto'/>
                <button onClick={addTask} className='bg-violet-400 h-10 w-full text-white rounded-xl hover:bg-violet-600 ease-in-out duration-300 cursor-pointer'>Add +</button>
        </div>
{/* --- todo list --- */}
        <div>
            {todoList.map((item,index) => {
                return <Todo 
                    key={index}
                    id={item.id}
                    text={item.text}
                    date={item.date}
                    isComplete={item.isComplete}
                    deleteItem={deleteTask}
                    toggle={toggle}/>
            })}     
        </div>
    </div>
  )
}

export default TodoList
