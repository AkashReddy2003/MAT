import { PrismaClient } from "@prisma/client";
import express, { json } from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
const prisma=new PrismaClient();
app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/stage1",async(req,res)=>{
    const id=req.body.id;
    
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


app.get("/stage2",async(req,res)=>{
    const id=req.body.id;
    
    const s=await prisma.stage.update({
        where:{
            id:id,
        },
        data:{
            
            stage1:0,
            stage2:1,
            stage3:0
        }
    })
    res.json(s);
})


app.get("/stage3",async(req,res)=>{
    const id=req.body.id;
    
    const s=await prisma.stage.update({
        where:{
            id:id,
        },
        data:{
            
            stage1:0,
            stage2:0,
            stage3:1
        }
    })
    res.json(s);
})


app.get("/inventory",async(req,res)=>{
    const x=req.body.inv;
    const y=x.split(",");
    for(let i=0;i<y.length-1;i=i+2){
        const a=await prisma.quantity.findMany({
            where:{
                id:y[i],
            }
        });
        var s;
        if(a.length!=0){
            s=await prisma.quantity.update({
                where:{
                    id:y[i],
                },
                data:{
                    quantity:parseInt(y[i+1]),
                }
            })
        }else{
            s=await prisma.quantity.create({
                data:{
                    id:y[i],
                    quantity:parseInt(y[i+1]),
                }
            })
        }
    }
    
    res.json(s);
})








app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running");

})