import { createContext, useState, useEffect } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalNotes, setTotalNotes] = useState(0);
const [limit, setLimit] = useState(10);

//fetch all notes
const getNotes = async (page = currentPage) => {
    setLoading(true);
    try {
        const response = await BACKEND_URL.get(`/get-notes?page=${page}&limit=${limit}`);
        // backend returns { notes, currentPage, totalPages, totalNotes }
        setNotes(response.data.notes || []);
        setCurrentPage(response.data.currentPage || page);
        setTotalPages(response.data.totalPages || 1);
        setTotalNotes(response.data.totalNotes || 0);
    } catch (error) {
        console.error('Error fetching notes:', error);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    getNotes(currentPage);
}, [currentPage, limit])

//create a note
const createNote = async (note) => {
    const payload = { title: note.title, description: note.description };
    await BACKEND_URL.post("/create-note", payload);
    // refresh to page 1 to show newly created note
    setCurrentPage(1);
    await getNotes(1);
}

//update a note
const updateNote = async (id, updatedNote) => {
    await BACKEND_URL.put(`/update-notes/${id}`, updatedNote);
    // refresh current page
    await getNotes(currentPage);
}

//delete a note
const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-notes/${id}`);
    // if deleting last item on page, move back a page if needed
    const isLastItemOnPage = notes.length === 1 && currentPage > 1;
    const newPage = isLastItemOnPage ? currentPage - 1 : currentPage;
    setCurrentPage(newPage);
    await getNotes(newPage);
}
return(
    <NoteContext.Provider value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
        currentPage,
        totalPages,
        totalNotes,
        setCurrentPage,
        limit,
        setLimit,
        getNotes
    }}>
        {children}
    </NoteContext.Provider>
)
}