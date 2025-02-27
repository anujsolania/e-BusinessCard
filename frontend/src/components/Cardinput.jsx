
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
        <div className="flex flex-col justify-center items-center p-10 gap-10 w-screen" >

          <div >
          <h1 className="font-medium text-lg sm:text-xl " >
            Create your e-BusinessCards and perform CRUD operations with them
          </h1>
          </div>

          <div className="flex flex-col items-center border border-black p-10 rounded-xl gap-4 w-[80%] sm:w-[60%] md:w-[50%]" >
          <div className="flex flex-col w-full gap-2" >
         <input value={name} onChange={
           e => setname(e.target.value)
          } type='text' placeholder='Enter name' className="m-2 p-2 rounded-md" ></input> 
          <input value={about} onChange={
           e => setabout(e.target.value)
          }type='text' placeholder='Enter 1 line about' className="m-2 p-2 rounded-md" ></input>


            {interests && interests.map((item,index) => (
              <p key={index} className="m-2 p-2 rounded-md" >{item}</p>
            ))}

         
         <div className="flex items-center justify-center w-full" >
          <input value={Nthinterest} onChange={e => setNthinterest(e.target.value)} type="text" placeholder="Enter interest" className="m-2 p-2 rounded-md w-full" ></input>
          <button onClick={addinterest} className="border-2 border-black rounded-md w-[20%] py-1 text-xs sm:text-sm">ADD</button>
         </div>
    

          <input value={url1} onChange={e => seturl1(e.target.value)} placeholder="Enter linkedin url" className="m-2 p-2 rounded-md" ></input>

          <input value={url2} onChange={e => seturl2(e.target.value)} placeholder="Enter twitter url" className="m-2 p-2 rounded-md"></input>
   

         </div>

          <div className="flex gap-2 text-xs sm:text-sm" >

          <button onClick={async () => {
            const response = await axios.post(`${import.meta.env.VITE_URL}/cardinput`,data,{
              headers: {
                "content-type": "application/json"
              }
            })
            alert(response.data.mssg)
            if (response.status === 201) {
              navigate("/allcards");
              setname(""),setabout(""),setinterests(""),seturl1(""),seturl2("")
            }

          } } className="border-2 border-black p-1 rounded-md text-xs sm:text-sm" > SEND INPUTS</button>
          <br></br>

          <button onClick={() => {
              navigate("/allcards")
          }} className="border-2 border-black p-1 rounded-md text-xs sm:text-sm">SEE ALL CARDS</button>

          </div>

          </div>

        </div>
    )
    
}

export default Cardinput