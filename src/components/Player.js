import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCaretLeft, faCaretRight, faPause, faHeart } from '@fortawesome/free-solid-svg-icons'

const LOCAL_STORAGE_KEY = 'likeSong'

function Player({currentSong}) {
    const localLike = JSON.parse(localStorage.getItem('likeSong')) || [];
    function hearthColor (){
        const like = document.querySelector(".like-button");
        like.style.color = "#1ed760";
    }
    function backHearthColor ()  {
        const like = document.querySelector(".like-button");
        like.style.color = "#fff";
    }
    localLike.map(id => {
        const likeId = id
        if(likeId === currentSong.id){
            hearthColor()
        }
    })
    
    function likeSong(){
        if(localLike.indexOf(currentSong.id) === -1){
            localLike.push(currentSong.id)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localLike))
            hearthColor()
        }else{
            const ind = localLike.indexOf(currentSong.id);
            localLike.splice(ind, 1)
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localLike))
            backHearthColor();
        }
    }

    return ( 
    <div className="player-content">
        <div className="player">
            <div className='song-image-with-name'>
                <div>
                    <img src={currentSong.image} className='current-song-image'  alt=""/>
                </div>
                <div className='play-song-information'>
                    <span className="play-song-name">
                        {currentSong.name}
                    </span> 
                    <span className='singer-name fs-12'>
                    {currentSong.artist}
                    </span>
                </div>
            </div>{/* End of .song-image-with-name */}
            <div className="player-buttons">
                <div className="pause-button player-buttons-icon fs-25">
                    <FontAwesomeIcon icon={faPause} />
                </div>
                <button className="previous-button player-buttons-icon fs-30">
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>

                <button className="like-button player-buttons-icon fs-20" onClick={likeSong}>
                    <FontAwesomeIcon icon={faHeart}  />
                </button> 
                
                <button className="next-button player-buttons-icon fs-30 ">
                    <FontAwesomeIcon icon={faCaretRight} />     
                </button>
            </div>{/* End of .player-buttons */}
        </div>{/* End of .player */}
    </div>
  )
}

export default Player