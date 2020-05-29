import dispatcher from '../common/dispatcher.mjs';

const initialState = {
	userInfo: {
		userName: '',
	},
};

export default class User extends EventTarget {
	constructor() {
		super();

		Object.assign(this, JSON.parse(JSON.stringify(initialState)));

		dispatcher.addEventListener('requestSignInSuccessful', (e) => {
			this.userInfo = e.detail.json;
			this.dispatchEvent(new Event('CHANGE'));
		});
	}
}
