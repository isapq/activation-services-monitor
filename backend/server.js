import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./db/database.js";

const PORT = process.env.PORT || 3030;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco com sucesso!");

    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas!")

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

start();
