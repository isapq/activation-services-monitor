import express from 'express';
import cors from 'cors';
import User from './models/User.js'
import reportRoutes from './src/routes/report-route.js';
import createServiceRoutes from './src/routes/create-service-route.js'
import servicesRoutes from './src/routes/services-route.js';

const app = express();

app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Erro ao buscar usuários."})
  }
});

app.use('/report', reportRoutes);
app.use('/createService', createServiceRoutes);
app.use('/services', servicesRoutes);


export default app;
