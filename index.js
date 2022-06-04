const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('hello world!')
  });

app.get('/getTitle', async (req,res)=>{
    console.log("送了什麼過來", req.path)
    const result = await prisma.article.findMany()
    await prisma.$disconnect()
    res.send(result)
})

app.get('/getReply', async (req,res)=>{
  console.log("送了什麼過來", req.path)
  const result = await prisma.reply.findMany()
  await prisma.$disconnect()
  res.send(result)
})

// app.get('/arti*', async (req,res)=>{
//   let address = JSON.stringify(req.originalUrl);
//   let address2 = address.substring(6);
//   let i = parseInt(address2,10)
//   console.log("送了什麼過來", address2, JSON.stringify(req.originalUrl))
//   const result = await prisma.reply.findMany({
//     where : {
//       rep_of_arti : i
//     }
//   })
//   await prisma.$disconnect()
//   res.send(result)
// })

app.post('/create', async (req, res) => {
  const param = req.body
  console.log("送了什麼過來", param)
  const result = await prisma.article.create({ data: param })
  await prisma.$disconnect()
  res.send(result)
})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });