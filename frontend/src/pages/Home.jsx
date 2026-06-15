import React, { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import NoteCard from '../components/NoteCard'

function Home() {
  const {notes,loading, currentPage, totalPages, setCurrentPage} = useContext(NoteContext)
  console.log(notes)

  if(loading){
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg text-gray-600'>Loading...</p>
      </div>
    )
  }
 if(notes.length===0){
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-lg text-gray-700'>No notes available.</p>
    </div>
  )
 }
 return(
  <div>
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
      {notes.map((note)=>(
        <NoteCard key={note._id} note={note}/>
      ))}
    </div>
    {totalPages > 1 && (
      <div className='flex items-center justify-center gap-4 mt-6'>
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span className='text-sm text-gray-700'>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    )}
  </div>
 )
}

export default Home