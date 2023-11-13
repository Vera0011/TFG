/* VALIDATE USER INFO */

const database_connection = require("./database/init_connection");

/* SEARCHES IF THE USER EXISTS AND OWNS AN API_KEY */
const validate_user = async (email, password, api_key) => {
	let data = (await database_connection).db("server_test");

	let userData = await data
		.collection("Users")
		.find({ email: email, password: password })
		.toArray();
	if (userData.length != 1) return 0;

	let token_api = await data
		.collection("Api_keys")
		.find({ user_id: userData[0].user_id })
		.toArray();
	if (token_api.includes(api_key)) return 0;

	return {
		email: userData[0].email,
		password: userData[0].password,
		api_key: token_api[0].api_key,
	};
};

module.exports = { validate_user };
