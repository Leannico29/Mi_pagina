const rateLimiter = require('express-rate-limit'); // Límite de solicitudes
const { z } = require('zod');

/**
 * Middleware para validar un esquema.
 *
 * @param {import('zod').ZodObject<any>} schema - Esquema a validar.
 */
const validateSchema = (schema) => (req, res, next) => {
	try {
		schema.parse(req.body);

		next();
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Entrada no válida',
			error: error.errors,
		});
	}
};

/**
 * Límite de solicitudes para inicio de sesión
 */
const loginRateLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutos,
	max: 10, // Máximo de 10 intentos en el periodo
	message: {
		status: 'error',
		message: 'Demasiados intentos de inicio de sesión. Intente más tarde.',
	},
});

//* ------ Usuarios ------

// Esquema de validación para la creación de un usuario
const createUserSchema = z.object({
	first_name: z
		.string()
		.min(1, 'Se requiere nombre')
		.max(30, 'El nombre no puede tener más de 30 caracteres'),
	last_name: z
		.string()
		.min(1, 'Se requiere apellido')
		.max(30, 'El apellido no puede tener más de 30 caracteres'),
	email: z
		.string()
		.email('Formato de correo electrónico no válido.')
		.max(100, 'El correo no puede tener más de 100 caracteres'),
	password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
	username: z
		.string()
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
		.max(30, 'El nombre de usuario no puede tener más de 30 caracteres')
		.optional(),
	address: z
		.string()
		.min(1, 'Se requiere dirección')
		.max(50, 'La dirección no puede tener más de 50 caracteres')
		.optional(),
	role: z.enum(['admin', 'user']).optional(),
});

// Esquema de validación para la actualización de un usuario
const updateUserSchema = createUserSchema.partial(); // Todos los campos son opcionales, pero siguen las mismas validaciones

//* ------ Productos ------

// Esquema de validación para la creación de un producto
const createProductSchema = z.object({
	name: z
		.string()
		.min(3, 'El nombre del producto debe tener al menos 3 caracteres')
		.max(50, 'El nombre del producto no puede tener más de 50 caracteres'),
	price: z
		.number()
		.nonnegative('El precio del producto debe ser un número positivo')
		.max(9999999999, 'El precio no puede ser mayor a 9.999.999.999'),
	description: z
		.string()
		.min(3, 'La descripción del producto debe tener al menos 3 caracteres')
		.max(255, 'La descripción del producto no puede tener más de 255 caracteres'),
	product_type_id: z
		.number()
		.int()
		.positive('El ID del tipo de producto debe ser un número positivo'),
	brand_id: z
		.number()
		.int()
		.positive('El ID de la marca del producto debe ser un número positivo'),
	stock: z
		.number()
		.int()
		.nonnegative('El stock del producto no debe ser un número negativo')
		.optional(),
});

// Esquema de validación para la actualización de un producto
const updateProductSchema = createProductSchema.partial();

//* ------ Tipos de productos ------

// Esquema de validación para la creación de un tipo de producto
const createProductTypeSchema = z.object({
	name: z
		.string()
		.min(1, 'El nombre del producto debe tener al menos 1 carácter')
		.max(50, 'El nombre del producto no puede tener más de 50 caracteres'),
});

// Esquema de validación para la actualización de un tipo de producto
const updateProductTypeSchema = createProductTypeSchema.partial();

//* ------ Marcas de productos ------
// Esquema de validación para la creación de un tipo de producto
const createProductBrandSchema = z.object({
	name: z
		.string()
		.min(1, 'El nombre del producto debe tener al menos 1 carácter')
		.max(50, 'El nombre del producto no puede tener más de 50 caracteres'),
});

// Esquema de validación para la actualización de un tipo de producto
const updateProductBrandSchema = createProductBrandSchema.partial();

module.exports = {
	validateSchema,
	loginRateLimiter,
	createUserSchema,
	updateUserSchema,
	createProductSchema,
	updateProductSchema,
	createProductTypeSchema,
	updateProductTypeSchema,
	createProductBrandSchema,
	updateProductBrandSchema,
};
