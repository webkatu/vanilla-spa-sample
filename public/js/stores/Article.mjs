import dispatcher from '../common/dispatcher.mjs';

const initialState = {
	articleInfo: {
		id: 0,
		title: '',
		content: '',
	},
	isFetching: false,
	didFailFetchingArticle: false,
};

export default class Article extends EventTarget {
	constructor() {
		super();

		Object.assign(this, JSON.parse(JSON.stringify(initialState)));

		dispatcher.addEventListener('fetchArticles', () => {
			this.isFetching = true;
			this.dispatchEvent(new Event('CHANGE'));
		});

		dispatcher.addEventListener('fetchArticleSuccessful', (e) => {
			this.articleInfo = e.detail;
			this.isFetching = false;
			this.didFailFetchingArticle = false;
			this.dispatchEvent(new Event('CHANGE'));
		});

		dispatcher.addEventListener('fetchArticleFailed', () => {
			this.isFetching = false;
			this.didFailFetchingArticle = true;
			this.dispatchEvent(new Event('CHANGE'));
		});

		dispatcher.addEventListener('initBlogArticle', () => {
			Object.assign(this, JSON.parse(JSON.stringify(initialState)));
			this.dispatchEvent(new Event('CHANGE'));
		});
	}
}