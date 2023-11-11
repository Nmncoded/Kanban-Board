'use client'

import Image from 'next/image'
import RootLayout from './layout'
import CardItem from '@/components/cardItem';
import board_data from '../../data/board-data.json';
import { useEffect, useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import Columns from '@/components/boardColumns';

export default function Home() {
  const [ready, setReady] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(0);
  const [boardData, setBoardData] = useState(board_data);

  const onDragEnd = (re: any) => {
    // if (!re.destination) return;
    console.log(re);
    // let newBoardData = boardData;
    // var dragItem =
    //   newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    // newBoardData[parseInt(re.source.droppableId)].items.splice(
    //   re.source.index,
    //   1
    // );
    // newBoardData[parseInt(re.destination.droppableId)].items.splice(
    //   re.destination.index,
    //   0,
    //   dragItem
    // );
    // setBoardData(newBoardData);
  };

  const handleAddTaskBtn = (e: any, id: number) => {
    // console.log(id);
    setFormVisibility(id);
  }

  const ontextChange = (e: any) => {
    console.log(e, e.target.value);
    if (e.keyCode === 13) {
      const { value } = e?.target;
      if (value?.length === 0) {
        setFormVisibility(0);
      } else {
        const boardId = Number(e.target.attributes['data-id'].value);
        console.log(boardId, isFormVisible);
        const item = {
          priority: Math.round(Math.random() * 3),
          id: Math.random(),
          title: value,
          chat: Math.round(Math.random() * 10),
        }
        const newBoardData = boardData;
        newBoardData[boardId]?.items?.push(item);
        setBoardData(newBoardData);
        setFormVisibility(0);
        e.target.value = '';
      }
    }
  }

  return (
    <section className='pl-10 pr-10' >
      <DndContext onDragEnd={onDragEnd} >
      {/* Board header */}
      <div className='flex justify-between' >
        <div className='flex items-center' >
          <h4 className='text-4xl font-bold text-gray-600' >Studio Board</h4>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 p-1 text-gray-500 rounded-full bg-white ml-5 shadow-xl">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        <div>
          <ul className='flex space-x-3 items-center' >
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </li>
            <li>
              <button className='border border-dashed flex items-center w-8 h-8 border-gray-500 rounded-full justify-center' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Board columns */}
        <div className='grid grid-cols-3 gap-5 my-5'  >
          {
            boardData?.map((board, index) => (
              <Columns index={index} handleAddTaskBtn={handleAddTaskBtn} ontextChange={ontextChange} key={index} board={board} boardData={boardData} setBoardData={setBoardData} isFormVisible={isFormVisible} />

            ))
          }
        </div>
      </DndContext>
    </section>
  )
}