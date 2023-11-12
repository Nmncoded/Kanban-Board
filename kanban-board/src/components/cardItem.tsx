'use client'

import { useDeleteItemMutation, useUpdateItemMutation } from "@/features/private/api";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

interface cardItem {
  _id: number;
  priority: number,
  title: String,
  chat: number,

}

type carditemProps = {
  data: cardItem,
  boardData: any,
  setBoardData: any,
  boardId: number,
  index: number,
}

export default function CardItem({ data, setBoardData, boardData, boardId, index }: carditemProps): ReactNode {
  const [canUpdate, setCanUpdate] = useState({ boardId: 0, cardId: 0 });
  const [deleteItem, { isLoading: loading }] = useDeleteItemMutation();
  const [updateItem, { isLoading }] = useUpdateItemMutation();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data?._id
    });

  const handleUpdateBtn = (e: any, boardId: number, cardId: number) => {
    setCanUpdate({ boardId, cardId });
  }

  const ontextChange = (e: any, boardId: number) => {
    console.log(e, e.target.value);
    const { value } = e?.target;
    if (e.keyCode === 13) {
      if (value?.length === 0) {
        setCanUpdate({ boardId: 0, cardId: 0 });
      } else {
        console.log("inside update", canUpdate?.cardId, canUpdate?.boardId, value);
        const body = {
          boardId: canUpdate?.boardId,
          cardId: canUpdate?.cardId,
          title: value
        }
        updateItem({
          body,
        }).unwrap()
          .then(res => {
            // console.log('added done!',res);
            setCanUpdate({ boardId: 0, cardId: 0 });
            e.target.value = '';
          })
          .catch(err => {
            console.log('delete err', err);
          })
      }
    }
  }

  const handleDelete = (boardId: number, cardId: number) => {
    console.log("inside delete", boardId, cardId);
    const body = {
      boardId,
      cardId,
    }
    deleteItem({
      body,
    }).unwrap()
      .then(res => {
        // console.log('added done!',res);
      })
      .catch(err => {
        console.log('delete err', err);
      })
  }


  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition
      }}
      className={`bg-whiite rounded-md p-3 m-3 mt-0 last:mb-0`} >
      {
        (loading || isLoading) && (
          <TopBarProgress />
        )
      }
      <label className={`bg-gradient-to-r px-2 py-1 rounded text-white text-sm ${data?.priority === 0 ? `from-blue-500 to-blue-200` : data?.priority === 1 ? `from-green-500 to-green-200` : `from-red-500 to-red-200`}`} >{data?.priority === 0 ? 'Low Priority' : data?.priority === 1 ? 'Medium Priority' : 'High Priority'}</label>
      {
        canUpdate?.cardId === data?._id ?
          <div className='p-3 w-full' >
            <textarea rows={3} onKeyDown={(e) => ontextChange(e, boardId)} data-id={data?._id} className='border-gray-300 w-full p-2 rounded fous:ring-purple-400' placeholder={`${data?.title || 'Edit task...'}`} />
          </div>
          :
          <h5 className='text-md my-3 text-lg leading-6' >{data?.title || " "}</h5>
      }
      <div className='flex justify-between' >
        <div className='flex items-center space-x-4' >
          <span className='flex items-center space-x-2' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span>{data?.chat}</span>
          </span>
        </div>
        <div className='flex space-x-2' >
          {/* update */}
          {
            (canUpdate?.cardId !== data?._id) && (
              <button onClick={(e) => handleUpdateBtn(e, boardId, data?._id)} className='border border-dashed flex items-center w-8 h-8 border-gray-500 rounded-full justify-center' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </button>
            )
          }

          {/* delete */}
          <button
            onClick={() => handleDelete(boardId, data?._id)}
            className='border border-dashed flex items-center w-8 h-8 border-gray-500 rounded-full justify-center' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}