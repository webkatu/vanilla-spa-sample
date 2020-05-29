import { app, article } from '../stores/index.mjs';

const html = `
<article>
	<header>
		<h3><a is="spa-anchor" href="${app.deploy}/blog/articles/${article.articleInfo.id}/">${article.articleInfo.title}</a></h3>
	</header>
	<div class="articleContent">${article.articleInfo.content}</div>
</article>
`;

export default class BlogArticle extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		this.a = shadowRoot.querySelector('a');
		this.articleContent = shadowRoot.querySelector('.articleContent');

		this.handleArticleChange = this.handleArticleChange.bind(this);
	}

	connectedCallback() {
		article.addEventListener('CHANGE', this.handleArticleChange);
		this.handleArticleChange();
	}

	disconnectedCallback() {
		article.removeEventListener('CHANGE', this.handleArticleChange);
	}

	handleArticleChange() {
		this.isFetching = article.isFetching;
		this.didFailFetchingArticle = article.didFailFetchingArticle;
		this.articleInfo = article.articleInfo;
	}

	set isFetching(val) {
		if(this._isFetching === val) return;
		this._isFetching = val;

		if(val === true) this.style.display = 'none';
		else if(val === false) this.style.display = '';
	}

	set didFailFetchingArticle(val) {
		if(this._didFailFetchingArticle === val) return;
		this._didFailFetchingArticle = val;

		if(val === true) {
			this.a.href = '';
			this.a.textContent = '';

			const text = 'page not found';
			this.articleContent.textContent = text;

			document.title = `${text} | ${app.title}`;
		}
	}

	set articleInfo(val) {
		if(this._articleInfo === val) return;
		this._articleInfo = val;

		this.a.href = `${app.deploy}/blog/articles/${val.id}/`;
		this.a.textContent = val.title;

		this.articleContent.textContent = val.content;

		document.title = `${val.title} | ${app.title}`;
	}
}