


import React from 'react';
import './BadgeCanvas.css'

export interface BadgeCanvasInputProps {
    rank: string,
    emblem: string    
}

export const BadgeCanvas: React.FC<BadgeCanvasInputProps> = ({
    rank,
    emblem  
  }) => {
    return (
        <>
            <div className="container">
            <img className="over" src={emblem} />  
            <img className="under" src={rank} />  
            </div>
        </>
    );}

export default BadgeCanvas;