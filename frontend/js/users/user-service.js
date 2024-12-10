const BASE_URL = 'http://localhost:3000/api/auth';

const login = async (email, password) => {
	const response = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	return await response.json();
};

export default { login };
