
import { useNavigate } from "react-router-dom";
import  axios  from "axios";



function Cardinput({props}) {

  const {name,setname, about,setabout, interests,setinterests, url1,seturl1, url2,seturl2, Nthinterest,setNthinterest} = props

  const navigate = useNavigate()


  const addinterest = () => {
    setinterests([...interests,Nthinterest])
    setNthinterest("")
  }

  const data = {name: name ,about: about,interests: interests,
     url1: url1, url2: url2}


    return (
        <div >
         <input value={name} onChange={
           e => setname(e.target.value)
          } type='text' placeholder='enter name' style={{margin:"5px", padding: "5px"}} ></input>  <br></br>
          <input value={about} onChange={
           e => setabout(e.target.value)
          }type='text' placeholder='enter 1 line about' style={{margin:"5px", padding: "5px"}} ></input> <br></br>

          <ul>
            {interests.map((item,index) => (
              <li key={index} style={{margin:"5px", padding: "5px"}} >{item}</li>
            ))}
          </ul>
         
          <input value={Nthinterest} onChange={e => setNthinterest(e.target.value)} type="text" placeholder="Enter interest" style={{margin:"5px", padding: "5px"}} ></input>
          <button onClick={addinterest} >Add interest</button>
          <br></br>

          <input value={url1} onChange={e => seturl1(e.target.value)} placeholder="enter linkedin url" style={{margin:"5px", padding: "5px"}} ></input>
          <br></br>
          <input value={url2} onChange={e => seturl2(e.target.value)} placeholder="enter twitter url" style={{margin:"5px", padding: "5px"}} ></input>
          <br></br>

          <button onClick={async () => {
            const response = await axios.post(`${import.meta.env.VITE_URL}/cardinput`,data,{
              headers: {
                "content-type": "application/json"
              }
            })
            alert(response.data.mssg)
            navigate("/allcards")
          } } className="ml-6 border-2 border-black p-1 rounded-md" style={{margin:"5px", padding: "5px"}}> SEND INPUTS</button>
          <br></br>

          <button onClick={() => {
              navigate("/allcards")
          }} className="ml-6 border-2 border-black p-1 rounded-md" style={{margin:"5px", padding: "5px"}} >SEE ALL CARDS</button>
        </div>
    )
    
}

export default Cardinput