import { html } from 'lit-html';
import { getRecipient } from '../api/services';
import { invitation } from '../templates';

/**
 * @description Renders the details of an invitation for a recipient.
 * @param {PageJS.Context} ctx - The context object to use for rendering the details.
 * @param {Function} next - The next function in the middleware chain.
 */
export async function invitationView(ctx, next) {
  const { baseUrl, params: { id } } = ctx;
  const { name } = await getRecipient(id);

  const template = invitation(html`<span class="recipient">${name}</span>`, baseUrl);
  ctx.render(template);

  next();
}