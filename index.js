const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
mongoose.connect("",{useNewUrlParser:true});
app.use(cors());
app.use(express.json());
const InteractionSchema = new mongoose.Schema({
    interactionid:String,
    patientid:String,
    doctorid:String,
    query:String,
    response:String,
    interactiondate:Date
});
const Interaction=mongoose.model("Interaction",InteractionSchema);
app.get("/getinteractions",async(req,res)=>{
    const p=await Interaction.find({});
    res.json(p);
});
app.post("/addinteraction",(req,res)=>{
    const newinteraction=new Interaction({
        interactionid:Math.random(),
        patientid:"1",
        doctorid:"1",
        query:req.body.interaction.query,
        response:req.body.interaction.response,
        interactiondate:new Date()
    });
    newinteraction.save().then(res.send("Saved successsfully!!")).catch((err)=>{res.send(err)});
})
app.listen(5000,()=>{console.log("server started on port 5000");});