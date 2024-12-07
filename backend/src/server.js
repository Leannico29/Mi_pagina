// Dependencias
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Rutas
const authRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const productTypeRoutes = require('./routes/productTypeRoute');
const productBrandRoutes = require('./routes/productBrandRoute');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products/types', productTypeRoutes);
app.use('/api/products/brands', productBrandRoutes);
app.use('/api/products', productRoutes);

// Middleware para verificar los métodos y rutas que se están solicitando.
app.use((req, res, next) => {
	console.log(`Request Method: ${req.method}, Request Path: ${req.path}`);
	next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT}...`);
});
