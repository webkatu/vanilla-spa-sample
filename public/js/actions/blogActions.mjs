import dispatcher from '../common/dispatcher.mjs';
import config from '../common/config.mjs';

export default {
	
	async signIn() {
		dispatcher.dispatchEvent(new CustomEvent('requestSignIn'));

		let json;
		try {
			const response = await fetch(`${config.server}/user.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new CustomEvent('requestSignInFailed'));
		}

		dispatcher.dispatchEvent(new CustomEvent('requestSignInSuccessful', { detail: json }));
	},

	signOut() {
		dispatcher.dispatchEvent(new CustomEvent('signOut'));
	},

	async fetchArticles() {
		dispatcher.dispatchEvent(new CustomEvent('fetchArticles'));

		let json;
		try {
			const response = await fetch(`${config.server}/articles.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new CustomEvent('fetchArticlesFailed'));
		}

		json.length = Object.keys(json).length;
		dispatcher.dispatchEvent(new CustomEvent('fetchArticlesSuccessful', { detail: json }));
	},

	async fetchArticle(id) {
		dispatcher.dispatchEvent(new CustomEvent('fetchArticle'));

		let json;
		try {
			const response = await fetch(`${config.server}/article${id}.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new CustomEvent('fetchArticleFailed'));
		}

		dispatcher.dispatchEvent(new CustomEvent('fetchArticleSuccessful', { detail: json }));
	},

	initBlogArticle() {
		dispatcher.dispatchEvent(new CustomEvent('initBlogArticle'));
	},
}