import axios from "axios"
import { get } from "mongoose"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Businesscard({props}) {
    const {name,setname, about,setabout, interests,setinterests,  url1,seturl1, url2,seturl2,Nthinterest,setNthinterest} = props

    const [carddata,setcarddata] = useState([])
    const [cardid,setcardid] = useState("")
    
    const [editcount,seteditcount] = useState(0)

    const navigate = useNavigate()

    const [newname, setnewname] = useState("")
    const [newabout, setnewabout] = useState("")
    const [newinterests, setnewinterests] = useState("")
    const [newurl1, setnewurl1] = useState("")
    const [newurl2, setnewurl2] = useState("")

    const newdata = {newname ,newabout,newinterests,newurl1,newurl2}

    useEffect(() => {
        if (name) {       //name will be null/undefined initially thatswhy
            // console.log("Storing 'name' in localStorage: ", name);
            localStorage.setItem("NAME", name);
        }
        getdata()
    }, [name]); 

    async function getdata() {
        const NAME = localStorage.getItem("NAME")
        const response = await axios.get(`${import.meta.env.VITE_URL}/mycard`,{
            headers: {
                "Authorization": NAME
            }
        })
        setcarddata(response.data.CARDDATA)
        setcardid(response.data.CARDID)
        }

    // if (!carddata) {
    //     return <div>NO CARD EXISTS</div>
    // }

    const addinterest = () => {
        setnewinterests([...interests,Nthinterest])
        setNthinterest("")
      }

    return (

    <div>
        <div className="grid grid-cols-2" >
            
                            <div className="col-span-1 m-5 p-10 border rounded-lg font-serif bg-white" >

                            <h1 className="text-4xl font-semibold" >
                                {
                                editcount==0 ? carddata.name : 
                                <input value={newname} onChange={e => setnewname(e.target.value)} type='text' placeholder='enter name'></input> 
                                }
                            </h1>
                            <p className="my-6 text-2xl  text-gray-500 " >
                               {
                                editcount==0 ? carddata.about : 
                                <input value={newabout} onChange={e => setnewabout(e.target.value)} type='text' placeholder='enter about'></input>
                                }
                            </p>
                
                            <h2 className="text-3xl font-semibold" >Interests</h2>
                            <div className="my-4 text-xl  text-gray-500" >

                                {
                                    editcount==0 ? <>
                                    {carddata.interests && carddata.interests.map((item,index) => (
                                        <p key={index} >{item}</p>
                                    ))}
                                    </> : <>
                                    <ul>
                                    {interests.map((item,index) => (
                                    <li key={index}>{item}</li>
                                    ))}
                                    </ul>
                                    <input value={Nthinterest} onChange={e => setNthinterest(e.target.value)} type="text" placeholder="Enter interest" ></input>
                                    <button onClick={addinterest} >Add interest</button>
                                    </> 
                                }
    
                            </div>
                            
                            <div className="my-6 text-gray-200" >
                            
                                {
                                    editcount==0 ? <a href={carddata.url1}><button className="bg-blue-700 border-2 border-blue-700 p-2 rounded-md">LinkedIn</button></a> : 
                                    <input value={newurl1} onChange={e => setnewurl1(e.target.value)} type='text' placeholder='enter url1'></input>
                                }
                                {
                                    editcount==0 ? <a href={carddata.url2}><button className="ml-6 bg-blue-700 border-2 border-blue-700 p-2 rounded-md">Twitter</button></a> : 
                                    <input value={newurl2} onChange={e => setnewurl2(e.target.value)} type='text' placeholder='enter url2'></input>
                                }
                            </div>
                            </div>

                    
        </div>
        <button className="underline" onClick={
            async () => {
                if (editcount == 0) {
                    seteditcount(1)
                } else if(editcount==1 ) {
                    await getdata()
                    console.log(carddata)
                    const response = await axios.patch(`${import.meta.env.VITE_URL}/updatecard/${cardid}`,newdata,{
                        headers: {
                          "content-type": "application/json"
                        }
                      })
                      alert(response.data.mssg)
                      await getdata()
                      seteditcount(0)

                }   
            }
        }>{editcount==0? "EDIT THIS CARD" : "CONFIRM EDIT" }</button>
        <br></br>
        <Link className="underline" onClick={async () => {
            const NAME = localStorage.getItem("NAME")
            const response = await axios.delete(`${import.meta.env.VITE_URL}/deletecard`,{
                headers: {
                    "Authorization": NAME
                }
            })
            alert(response.data.mssg)
            navigate("/")

        }}>DELETE THIS CARD</Link>
        <br></br>
        <Link to={"/"} className="underline" >ADD ANOTHER CARD</Link>
        <br></br>
        <Link to={"/allcards"} className="underline"> SEE ALL CARDS</Link>

    </div>
    )
}

export default Businesscard