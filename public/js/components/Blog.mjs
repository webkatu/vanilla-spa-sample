import blogActions from '../actions/blogActions.mjs';
import { app, blog, user } from '../stores/index.mjs';

const html = `
<div class="blogHeader"><h2><a is="spa-anchor" href="${app.deploy}/blog/">BLOG</a></h2></div>
<div class="menu"></div>
<div class="blogMain"></div>
`;

export default class Blog extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		this.menu = shadowRoot.querySelector('.menu');
		this.blogMain = shadowRoot.querySelector('.blogMain');
		this.blogSignedOutMenu = document.createElement('blog-signed-out-menu');
		this.blogSignedInMenu = document.createElement('blog-signed-in-menu');

		this.blogSignedOutMenu.handleSignInButtonClick = this.handleSignInButtonClick;
		this.blogSignedInMenu.handleSignOutButtonClick = this.handleSignOutButtonClick;

		this.handleBlogChange = this.handleBlogChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	connectedCallback() {
		blog.addEventListener('CHANGE', this.handleBlogChange);
		user.addEventListener('CHANGE', this.handleUserChange);
		
		this.handleBlogChange();
		this.handleUserChange();
	}

	disconnectedCallback() {
		blog.removeEventListener('CHANGE', this.handleBlogChange);
		user.removeEventListener('CHANGE', this.handleUserChange);
	}

	handleBlogChange() {
		this.isSignedIn = blog.isSignedIn;
	}

	handleUserChange() {
		this.userInfo = user.userInfo;
	}

	handleSignInButtonClick() {
		blogActions.signIn();
	}

	handleSignOutButtonClick() {
		blogActions.signOut();
	}

	set isSignedIn(val) {
		if(val === this._isSignedIn) return;
		this._isSignedIn = val;

		this.menu.innerHTML = '';
		if(val === true) {
			this.menu.append(this.blogSignedInMenu);
		}else if(val === false) {
			this.menu.append(this.blogSignedOutMenu);
		}
	}

	set userInfo(val) {
		if(val === this._userInfo) return;
		this._userInfo = val;

		this.blogSignedInMenu.userName = val.userName;
	}

	set childComponent(val) {
		if(val === this._childComponent) return;
		this._childComponent = val;
		
		this.blogMain.innerHTML = '';
		this.blogMain.append(val)
	}
}
