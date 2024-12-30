const express = require("express")
const cors = require("cors")
const Card = require("./db/db")
const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))


//CARD INPUT
app.post("/cardinput",async (req,res) => {
    const {name,about,interests,url1,url2} = req.body

    try {
        if (!name || !about) {
            return res.json({mssg: "Not enough input"})
        }
        await Card.create({name,about,interests,url1,url2})
        return res.json({mssg: "Card created successfully"})
    } catch (error) {
        res.json({mssg: "Unable to create the card",error})
    }
})


//ALL CARDS
app.get("/allcards",async (req,res) => {

    try {
        const result = await Card.find({})
        return res.json({CARDDATA: result})

    } catch (error) {
        res.json({mssg: "Unable to get the card/cards from DB"})
    }
})

// UPDATE THE CARD
app.patch("/updatecard/:cardid",async (req,res) => {
    const cardid = req.params.cardid
    const {newname ,newabout,newinterests,newurl1, newurl2} = req.body

    try {

        const card = await Card.findById(cardid)
        if (!card) {
            return res.status(404).json({ mssg: "Card not found" });
        }

        const updatedata = {}
        if (card.name !== newname) {updatedata.name = newname}
        if (card.about !== newabout) {updatedata.about = newabout}
        if (JSON.stringify(card.interests) !== JSON.stringify(newinterests)) {
            updatedata.interests = newinterests;
        }
        if (card.url1 !== newurl1) {updatedata.url1 = newurl1}
        if (card.url2 !== newurl2) {updatedata.url2 = newurl2}
    
        if (Object.keys(updatedata).length > 0) {
            await Card.updateOne({ _id: cardid }, { $set: updatedata });
            return res.json({ mssg: "Updated successfully" });
        } else {
            return res.json({ mssg: "No changes detected" });
        }

    } catch (error) {
        res.json({mssg: "Unable to update",error})
    } 

})

//DELETE THE CARD
app.delete("/deletecard/:cardid",async (req,res) => {
    const cardid = req.params.cardid

    try {
        const result = await Card.deleteOne({_id: cardid})
        res.json({mssg: "Card deleted succesfully"})
    } catch (error) {
        res.json({mssg: "Unable to delete the card",error})
    }
})



app.listen(3000)