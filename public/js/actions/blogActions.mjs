import dispatcher from '../common/dispatcher.mjs';
import config from '../common/config.mjs';

export default {
	
	async signIn() {
		dispatcher.dispatchEvent(new Event('requestSignIn'));

		let json;
		try {
			const response = await fetch(`${config.server}/user.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new Event('requestSignInFailed'));
		}

		dispatcher.dispatchEvent(new CustomEvent('requestSignInSuccessful', { detail: { json } }));
	},

	signOut() {
		dispatcher.dispatchEvent(new Event('signOut'));
	},

	async fetchArticles() {
		dispatcher.dispatchEvent(new Event('fetchArticles'));

		let json;
		try {
			const response = await fetch(`${config.server}/articles.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new Event('fetchArticlesFailed'));
		}

		json.length = Object.keys(json).length;
		dispatcher.dispatchEvent(new CustomEvent('fetchArticlesSuccessful', { detail: { json } }));
	},

	async fetchArticle(id) {
		dispatcher.dispatchEvent(new Event('fetchArticle'));

		let json;
		try {
			const response = await fetch(`${config.server}/article${id}.json`);
			json = await response.json();
		}catch(e) {
			console.log(e);
			return dispatcher.dispatchEvent(new Event('fetchArticleFailed'));
		}

		dispatcher.dispatchEvent(new CustomEvent('fetchArticleSuccessful', { detail: { json } }));
	}
}