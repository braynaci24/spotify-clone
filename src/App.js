import {useState, useEffect} from 'react' 
import axios from 'axios';
import SongItem from './components/SongItem';
import Player from './components/Player'; 
import LoginLogo from './spotify-logo.png';

function App() {
  const CLIENT_ID = "8f7e9c31cfe241568d2a43638fd48ff4"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
  ];
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [song, setSong] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [albumName, setAlbumName] = useState();
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, [])

  useEffect(() => {
    if(token) {
      getPlaylist();
    }
  }, [token])

  useEffect(() => {
    const getCurrentSong = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      const currentlPlaying = {
        id: data.item.id,
        name: data.item.name,
        artist: data.item.artists[0].name,
        image: data.item.album.images[2].url,
        isPlaying: data.is_playing,
      }
        setCurrentSong(currentlPlaying)
    }
    getCurrentSong();
  }, [token])

  const getPlaylist = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/playlists/37i9dQZF1DX1tyCD9QhIWF", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    setSong(data.tracks.items);
    setAlbumName(data.name)
  }

  return (
    <div className="App">
      <div className="container">
         {!token ?
            <div className="login-page">
              <img src={LoginLogo} alt="" className="login-logo"/>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&&scope=${scope.join(
                    " "
                )}&response_type=${RESPONSE_TYPE}`} className="login-button">Login
                to Spotify</a>
            </div>
            : <div><h3 className="playlist-name">{albumName}</h3><SongItem song={song} currentSong={currentSong && currentSong} setSong={setSong} />  <Player currentSong={currentSong && currentSong} /></div>}
      </div>
    </div>
  );
}

export default App;

