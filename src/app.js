import page from 'page';
import { decorateContext, initParticles } from './middleware';
import { invitationCreate, invitationView } from './views';

page(decorateContext);
page('/', invitationCreate, initParticles);
page('/pokana/:id', invitationView, initParticles);

page.start();