import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'

function NoteForm() {
    const {createNote}=useContext(NoteContext)
    const [note,setNote]=useState({
        title:"",
      description:""
    })

    const handleSubmit=(e)=>{
        e.preventDefault()
      if(!note.title || !note.description) return
      if(note.title.length > 30 || note.description.length > 100) return
        createNote(note)
        setNote({title:"",description:""})
    }
  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Create a New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          maxLength={30}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <div className="text-sm text-gray-400 mt-1">{note.title.length}/30</div>
        <textarea
          placeholder="Write your note here..."
          maxLength={100}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="5"
          value={note.description}
          onChange={(e) => setNote({ ...note, description: e.target.value })}
        />
        <div className="text-sm text-gray-400 mt-1">{note.description.length}/100</div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default NoteForm