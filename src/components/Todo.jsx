import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

export default function Todo({text,date,isComplete,id,deleteItem,toggle}) {
    return(
        <div className="flex items-center my-3 gap-2">
            <div onClick={() => toggle(id)} className="flex flex-1 items-center cursor-pointer">
                <img className="w-7" src={isComplete ? tick : not_tick } alt="Mark" />
                <p className={`text-slate-700 ml-4 text-[17px] w-40 decoration-slate-500 overflow-x-scroll ${isComplete ? "line-through" : ""}`}>{text}</p>
                <p className='text-slate-700 pl-7'>{date}</p>
            </div>
            <img onClick={() => deleteItem(id)} className='w-3.5 cursor-pointer' src={delete_icon} alt="delete_icon" />
        </div>
    )
}