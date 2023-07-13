import { html } from 'lit-html';

export default (prop, path) => html`
  <section id="landing">
    <h1 class="heading background-cloud">Свето кръщение<br /><span>Емил</span></h1>
  </section>
  <section id="invitation">
    <div class="content background-cloud">
      <p>Аз съм слънчице засмяно,<br />на няколко месеца само,<br />и ви каня от сърце на моето кръщене.</p>
      <p>Кръстничка и кръстник ме кръщават,<br />името Емил ми дават.</p>
      <p>А вие радостта ми споделете<br />и скъпи гости ми бъдете.<br /></p>
      <p>${prop},<br />заповядайте на моето тържество!</p>
    </div>
  </section>
  <section id="program">
    <article class="card background-cloud">
      <h2 class="caption">Кога</h2>
      <img class="icon" src="${path}/assets/images/date.png" alt="" />
      <h3 class="description">09 септември</h3>
      <p class="sub-description">2023 г.</p>
    </article>
    <article class="card background-cloud">
      <h2 class="caption">Храм</h2>
      <img class="icon" src="${path}/assets/images/baptize.png" alt="" />
      <h3 class="description">&ldquo;Успение Богородично&rdquo;<br />гр. Куклен</h3>
      <p class="sub-description">10:30 часа</p>
    </article>
    <article class="card background-cloud">
      <h2 class="caption">Ресторант</h2>
      <img class="icon" src="${path}/assets/images/restaurant.png" alt="" />
      <h3 class="description">&ldquo;Сентрал Парк&rdquo;<br />Младежки хълм</h3>
      <p class="sub-description">12:30 часа</p>
    </article>
  </section>
  <section id="location">
    <img class="separator" src="${path}/assets/images/separator.png" alt="" />
    <div class="map-container background-cloud">
      <h4 class="map-name">Карта към храм &ldquo;Успение Богородично&rdquo;</h4>
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1481.716796608049!2d24.78566323007894!3d42.03388175338276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acdbc101f88e01%3A0x9ccb5b808c30f102!2z0KXRgNCw0Lwg4oCe0KPRgdC_0LXQvdC40LUg0JHQvtCz0L7RgNC-0LTQuNGH0L3QvuKAnA!5e0!3m2!1sbg!2sbg!4v1685027146232!5m2!1sbg!2sbg" title="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <img class="separator" src="${path}/assets/images/separator.png" alt="" />
    <div class="map-container background-cloud">
      <h4 class="map-name">Карта към ресторант &ldquo;Сентрал Парк&rdquo;</h4>
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11836.38850443113!2d24.72347679391595!3d42.12680391927995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd0324755afe3%3A0x13e4b7a768479d70!2zItCh0LXQvdGC0YDQsNC7INC_0LDRgNC6Ig!5e0!3m2!1sbg!2sbg!4v1685027479324!5m2!1sbg!2sbg&" title="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <img class="separator" src="${path}/assets/images/balloons.png" alt="" />
  </section>
  <footer>
    <p>Очакваме Вашето потвърждение до 20.08.2023г.</p>
  </footer>
`;