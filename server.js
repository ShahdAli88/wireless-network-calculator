const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();
const port = 3000;


app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'final.html')); 
});

app.use(express.static(path.join(__dirname, '')));



const apiKey = process.env.GEMINI_API_KEY; 

if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/ask-ai', async (req, res) => {
    try {
        const userInput = req.body.prompt;
        
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        
        const result = await model.generateContent(userInput);
        const response = await result.response;
        const text = response.text();

        res.json({ explanation: text });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get explanation from AI.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});