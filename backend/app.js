//Importo todo lo de la libreria express
import express from "express";

//Llamo desde routes, las rutas de products, no se te olvide el js
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsController from "./src/routes/reviews.js";
import assessmentRoutes from "./src/routes/assessment.js";
import registerRoutes from "./src/routes/register.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerClients from "./src/routes/registerClient.js";
import passRecovRoute from "./src/routes/passwordRecover.js"
import blogRoutes from "./src/routes/blog.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";

import cors from 'cors'



const corsOptions = {
    origin: '', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}





//Creo una constante que es igual a la libreria que acabo de importar, y la ejecuto
const app = express();
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());
app.use("/api/products", validateAuthToken(['employee', 'admin']), productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", validateAuthToken(['employee']), reviewsController);
app.use("/api/assessments", assessmentRoutes); 


app.use("/api/register",registerRoutes); 
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerClients", registerClients)
app.use("/api/passwordRecovery", passRecovRoute)
app.use("/api/blog", blogRoutes)

//Exporto esta constante para usar express en todos lados.
export default app;