const html = `
<span>Hello <span class="userName"></span></span>
<button>Sign Out</button>
`;

export default class BlogSignedInMenu extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		this.button = shadowRoot.querySelector('button');
		this.userNameSpan = shadowRoot.querySelector('.userName');
	}

	set handleSignOutButtonClick(val) {
		this.button.onclick = val;
	}

	set userName(val) {
		this.userNameSpan.textContent = val;
	}
}