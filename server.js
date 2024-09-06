const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let creneaux = [
  { id: 1, time: '08:00', reserved: false },
  { id: 2, time: '09:00', reserved: false },
  { id: 3, time: '10:00', reserved: false },
  { id: 4, time: '11:00', reserved: false },
  { id: 5, time: '12:00', reserved: false },
  { id: 6, time: '14:00', reserved: false },
  
];

let reservations = [];

app.get('/api/slots', (req, res) => {
  res.json(creneaux);
});

app.post('/api/reserve', (req, res) => {
  const { slotId, name } = req.body;
  const slot = creneaux.find(s => s.id === slotId);
  if (slot && !slot.reserved) {
    slot.reserved = true;
    reservations.push({ slotId, name });
    res.status(200).json({ message: 'Réservation réussie' });
  } else {
    res.status(400).json({ message: 'Créneau non disponible' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
