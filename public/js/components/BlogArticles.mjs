import { app, articles } from '../stores/index.mjs';

const html = `
<ul></ul>
`;

export default class BlogArticles extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		this.ul = shadowRoot.querySelector('ul');

		this.handleArticlesChange = this.handleArticlesChange.bind(this);
	}

	connectedCallback() {
		articles.addEventListener('CHANGE', this.handleArticlesChange);
		this.handleArticlesChange();
	}

	disconnectedCallback() {
		articles.removeEventListener('CHANGE', this.handleArticlesChange);
	}

	handleArticlesChange() {
		this.articleList = articles.articleList;
	}

	set articleList(val) {
		if(this._articleList === val) return;
		this._articleList = val;

		this.ul.innerHTML = '';
		val.forEach((article) => {
			const li = document.createElement('li');
			li.innerHTML = `<a is="spa-anchor" href=${app.deploy}/blog/articles/${article.id}/>${article.title}</a>`;
			this.ul.append(li);
		});
	}
}
