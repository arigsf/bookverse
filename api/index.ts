import { app } from "./config/expressConfig";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta", process.env.PORT);
});
