import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {notesContext} from './App'
export default function Sidebar() {
    const [selected, setSelect] = React.useState(-1)
    const { notesContainer, setNotesContainer } = React.useContext(notesContext)
    
    function del(index) {
        const items = [...notesContainer]
        const unique = items.filter(item => {
            return item.id != index
        })
        setNotesContainer(unique)
    }
    
    function selectFunction(index) {
        if (selected !== index) {
            setSelect(index)
        } else {
            setSelect(-1)
        }
    }

    function onEdit(notes) {
        const tempArr = [...notesContainer]
        const index = notesContainer.indexOf(notes)
        tempArr[index] = notes
        setNotesContainer(tempArr)
    }
    React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesContainer))    
    },[notesContainer])
    
    const noteElem = notesContainer.map(notes => {
        return notes.isEditing ? <div key={notes.id} className='note-box selected' onClick={() => selectFunction(notes.id)}><textarea type="text" onChange={(e) => { notes.text = e.target.value; onEdit(notes) }} value={notes.text} />
        <FontAwesomeIcon className="font-awesome" icon={faCircleCheck} onClick={() => { notes.isEditing = false; onEdit(notes) }} /></div> : <div key={notes.id} className="note-box"><textarea readOnly value={notes.text} /><FontAwesomeIcon className="font-awesome" icon={faPenToSquare} onClick={(e) => { notes.isEditing = true; onEdit(e, notes) }} />
        <FontAwesomeIcon onClick={()=> del(notes.id)} key={notes.id} icon={faCircleXmark } className='icon'/></div>
    })
    return <div>{noteElem}</div>
}