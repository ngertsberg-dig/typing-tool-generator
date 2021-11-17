const initialState = {
	user: null,
};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case 'setUser': {
			// mutate state, donot directly modify original state variable
			const newState = { ...state };
			newState.user = action.payload;
			return newState;
		}
		default:
			return state;
	}
};
