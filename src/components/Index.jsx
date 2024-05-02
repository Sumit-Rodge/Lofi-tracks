import React, { useEffect, useRef, useState } from 'react'
import gifsData from '../gifsData';
import songData from '../songData';


export const Index = () => {
    const gifLimit = gifsData.gifs.length;
    const musicLimit = songData.songs.length;

    const [gifs,setGifs] = useState(gifsData.gifs);
    const [music,setMusic] = useState(songData.songs);

    const [randomNumberGif,setRandomNumberGif] = useState(0);
    const [randomNumberMusic,setRandomNumberMusic] = useState(0);
    const [playing,setPlaying]= useState(false);
    const audioElement = useRef();

    function generateRandomNumberGif(limit){
        const random = Math.floor(Math.random() * limit);
        setRandomNumberGif(random);
    }

    function generateRandomNumberMusic(limit){
        const random = Math.floor(Math.random() * limit);
        setRandomNumberMusic(random);
    }

    function reload(){
        generateRandomNumberGif(gifLimit);
        generateRandomNumberMusic(musicLimit);
    }

    function playPause(){
        if(playing === true){
            
                audioElement.current.play();
            
        }else{
            audioElement.current.pause();
        }
    }

    useEffect(()=>{  
        setTimeout(() => {  
            playPause();
        }, 2000);
    },[playing])

    useEffect(()=>{
        reload();
    },[])


  return ( 
    <div className='flex h-screen w-screen text-white'>
        <img src={gifs[randomNumberGif].url}className='w-full object-cover' onDoubleClick={()=>reload()} onClick={()=>setPlaying(!playing)}/>

        <div className='absolute bottom-5 z-10 left-5 font-mono'>
            <h1 className='text-white text-5xl glow'>{music[randomNumberMusic].name}</h1>
            <h1 className='text-3xl my-2'>
                {playing === true ?"Playing":"Paused"}
            </h1>
            <h4 className='italic'>Single tap play/pause, double tap change track </h4>
            <audio src={music[randomNumberMusic].url} controls ref={audioElement} onEnded={()=>reload()}/>
            
        </div>
    </div>
  )
}
