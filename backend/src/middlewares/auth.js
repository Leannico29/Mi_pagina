const jwt = require('jsonwebtoken');

/**
 * Verifica si el token es válido.
 */
const authenticateToken = async (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			error: 'Autorización denegada, no se ingresó token.',
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Token enviado inválido.',
		});
	}
};

/**
 * Verifica si el usuario tiene permisos para acceder a la ruta.
 */
const authorizeUserByRoleOrSelf = (req, res, next) => {
	let { userId } = req.params;
	userId = parseInt(userId);

	if (req.user.role !== 'admin' && req.user.userId !== userId) {
		return res.status(403).json({
			message: 'No tienes permisos para acceder a esta ruta.',
		});
	}

	next();
};

/**
 * Verifica si el usuario tiene permisos para acceder a la ruta.
 */
const authorizeUserByRole = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return res.status(403).json({
			message: 'No tienes permisos para acceder a esta ruta.',
		});
	}

	next();
};

module.exports = { authenticateToken, authorizeUserByRole, authorizeUserByRoleOrSelf };
