import { app } from '../stores/index.mjs';

const html = `
<p><a is="spa-anchor" href="${app.deploy}/blog/">Blogへ</a></p>
`;

export default class AppIndex extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;
	}
}
