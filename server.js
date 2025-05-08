
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ reply: 'Error en la canalización mística.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Glitchy Witch activo en puerto ${PORT}`);
});
