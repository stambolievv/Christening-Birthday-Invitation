import page from 'page';
import { decorateContext, createBorderImages } from './middleware';
import { invitationCreate, invitationView } from './views';

page(decorateContext);
page('/', invitationCreate, createBorderImages);
page('/pokana/:id', invitationView, createBorderImages);

page.start();