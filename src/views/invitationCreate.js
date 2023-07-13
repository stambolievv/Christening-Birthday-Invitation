import page from 'page';
import { html } from 'lit-html';
import { createRecipient } from '../api/services';
import { invitation } from '../templates';

/**
 * @description Renders a form for creating a new invitation to a recipient.
 * @param {PageJS.Context} ctx - The context object to use for rendering the form.
 * @param {Function} next - The next function in the middleware chain.
 */
export function invitationCreate(ctx, next) {
  const { baseUrl } = ctx;

  const template = invitation(html`<input @keydown=${onSubmit} class="recipient" type="text" name="recipient" aria-label="recipient" />`, baseUrl);
  ctx.render(template);

  next();
}

/**
 * @description Handles the "keydown" event on the recipient input field, creating a new recipient and redirecting to the new invitation page if the `Enter` key is pressed.
 * @param {KeyboardEvent} event - The "keydown" event.
 */
async function onSubmit(event) {
  const value = event.target instanceof HTMLInputElement ? event.target.value.trim() : undefined;

  if (event.key !== 'Enter' || !value) return;

  const { objectId } = await createRecipient(value);
  return page.redirect(`/pokana/${objectId}`);
}