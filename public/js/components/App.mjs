import page from 'https://unpkg.com/page@1.11.6/page.mjs';
import blogActions from '../actions/blogActions.mjs';
import { app } from '../stores/index.mjs';

const html = `
<app-header></app-header>
<div class="main"></div>

<style>
:host {
	display: block;
	max-width: 480px;
	margin: 0 auto;
}
</style>
`;

export default class App extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = html;

		const main = shadowRoot.querySelector('.main');
		const appIndex = document.createElement('app-index');
		const blog = document.createElement('x-blog');
		const blogIndex = document.createElement('blog-index');
		const blogArticles = document.createElement('blog-articles');
		const blogArticle = document.createElement('blog-article');

		page.base(app.deploy);
		page.strict(true);

		page('*', (ctx, next) => {
			main.innerHTML = '';
			next();
		});

		page('/', () => {
			main.append(appIndex);
		});

		page('/blog/', () => {
			blog.childComponent = blogIndex;
			main.append(blog);
		});

		page('/blog/articles/', () => {
			blogActions.fetchArticles();
			blog.childComponent = blogArticles;
			main.append(blog);
		});

		page('/blog/articles/:id/', (ctx) => {
			blogActions.fetchArticle(ctx.params.id);
			blog.childComponent = blogArticle;
			main.append(blog);
		});

		page('*', () => {
			main.innerHTML = '<div>404 Not Found</div>';
			document.title = `NotFound | ${app.title}`
		});

		page.start({ click: false });
	}

	connectedCallback() {
		document.title = app.title;
	}
}
