import { app } from '../stores/index.mjs';

const html = `
<header>
	<h1><a is="spa-anchor" href="${app.deploy}/">${app.title}</a></h1>
</header>
`;

export default class AppHeader extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;
	}
}
