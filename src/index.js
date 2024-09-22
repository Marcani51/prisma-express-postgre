const express = require('express')
const dotenv=require('dotenv')
const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

dotenv.config();
const PORT= process.env.PORT;

app.get("/api",(req,res)=>{
    res.send("HELLO WORLD")
    
})

/////// NOTES: this is for using manual query
////prisma.$executeRaw()

app.get("/products", async (req,res)=>{
    const products= await prisma.product.findMany()

    
    res.send(products)
})

app.get("/initrelational", async (req,res)=>{
    await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
          posts: {
            create: { title: 'Hello World' },
          },
          profile: {
            create: { bio: 'I like turtles' },
          },
        },
      })
      const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })
})
app.listen(PORT,()=>{
    console.log(`EXPRESS RUNNING ON ${PORT}`)
})