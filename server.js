const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
app.use(cors())

app.post('/completions', async(req,res) => {
    console.log(req.body)
    const options = {
        method: "POST",
        headers: {
            "Authorization":`Bearer ${process.env.GPT3_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:"gpt-4",
            messages:req.body,
            max_tokens:150,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data.choices[0].message.content)
        res.send(data)
    }catch(error){
        console.log(error)
    }
})

app.listen(PORT, () => console.log("running"))