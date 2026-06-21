let express=require('express');
let cors=require('cors');
require('dotenv').config();
let {GoogleGenerativeAI} =require("@google/generative-ai")
let App=express();
App.use(cors()); //Middleware
App.use(express.json()); //Middleware


let genAI=new GoogleGenerativeAI(process.env.KEY);
let model=genAI.getGenerativeModel({model: "gemini-2.5-flash"});

App.post('/ask',  
   async (req,res)=>{

        let {question}=req.body;
        try {
            let data=await model.generateContent(question);
            let finalData = await data.response.text();

            res.send({
                _status:true,
                _message: "Content Found..",
                finalData,
                _finalData: finalData
            })
        } catch (err) {
            console.error('Error generating content:', err && err.stack ? err.stack : err)
            // Fallback: return a readable message so the client shows something
            const fallback = 'Sorry, content generation failed. Please check server logs.'
            res.send({ _status:true, _message: 'Fallback content', finalData: fallback, _finalData: fallback })
        }

    }
)

const PORT = process.env.PORT || 8000;
App.listen(PORT,()=>{
    console.log("Server Started on port", PORT);
})