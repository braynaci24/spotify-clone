import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SongItem ({ song, currentSong, setSong}) {

    function handleOnDragEnd (results) {
        if (!results.destination) return;
        const items = Array.from(song);
        const [reorderedItem] = items.splice(results.source.index, 1);
        items.splice(results.destination.index, 0, reorderedItem);
        setSong(items);
    }

    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
                {(provided)=> (
                    <div className='items' {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        song.map((items, index) => (
                        <Draggable key={items.track.id} draggableId={items.track.id} index={index}>
                            {(provided) => (
                                <a href={items.track.uri} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='song-item' >
                                    <div className='song-content'>
                                        <img src={items.track.album.images[0].url} className='song-image' alt=""/>
                                        <div className='song-information'>
                                            <span className={currentSong.isPlaying && currentSong.id === items.track.id ? "song-name isPlaying" : "song-name"} >
                                                {items.track.name}
                                            </span>
                                            <div>
                                                <span className='song-lyrics'>
                                                    LYRICS
                                                </span>
                                                <span className='singer-name'>
                                                    {items.track.artists[0].name}
                                                </span>
                                            </div>
                                        </div>{/* End of .song-information */}
                                    </div>{/* End of .song-content */}
                                    <div className='song-settings-icon'>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </div>
                                </a>/* End of .song-item */
                            )}
                        </Draggable>
                        ))
                    }
                    {provided.placeholder}
                    </div>
                )}
            </Droppable >
        </DragDropContext>
    )
}

export default SongItem
