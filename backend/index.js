require('dotenv').config();
import * as room from "./routes/room"
import * as statusRoom from "./routes/status_room"
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o MySQL

app.use(cors({
  origin: 'http://85.209.95.52:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Tratar preflight OPTIONS
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Rotas para Salas
app.get('/api/salas', room.getRooms);
app.post('/api/salas', room.addRoom);
app.put('/api/salas/:id', room.editRoom);
app.delete('/api/salas/:id', room.deleteRoom);

// Rota para obter os status disponíveis
app.get('/api/status-sala', statusRoom.getStatusRoom);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
