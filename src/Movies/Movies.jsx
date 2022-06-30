import axios from 'axios'
import React, { useEffect } from 'react'

export default function Movies() {

  const getMovies = async()=> {
   let {data} = await axios.get('https://api.themoviedb.org/3/movie/{movie_id}?api_key=7f3dd0f267cb8302d274d96ada5fdd25&language=en-US')
    console.log(data)
  }
  useEffect(()=>{getMovies()},[])

  return (
    <div>


    </div>
  )
}
