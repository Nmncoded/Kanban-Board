"use client"
import CardItem from '@/components/cardItem';
import board_data from '../../data/board-data.json';
import { useEffect, useState } from 'react';
import { useDroppable} from '@dnd-kit/core';

export default function Columns({index,board, boardData, setBoardData, isFormVisible,handleAddTaskBtn,ontextChange}) {
  const { isOver, setNodeRef } = useDroppable({ id: board.id, data : board});

  return (
    <div ref={setNodeRef} className={`bg-gray-100 p-3 rounded-md shadow-md flex flex-col relative overflow-hidden`} >
      <span className='w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0' ></span>
      <h4 className='flex justify-between items-center mb-2' >
        <span className='text-2xl text-gray-600' >{board?.name || ' '}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </h4>

      <div className='overflow-y-auto overflow-x-hidden h-auto' style={{ maxHeight: 'calc(100vh - 290px)' }} >
        {
          board?.items?.length > 0 && (
            board?.items?.map((item:any, indx:any) => (
              <CardItem key={item?.id} index={indx} data={item} boardData={boardData} setBoardData={setBoardData} boardId={board?.id} />
            ))
          )
        }

      </div>
      {
        isFormVisible === board?.id ?
          <div className='p-3 w-full' >
            <textarea rows={3} onKeyDown={ontextChange} data-id={index} className='border-gray-300 w-full p-2 rounded fous:ring-purple-400' placeholder='Task info..' />
          </div>
          :
          <button
            onClick={(e) => handleAddTaskBtn(e, board?.id)}
            className='flex justify-center items-center mt-6 space-x-2 text-lg' >
            <span>Add task</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
      }
    </div>
  )
}