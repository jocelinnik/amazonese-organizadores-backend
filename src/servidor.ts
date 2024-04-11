import { configDotenv } from "dotenv";

import { configurarServidor } from "@/setup/servidor";

configDotenv();

const servidor = configurarServidor();
const PORTA = Number(process.env.HTTP_PORTA as string) || 3000;

servidor.listen(PORTA, () => console.log(`Servidor HTTP rodando na porta ${PORTA}...`));
