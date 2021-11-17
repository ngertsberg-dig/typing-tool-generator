import axiosConfig, { clearToken } from '../../api/axiosConfig';

const axios = axiosConfig();

export const fetchUser = () => async (dispatch) => {
	try {
		const response = await axios.get('/user');
		if (response.status === 200) {
			dispatch({
				type: 'setUser',
				payload: response.data,
			});
		}
	} catch (error) {}
};

export const logout = () => (dispatch) => {
	try {
		dispatch({
			type: 'setUser',
			payload: null,
		});
		clearToken();
		window.location.replace(process.configs.LOG_IN_PATH);
	} catch (error) {}
};
