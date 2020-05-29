const initialState = {
	deploy: '/vanilla-spa-sample',
	title: 'vanilla-spa-sample',
};

export default class App extends EventTarget {
	constructor() {
		super();

		Object.assign(this, initialState);
	}
}
