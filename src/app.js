import page from 'page';
import { decorateContext, preloadBorderImages, createBorderImages } from './middleware';
import { invitationCreate, invitationView } from './views';

page(decorateContext);
page(preloadBorderImages);
page('/', invitationCreate, createBorderImages);
page('/pokana/:id', invitationView, createBorderImages);

page.start();