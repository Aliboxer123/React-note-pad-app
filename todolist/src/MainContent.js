import React from "react";
import { notesContext } from "./App";
import { v4 as uuidv4 } from 'uuid';
export default function MainContent() {
    const uuid = uuidv4();
    const [crossClass, setCrossClass] = React.useState(false)
    const [noteInput, setInputNotes] = React.useState('')
    const {addToContainer,} = React.useContext(notesContext)
    const useRef = React.useRef(null)
    function change(e) {
        const { value } = e.target
        setInputNotes(value)
    }
    React.useEffect(() => {
        if (noteInput) {
        setCrossClass(true)
    }
        else { setCrossClass(false) }   
    }, [noteInput])
    
    function handleSubmit(e) {
        e.preventDefault() 
        if (noteInput) {
            addToContainer({ id: uuid, text: noteInput, isEditing: false })
            setInputNotes('')
            useRef.current.focus()
        }
    }
    
    return (<div><div className="main">Here are your notes! Second branch!</div>
        <form onSubmit={(e) => handleSubmit(e)}><textarea ref={useRef} name="notes" onChange={(e) => change(e)} id="notes" value={noteInput} />
        <button className={!crossClass ? "emptyButton": ''}>Submit here</button>    
        </form>
    </div>)    
}