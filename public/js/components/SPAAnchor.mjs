import page from 'https://unpkg.com/page@1.11.6/page.mjs';

export default class SPAAnchor extends HTMLAnchorElement {
	constructor() {
		super();

		this.onclick = (e) => {
			e.preventDefault();
			if(location.href === e.currentTarget.href) page.redirect(e.currentTarget.pathname + e.currentTarget.search + e.currentTarget.hash)
			else page(e.currentTarget.pathname + e.currentTarget.search + e.currentTarget.hash);
		}
	}
}