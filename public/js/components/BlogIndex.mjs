import blogActions from '../actions/blogActions.mjs';
import { app } from '../stores/index.mjs';

const html = `
<p><a is="spa-anchor" href="${app.deploy}/blog/articles/">記事一覧</a></p>
`;

export default class BlogIndex extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;
	}

	connectedCallback() {
		document.title = `Blog | ${app.title}`;
	}
}
