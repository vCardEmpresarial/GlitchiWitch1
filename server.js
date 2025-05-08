const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

//  Permitir todos los orígenes temporalmente
app.use(cors()); //  ¡Sin restricciones!
app.options('*', cors()); //  también para preflight

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error en la canalización:', error);
    res.status(500).json({ reply: 'Error en la canalización mística.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor Glitchy Witch abierto a todos los orígenes en el puerto ${PORT}`);
});

