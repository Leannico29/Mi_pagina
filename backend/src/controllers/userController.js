const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const {
	createUserSchema,
	loginRateLimiter,
	updateUserSchema,
	validateSchema,
} = require('../utils/validators');
const { log } = require('console');

/**
 * Inicio de sesión
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const users = await UserModel.findUserByEmail(email);

		if (users.length === 0) {
			return res.status(401).json({
				status: 'error',
				message: 'Credenciales no válidas',
			});
		}

		const user = users[0];
		const isMatch = await bcrypt.compare(password, user.hashed_password);

		if (!isMatch) {
			return res.status(401).json({
				status: 'error',
				message: 'Credenciales no válidas',
			});
		}

		const token = jwt.sign(
			{
				userId: user.id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
				algorithm: 'HS256',
			}
		);

		res.json({
			status: 'success',
			message: 'Inicio de sesión exitoso',
			token,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al iniciar sesión',
			error: error.message,
		});
	}
};

/**
 * Creación de usuario
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const createUser = async (req, res) => {
	try {
		const { first_name, last_name, email, password, username, address, role } =
			createUserSchema.parse(req.body);
		const userData = { first_name, last_name, email, password, username, address, role };

		const existingUsers = await UserModel.checkDuplicateUserOrEmail(username, email);

		if (existingUsers.length > 0) {
			return res.status(400).json({
				status: 'error',
				message: 'El usuario o email ya están registrados',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		userData.hashed_password = hashedPassword;
		userData.username = userData.username || null;
		userData.address = userData.address || null;
		userData.role = userData.role || 'user';
		delete userData.password;

		const result = await UserModel.insertUser(userData);

		res.status(201).json({
			status: 'success',
			message: 'El usuario se registró con éxito',
			userId: result.insertId,
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'Error al registrar usuario',
			error: error.message,
		});
	}
};

/**
 * Actualización de usuario
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const updateUser = async (req, res) => {
	try {
		let { userId } = req.params;
		userId = parseInt(userId, 10);
		const updateFields = updateUserSchema.parse(req.body);

		if (updateFields.password) {
			updateFields.hashed_password = await bcrypt.hash(updateFields.password, 10);
			delete updateFields.password;
		}

		const result = await UserModel.updateUserById(userId, updateFields);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				status: 'error',
				message: 'Usuario no encontrado',
			});
		}

		res.json({
			status: 'success',
			message: 'El usuario se ha actualizado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al actualizar el usuario',
			error: error.message,
		});
	}
};

/**
 * Eliminación de usuario
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const deleteUser = async (req, res) => {
	try {
		let { userId } = req.params;
		userId = parseInt(userId, 10);

		const result = await UserModel.deleteUserById(userId);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Usuario no encontrado',
			});
		}

		res.json({
			message: 'Usuario eliminado con éxito',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al eliminar un usuario',
			error: error.message,
		});
	}
};

/**
 * Obtención de todos los usuarios con paginación
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getAllUsers = async (req, res) => {
	try {
		let { limit, page } = req.query;
		limit = parseInt(limit, 10) || 10;
		page = parseInt(page, 10) || 1;
		const offset = (page - 1) * limit;

		const users = await UserModel.findUsersWithPagination(limit, offset);

		res.json({
			status: 'success',
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Error al obtener usuarios',
			error: error.message,
		});
	}
};

/**
 * Obtención de usuario por ID
 *
 * @param {import('express').Request} req - Petición
 * @param {import('express').Response} res - Respuesta
 */
const getUserById = async (req, res) => {
	try {
		let { userId } = req.params;
		userId = parseInt(userId, 10);

		const users = await UserModel.findUserById(userId);

		if (users.length === 0) {
			return res.status(404).json({
				message: 'Usuario no encontrado',
			});
		}

		res.json(users[0]);
	} catch (error) {
		res.status(500).json({
			message: 'Error al obtener el usuario',
			error: error.message,
		});
	}
};

module.exports = {
	login: [loginRateLimiter, login],
	createUser: [validateSchema(createUserSchema), createUser],
	updateUser: [validateSchema(updateUserSchema), updateUser],
	deleteUser,
	getAllUsers,
	getUserById,
};
