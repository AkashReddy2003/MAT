const PrismaClient=require("@prisma/client");
const express=require("express");
const bodyParser=require("body-parser");
const app = express();
const cors=require("cors");
const prisma=new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/stage1",async(req:any,res:any)=>{
    const id:string=req.body.id;
    const s=await prisma.stage.create({
        data:{
            id:id,
            stage1:1,
            stage2:0,
            stage3:0
        }
    })
    res.json(s);
})






app.listen(process.env.PORT||4000,()=>{
    console.log("Server Running");

})