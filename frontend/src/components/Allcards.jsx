import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Allcards({props}) {
    const {setname,setabout,setinterests,seturl1,seturl2} = props

    const[interests2,setinterests2] = useState([]) 
    const[Nth2interest,setNth2interest] = useState("")

    const [carddata,setcarddata] = useState([])

    const [editcount,seteditcount] = useState(0)

    

    const [newname, setnewname] = useState("")
    const [newabout, setnewabout] = useState("")
    const [newinterests, setnewinterests] = useState("")
    const [newurl1, setnewurl1] = useState("")
    const [newurl2, setnewurl2] = useState("")

    const newdata = {newname ,newabout,newinterests,newurl1,newurl2}


    const navigate = useNavigate()

    useEffect(() => {
        const getdata = async () => {
        const response = await axios.get(`${import.meta.env.VITE_URL}/allcards`)
        setcarddata(response.data.CARDDATA)
        }
        getdata()
    },[carddata])

    const editfn = async (newdata,cardid) => {
        const response = await axios.patch(`${import.meta.env.VITE_URL}/updatecard/${cardid}`,newdata)
        alert(response.data.mssg)
    }

    const deletefn = async (cardid) => {
        const response = await axios.delete(`${import.meta.env.VITE_URL}/deletecard/${cardid}`)
        alert(response.data.mssg)
    }

    return (

        <div>
        <div className="flex flex-wrap items-center justify-center" >
            {carddata.map((card) => (
                        <div key={card._id}>
                            <div className="col-span-1 m-5 p-10 border rounded-lg font-serif bg-white" >


                            <h1 className="text-4xl font-semibold">
                            {editcount!==card._id? card.name
                             : <input value={newname} onChange={e => {setnewname(e.target.value)}} type='text' placeholder='enter name' className="border border-black rounded"></input> } 
                            </h1>
                            
                            <p className="my-6 text-2xl  text-gray-500 " >
                            {editcount!==card._id? card.about
                             : <input value={newabout} onChange={e => {setnewabout(e.target.value)}} type='text' placeholder='enter name' className="border border-black rounded"></input> } 
                            </p>
                            
                
                            <h2 className="text-3xl font-semibold" >Interests</h2>
                            <div className="my-4 text-xl  text-gray-500" >

                                {
                                    editcount!==card._id ? <>
                                    {card.interests && card.interests.map((item,index) => (
                                        <p key={index} >{item}</p>
                                    ))}
                                    </> : <>
                                    <ul>
                                    {interests2.map((item,index) => (
                                        
                                        <li key={index}>
                                            {item}
                                            <button className="ml-4 p-1 border-2 border-black rounded-md text-sm" onClick={
                                                () => {
                                                    setinterests2(interests2.filter((element, i) => i !== index))  //for displaying
                                                    setnewinterests(interests2.filter((element,i) => i !== index)) //for actually removing i.e updating
                                                }
                                            }  >REMOVE </button>
                                        </li>   
                                    ))}
                                    </ul>
                                    <input value={Nth2interest} onChange={e => setNth2interest(e.target.value)} type="text" placeholder="Enter interest" className="border border-black rounded"></input>
                                    <button onClick={
                                        () => {
                                            setinterests2([...interests2,Nth2interest]) //for dynamic display 
                                            setnewinterests([...interests2,Nth2interest]) //for actually adding SoAsTo update
                                            setNth2interest("")
                                        }
                                        } className="border-2 border-black p-1 rounded-md text-sm">ADD</button>
                                    </> 
                                }
    
                            </div>
                            
                            <div className="my-6 text-gray-200" >
                                {
                                    editcount!==card._id ? <a href={card.url1}><button className="bg-blue-700 border-2 border-blue-700 p-2 rounded-md"><i class="ri-linkedin-fill"></i></button></a> : 
                                    <input value={newurl1} onChange={e => setnewurl1(e.target.value)} type='text' placeholder='enter url1' className="border border-black rounded" ></input>
                                }
                                {
                                    editcount!==card._id ? <a href={card.url2}><button className="ml-6 bg-blue-700 border-2 border-blue-700 p-2 rounded-md"><i class="ri-twitter-x-line"></i></button></a> : 
                                    <input value={newurl2} onChange={e => setnewurl2(e.target.value)} type='text' placeholder='enter url2' className="border border-black rounded"></input>
                                }
                            </div>
                            </div>
                            <div className="flex items-center " >
                            <button className="ml-6 border-2 border-black p-1 rounded-md" onClick={
                                async () => {
                                    if (editcount!==card._id) {
                                        setnewname(card.name)
                                        setnewabout(card.about)
                                        setinterests2(card.interests) //for display
                                        setnewurl1(card.url1)
                                        setnewurl2(card.url2)
                                        

                                        seteditcount(card._id)
                                    } else {
                                        await editfn(newdata,card._id)
                                        seteditcount(0)
                                    }
                                }
                            } >{editcount!==card._id? <i class="ri-edit-2-fill"> EDIT CARD</i> : "CONFIRM EDITS"}</button>
                            <i className="ri-delete-bin-5-line ml-6 border-2 border-black p-1 rounded-md" onClick={
                                () => {deletefn(card._id)}
                            }  > DELETE CARD</i>
                        </div>
                        </div>
            ))}
           
            
          
        
        </div>
        <div style={{margin:"25px", padding: "25px"}} className="flex justify-center" >
        <Link to={"/"} className="ml-6 border-2 border-black p-1 rounded-md" style={{margin:"5px", padding: "5px"}}>
        ADD ANOTHER CARD</Link>
        </div>

        </div>
    )
}

export default Allcards