const html = `
<button>Sign In</button>
`;

export default class BlogSignedOutMenu extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		this.button = shadowRoot.querySelector('button');
	}

	set handleSignInButtonClick(val) {
		this.button.onclick = val;
	}
}