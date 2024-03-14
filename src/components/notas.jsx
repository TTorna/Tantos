import { useState } from "react";

export function Notas(idNota,hora,actividad,info){
    const [showInfo, setShowInfo] = useState(false)
    return(
        <div className='nota'>
            <article>
                <span>{hora}</span>
                <span>{actividad}</span>
                <a id={idNota} href='#' onClick={() => {setShowInfo(!showInfo)}}>info.</a>
            </article>
        </div>)
}