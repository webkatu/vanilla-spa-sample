import dispatcher from '../common/dispatcher.mjs';

const initialState = {
	articleList: [],
}

export default class Articles extends EventTarget {
	constructor() {
		super();

		Object.assign(this, JSON.parse(JSON.stringify(initialState)));
	
		dispatcher.addEventListener('fetchArticlesSuccessful', (e) => {
			this.articleList = Array.from(e.detail.json);
			this.dispatchEvent(new Event('CHANGE'));
		})
	}
}