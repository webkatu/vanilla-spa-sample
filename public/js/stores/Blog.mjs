import dispatcher from '../common/dispatcher.mjs';

const initialState = {
	isSignedIn: false,
};

export default class Blog extends EventTarget {
	constructor() {
		super();

		Object.assign(this, initialState);

		dispatcher.addEventListener('requestSignInSuccessful', () => {
			this.isSignedIn = true;
			this.dispatchEvent(new Event('CHANGE'));
		});

		dispatcher.addEventListener('signOut', () => {
			this.isSignedIn = false;
			this.dispatchEvent(new Event('CHANGE'));
		});
	}
}
