const database = require('../config/database');

/**
 * Comprueba si ya existe un usuario o un email en la base de datos.
 *
 * @param {string | null | undefined} username - Nombre de usuario a comprobar.
 * @param {string | null | undefined} email - Email a comprobar.
 */
const checkDuplicateUserOrEmail = async (username, email) => {
	const [existingUsers] = await database.query(
		`SELECT id 
		FROM users
		WHERE username = ? 
			OR email = ?;`,
		[username, email]
	);

	return existingUsers;
};

/**
 * Busca un usuario por mail.
 *
 * @param {string} email - Mail del usuario a buscar
 */
const findUserByEmail = async (email) => {
	const [users] = await database.query(
		`
		SELECT * 
		FROM users 
		WHERE email = ?;`,
		[email]
	);

	return users;
};

/**
 * Busca un usuario por ID.
 *
 * @param {number} userId - ID del usuario a buscar
 */
const findUserById = async (userId) => {
	const [user] = await database.query(
		`
        SELECT id, first_name, last_name, username
        FROM users 
        WHERE id = ?;
    `,
		[userId]
	);

	return user;
};

/**
 * Inserta un usuario en la base de datos.
 *
 * @param {{first_name: string, last_name: string, email: string, hashed_password: string, username: string | null, address: string | null, role: "user" | "admin" | null}} user - datos del usuario a insertar.
 */
const insertUser = async (user) => {
	console.log(user);

	let valuesString = [];
	const insertFields = Object.keys(user)
		.map((field) => {
			valuesString.push('?');
			return field;
		})
		.join(', ');
	const insertValues = Object.values(user);
	valuesString = valuesString.join(', ');

	const [result] = await database.query(
		`INSERT INTO users (${insertFields}) 
		VALUES (${valuesString});`,
		insertValues
	);

	return result;
};

/**
 * Actualiza un usuario por ID.
 *
 * @param {number} userId - ID del usuario a actualizar.
 * @param {Array<any>} updateFields - Campos a actualizar.
 */
const updateUserById = async (userId, updateFields) => {
	const setClause = Object.keys(updateFields)
		.map((key) => `${key} = ?`)
		.join(', ');

	const values = [...Object.values(updateFields), userId];

	const [result] = await database.query(
		`
		UPDATE users 
		SET ${setClause} 
		WHERE id = ?;`,
		values
	);

	return result;
};

/**
 * Elimina un usuario por ID.
 *
 * @param {number} userId - ID del usuario a eliminar.
 */
const deleteUserById = async (userId) => {
	const [result] = await database.query(
		`
		DELETE 
		FROM users 
		WHERE id = ?;`,
		[userId]
	);

	return result;
};

/**
 * Busca usuarios con paginación.
 *
 * @param {number} limit - Cantidad de registros a mostrar.
 * @param {number} offset - Cantidad de registros a saltar.
 */
const findUsersWithPagination = async (limit, offset) => {
	const [users] = await database.query(
		`SELECT id, username, email 
		FROM users 
		LIMIT ? 
		OFFSET ?;`,
		[limit, offset]
	);

	return users;
};

module.exports = {
	findUserByEmail,
	findUserById,
	checkDuplicateUserOrEmail,
	insertUser,
	updateUserById,
	deleteUserById,
	findUsersWithPagination,
};
