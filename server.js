const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config(); // تأكد من تثبيت dotenv

const app = express();
const port = 3000; // يمكنك تغيير المنفذ إذا لزم الأمر

// استخدم cors لتسمح للواجهة الأمامية بالتواصل مع الواجهة الخلفية
app.use(cors()); 
app.use(express.json());

// قم بتحميل مفتاح API من ملف .env
const apiKey = process.env.GEMINI_API_KEY; 

if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the .env file.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/ask-ai', async (req, res) => {
    try {
        const userInput = req.body.prompt;
        
        // استخدم Gemini Model
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