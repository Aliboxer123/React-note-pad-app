import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
const notesContext = React.createContext()

export default function App() {
    const saved = JSON.parse(localStorage.getItem('notes'))
     const [note, setNotes] = React.useState({id: '', text: '', isEditing: ''})
     const [notesContainer, setNotesContainer] = React.useState(saved ? saved : [])
    function addToContainer(data) {
        setNotesContainer(oldData => {
            return  [...oldData, data]
        })
    }
return (
<notesContext.Provider value={{ addToContainer, notesContainer, setNotesContainer, note, setNotes }}>
<main>        
<Sidebar />     
<MainContent />
</main>
</notesContext.Provider>
)    
}

export {notesContext}