import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'MCD_USER_TOKEN';
const MAIN_APP_TOKEN_KEY = 'DIGCLIENTS_USER_TOKEN';

if (process.env.NODE_ENV === 'development') {
	Cookies.set(TOKEN_KEY, process.env.REACT_APP_DEV_USER_TOKEN);
}

/**Required on logout: clearing token */
export const clearToken = () => {
	Cookies.remove(TOKEN_KEY);
	Cookies.remove(MAIN_APP_TOKEN_KEY);
};

const init = () => {
	const token = Cookies.get(TOKEN_KEY);

	if (!token) {
		window.location.replace(process.configs.LOG_IN_PATH);
	}

	return axios.create({
		baseURL: process.configs.apiPath,
		...(token
			? {
					headers: { authorization: `Bearer ${token}` },
			  }
			: {}),
	});
};

export default init;
