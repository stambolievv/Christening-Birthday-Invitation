import { render } from 'lit-html';
import page from 'page';

const root = document.getElementById('main') || document.body;
const baseUrl = import.meta.env.BASE_URL.slice(0, -1);

page.base(baseUrl);

/**
 * @description Decorates the provided context by adds some useful functions that can be used later.
 * @param {PageJS.Context} ctx - The context object that is passed to the middleware to decorate.
 * @param {Function} next - The next function in the middleware chain.
 */
export function decorateContext(ctx, next) {
  Object.assign(ctx, {
    render: content => render(content, root),
    baseUrl,
    root,
  });

  next();
}