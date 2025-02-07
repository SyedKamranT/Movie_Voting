import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Voting = () => {
  const params = useParams()
  const [contentAll, setcontentAll] = useState([])
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await axios.get("http://127.0.0.1:8889/movies");
        const seriesRes = await axios.get("http://127.0.0.1:8889/series");
        const kidsRes = await axios.get("http://127.0.0.1:8889/kids");

        // Merge all content into one array with category labels
        const combinedData = [
          ...moviesRes.data.map(item => ({ ...item, category: "Movie" })),
          ...seriesRes.data.map(item => ({ ...item, category: "Series" })),
          ...kidsRes.data.map(item => ({ ...item, category: "Kids" }))
        ];

        setcontentAll(combinedData);
      } catch (err) {
        setError("Failed to fetch content. Maybe your token expired.");
      }
    };

    fetchData();
  }, []);

  const mainItem =  contentAll.filter((item) =>{
    return item._id === params.id
  }
    
   
  )
  console.log(mainItem)
   
  return (
    <div>{mainItem.map((item)=>{
      return (
        <div key={item._id}>
          {item.poster}
        </div>
      )
    })}</div>
  )

}
export default Voting;