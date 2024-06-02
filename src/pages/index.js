import axios from "axios";
import { useState, useEffect } from "react";



function WeatherCard({ weatherData, city }) {
  if (!weatherData || weatherData.length === 0) return <p>No data</p>;

  return (
    <div>
      <h2>{city}</h2>
      <p>{weatherData[0].cuaca}</p>
      <p>Temperature: {weatherData[0].tempC}°C</p>
      <p>Humidity: {weatherData[0].humidity}%</p>
    </div>
  );
}










export default function Home() {
  const [areas, setAreas] = useState([])
  const [weather, setWeather] = useState([])
  const [yogyakartaWeather, setYogyakartaWeather] = useState([])
  const [jakartaWeather, setJakartaWeather] = useState([])
  const [bandungWeather, setBandungWeather] = useState([])
  const [semarangWeather, setSemarangWeather] = useState([])
  const [baliWeather, setBaliWeather] = useState([])
  const [makassarWeather, setmakassarWeather] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const [selectedCard, setSelectedCard] = useState(null);


  function switchTheme() {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    setIsDarkMode(!isDarkMode);
  }





  const [selectedArea, setSelectedArea] = useState("")
  const [selectedAreaName, setSelectedAreaName] = useState("")
  const [search, setSearch] = useState("")

//for all weather in indo
  useEffect(() => {
    if (selectedArea) {
      axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/${selectedArea}.json`)
        .then((res) => {
          console.log("Success getting data")
          setWeather(res.data)
          //setYogyakartaWeather(res.data)
        })
        .catch((err) => {
          console.log("Error getting data")
        })
    }
  }, [selectedArea])

//darkmode


useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date().getHours());
  }, 3600000); // update evry houars?

  // Clear interval on component unmount
  return () => {
    clearInterval(timer);
  };
}, []);

useEffect(() => {
  const theme = window.localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}, []);

//for search area
useEffect(() => {
  if (search) {
    axios.get(`https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json`)
      .then((response) => {
        const area = response.data.find(area => 
          area.kota.toLowerCase().includes(search.toLowerCase()) || 
          area.propinsi.toLowerCase().includes(search.toLowerCase())
        )
        if (area) {
          setSelectedArea(area.id)
          setSelectedAreaName(area.kota)
        }
      })
      .catch((error) => {
        console.log("error getting data!, fix it!")
      })
  }
}, [search])

  //for jogjakarta weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501190.json") //jogjakarta id
      .then((res) => {
        setYogyakartaWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])

  //for jakarta weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501195.json") //jakarta id
      .then((res) => {
        setJakartaWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])


  //for bandung weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501212.json") //bandung id
      .then((res) => {
        setBandungWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])


  //for semarang weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501262.json") //semarang id
      .then((res) => {
        setSemarangWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])


  //for bali weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501164.json") //bali id
      .then((res) => {
        setBaliWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])


  //for makassar weather info
  useEffect(() => {
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/501495.json") //makassar id
      .then((res) => {
        setmakassarWeather(res.data)
      })
      .catch((err) => {
        console.log("Error getting data")
      })
  }, [])


  const handleSearch = () => {
    const area = areas.find(area => area.kota.toLowerCase() === search.toLowerCase())
    if (area) {
      setSelectedArea(area.id)
      setSelectedAreaName(area.kota)
    }
  }

/*
  const handleSearch = () => {
    setSearch(search)
  }
*/  

  //gettin current data and time (jogja only) (update every 6 hours)
  const now = new Date ();

  const recentWeather = yogyakartaWeather.filter((weather) => {
    const weatherTime = new Date(weather.jamCuaca);
    return now >= weatherTime;
  });
  const displayWeather = recentWeather[recentWeather.length - 1];

  const cityIds = ['JakartaId', 'BandungId', 'SemarangId', 'BaliId', 'MakassarId']; //array of city ids



  return (

<main className="App flex flex-col items-center min-h-screen" style={{ backgroundColor: '#DCD7C9' }}>
  <nav className= "navbar w-full p-4 flex justify-between items-center relative" style={{backgroundColor: 'var(--color-bg)', color: 'var(--color-text)'}}>
    {/* Navbar code start */}
    <div className="text-left text-sm">
      <p className="text-white">
        DI Yogyakarta <br />
        {displayWeather && `${displayWeather.jamCuaca}`} <br />
        {displayWeather && `${displayWeather.cuaca}`} <br />
        {displayWeather && `${displayWeather.tempC}°C`}
      </p>
    </div>

    <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-white">
      <h1 className="font-bold text-2xl">Ledz Weather</h1>
      <p className="text-xs">Weather forecast for Indonesia from BMKG (Badan Meteorologi, Klimatologi, Geofisika)</p>
      <p className="text-xs">The weather updates will change every 6 hours (00:00 - 06:00 - 12:00 - 18:00)</p>
    </div>
{/* seartch bar */}
    <div className="ml-auto flex items-center">
      <input 
        type="text" 
        placeholder="Search city..." 
        className="text-sm text-black mr-2 px-2 py-1 rounded border border-white" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} className="text-sm bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-200">Search</button>
    </div>
  </nav>

  <label className="flex items-center cursor-pointer ml-4">
    <div className="relative">
      <input type="checkbox" className="hidden" checked={isDarkMode} onChange={switchTheme} />
      <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
    </div>
    <div className="ml-3 text-gray-700 font-medium">
      {isDarkMode ? 'Dark mode' : 'Light mode'}
    </div>
  </label>







  {/* nvbar code end */}

  {/* gif */}
  {/* navbar code end */}



  <div className="flex justify-around items-center h-full space-x-20 my-52 container" style={{ backgroundColor: '#DCD7C9' }}>
    <div className={`bg-white p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${selectedCard === 'Jakarta' ? 'focus' : selectedCard ? 'blur' : ''}`} onMouseEnter={() => setSelectedCard('Jakarta')} onMouseLeave={() => setSelectedCard(null)}> 
        <WeatherCard weatherData={jakartaWeather} city="Jakarta" />
    </div>
    <div className={`bg-white p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${selectedCard === 'Bandung' ? 'focus' : selectedCard ? 'blur' : ''}`} onMouseEnter={() => setSelectedCard('Bandung')} onMouseLeave={() => setSelectedCard(null)}>
        <WeatherCard weatherData={bandungWeather} city="Bandung" />
    </div>
    <div className={`bg-white p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${selectedCard === 'Semarang' ? 'focus' : selectedCard ? 'blur' : ''}`} onMouseEnter={() => setSelectedCard('Semarang')} onMouseLeave={() => setSelectedCard(null)}>
        <WeatherCard weatherData={semarangWeather} city="Semarang" />
    </div>
    <div className={`bg-white p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${selectedCard === 'Bali' ? 'focus' : selectedCard ? 'blur' : ''}`} onMouseEnter={() => setSelectedCard('Bali')} onMouseLeave={() => setSelectedCard(null)}>
        <WeatherCard weatherData={baliWeather} city="Bali" />
    </div>
    <div className={`bg-white p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${selectedCard === 'Makassar' ? 'focus' : selectedCard ? 'blur' : ''}`} onMouseEnter={() => setSelectedCard('Makassar')} onMouseLeave={() => setSelectedCard(null)}>
        <WeatherCard weatherData={makassarWeather} city="Makassar" />
    </div>
</div>




{/*
  <button onClick={()=>{
    axios.get("https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json")
    .then((response)=>{
      console.log ("success getting data")
      setAreas(response.data.slice(0, 10))
    })
    .catch((error)=>{
      console.log ("error getting data!, fix it!")
    })
  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
    Get Wilayah
  </button>
*/}


    <section className="mt-4">
    {
      areas.map((area) => {
        return(
          <div 
            className="block hover:underline cursor-pointer text-black bg-gray-200 p-2 rounded mt-2" 
            onClick={() => {
              setSelectedArea(area.id);
              setSelectedAreaName(area.kota); 
            }}
          >
            {area.kota}, Id: {area.id}
          </div>
        )
      })
    }
  {

    selectedAreaName && search &&
  <h1 className="font-bold mt-4 text-blue-500">
    {`Ini info cuaca untuk ${selectedAreaName}`}
  </h1>

  }  

    {
      search && weather.map((weather) => {
        return (
          <div className="bg-white p-4 rounded shadow mt-2 border border-gray-200">
            <p className="text-gray-700">{weather.jamCuaca} / {weather.cuaca} / {weather.tempC}°C</p>
          </div>
        )
      })
    }


    </section>

  <footer className="mt-32 text-center text-gray-700 text-sm font-semibold p-3" style={{ backgroundColor: '#DCD7C9' }}>
      This is the final project for Webdev 2 KMTETI
  </footer>

    </main>
  );
}