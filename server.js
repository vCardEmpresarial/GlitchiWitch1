const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

// 🌐 CORS configurado con amor místico
const corsOptions = {
  origin: 'https://glitchwitch.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // 🔮 ¡Respuesta mágica a los preflight!

app.use(bodyParser.json());

// 🔑 Inicializa OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧠 Ruta de canalización GPT
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

// 🌌 Activa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔮 Servidor Glitchy Witch activo en el puerto ${PORT}`);
});

