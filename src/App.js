import { useEffect, useState } from 'react';
import './App.css';
import './components/Home/Home.css'

function App() {
  const [dark, setDark] = useState(false)
  const [places, setPlace] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  console.log(longitude, latitude);

  const LoadData = (event) => {
    const address = event.target.value;
    fetch(`https://barikoi.xyz/v1/api/search/autocomplete/MzcyMDpTRUJUVVJHNjVP/place?q=${address}`)
      .then(res => res.json())
      .then(data => setPlace(data.places))
  }
  useEffect(() => {
    window.bkoigl.accessToken = 'MzcyMDpTRUJUVVJHNjVP'
    const url = 'https://barikoi.xyz/v1/api/search/autocomplete/MzcyMDpTRUJUVVJHNjVP/place?q=shopno';
    const map = new window.bkoigl.Map({
      container: 'map',
      center: [longitude ? longitude : 90.39408891592521, latitude ? latitude : 23.86523106661817],
      zoom: 14
    })

    // Add Marker on Map Load
    map.on('load', () => {
      const marker = new window.bkoigl.Marker({ draggable: true })
        .setLngLat([longitude ? longitude : 90.39408891592521, latitude ? latitude : 23.86523106661817])
        .addTo(map)
    })
    map.on('load', () => {
      // Add Fullscreen Control
      map.addControl(
        new window.bkoigl.FullscreenControl()
      )
      map.addControl(
        new window.bkoigl.NavigationControl()
      )
      map.addControl(
        new window.bkoigl.ScaleControl()
      )
    })
  }, [longitude, latitude])
  const ShowLocation = (longitude, latitude) => {
    // setLatitude(" ")
    // setLatitude(" ")
    setLatitude(latitude);
    setLongitude(longitude)

  }

  return (
    <div className='flex justify-between' data-theme={dark ? "dark" : "light"}>

      < div >
        <div className=''>
          <div className='flex justify-between font-bold text-2xl '>
            <div class="logo">Bari<span class="logo-color">koi</span></div>
            <div className='mt-4'><button onClick={() => setDark(!dark)}>{dark ? "Light" : "Dark"}</button></div>
          </div>
          <div class="input-div" >
            <input onChange={LoadData} class="input" type="text" placeholder="Search Location" />
          </div>
        </div>
        <div className='snap-y '>
          {
            places?.map(place => <>
              <div class="card mt-6 mx-8 bg-base-200 shadow-xl w-50vh scroll-ml-6 snap-start" onClick={() => ShowLocation(place.longitude, place.latitude)}>
                <div class="py-6 px-4">
                  <h2 class="">{place.address.slice(",")}</h2>
                  <p>{place.area} {place.city}</p>
                </div>
              </div>

            </>)
          }</div>
      </ div>
      <div className='fixed right-0' id="map"></div>
    </div >

  )
};

export default App;
