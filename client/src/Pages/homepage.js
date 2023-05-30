import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    // Fetch the music list from the backend API
    fetchMusicList();
  }, []);

  const fetchMusicList = async () => {
    try {
      // Make an API request to fetch the music list from the backend
      const response = await fetch('/api/music');
      if (response.ok) {
        const data = await response.json();
        setMusicList(data);
      } else {
        // Handle error response
        console.error('Failed to fetch music list');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }
  };

  return (
    <div>
      <h1>FMI Music</h1>
      <button onClick={() => console.log('Log in clicked')}>Log In</button>

      <h2>Music List:</h2>
      <ul>
        {musicList.map((music) => (
          <li key={music.id}>{music.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
