import { useState } from "react";
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
          } type='text' placeholder='enter name'></input>  <br></br>
          <input value={about} onChange={
           e => setabout(e.target.value)
          }type='text' placeholder='enter 1 line about'></input> <br></br>

          <ul>
            {interests.map((item,index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
         
          <input value={Nthinterest} onChange={e => setNthinterest(e.target.value)} type="text" placeholder="Enter interest" ></input>
          <button onClick={addinterest} >Add interest</button>
          <br></br>

          <input value={url1} onChange={e => seturl1(e.target.value)} placeholder="enter linkedin url"></input>
          <br></br>
          <input value={url2} onChange={e => seturl2(e.target.value)} placeholder="enter twitter url"></input>
          <br></br>

          <button onClick={async () => {
            const response = await axios.post(`${import.meta.env.VITE_URL}/cardinput`,data,{
              headers: {
                "content-type": "application/json"
              }
            })
            alert(response.data.mssg)
            navigate("/mycard")
          } } className="underline"> LESS GOO</button>
          <br></br>

          <button onClick={async () => {
            const NAME = localStorage.getItem("NAME")
            if (NAME) {
              navigate("/mycard")
            } else {
              alert("First create ur card")
            }
          }} className="underline" >GO TO MY CARD</button>
          <br></br>

          <button onClick={() => {
              navigate("/allcards")
          }} className="underline" >SEE ALL CARDS</button>
        </div>
    )
    
}

export default Cardinput