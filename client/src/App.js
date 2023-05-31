import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Homepage from './Pages/homepage';
import Axios from 'axios'
import Player from './Music player/player';

function App() {

  const [songName, setSongName] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [fileData, setFileData] = useState('')
  const [songList, setSongList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setSongList(response.data);
    })
  })

  const submitSong = () => {
    Axios.post('http://localhost:3001/api/insert', {
      songName: songName, 
      songArtist: songArtist,
      fileData: fileData,
    }).then(() => {
      alert("success");
    })
  }

  const deleteSong = (song) => {
    Axios.delete(`http://localhost:3001/api/delete/${song}`)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      // Send the fileData to your backend for storage
      // You can use an API call (e.g., Fetch API or Axios) to send the data
      // Make sure to handle the file upload on the backend side as well
    };

    reader.readAsArrayBuffer(file);

    console.log();
  };

  return (
    <div className="App">
      <Homepage />

      <div className='form'>
        <label>Song name:</label>
        <input type="text" name="songName" onChange={(e)=>{
            setSongName(e.target.value)
          }}/>
        <label>Artist name:</label>
        <input type="text" name="artistName" onChange={(e)=>{
            setSongArtist(e.target.value)
          }}/>
        <label>Select file:</label>
        <input type="file" name="file" onChange={(e)=>{
          handleFileUpload(e)
        }} />

        <button onClick={submitSong}>Submit</button>

        {songList.map((val) => {
          return (
            <div className='card'>
              
              <h1>{val.songName}</h1>
              <p>By {val.songArtist}</p>
              <Player />
              <button className='cardButton'>Like</button>
              <button className='cardButton' onClick={() => {deleteSong(val.songName)}}>Delete</button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;
