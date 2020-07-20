import page from 'https://unpkg.com/page@1.11.6/page.mjs';
import blogActions from '../actions/blogActions.mjs';
import { app, article } from '../stores/index.mjs';

const html = `
<app-header></app-header>
<main></main>

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

		const main = shadowRoot.querySelector('main');
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
			document.title = app.title;
		});

		page('/blog/', () => {
			blog.childComponent = blogIndex;
			main.append(blog);
			document.title = `Blog | ${app.title}`;
		});

		page('/blog/articles/', () => {
			blogActions.fetchArticles();
			blog.childComponent = blogArticles;
			main.append(blog);
			document.title = `Articles | ${app.title}`
		});

		page('/blog/articles/:id/', async (ctx) => {
			blog.childComponent = blogArticle;
			main.append(blog);
			await blogActions.fetchArticle(ctx.params.id);
			document.title = `${article.articleInfo.title} | ${app.title}`;
		});

		page('*', () => {
			main.innerHTML = '<div>404 Not Found</div>';
			document.title = `NotFound | ${app.title}`
		});

		page.start({ click: false });
	}
}
