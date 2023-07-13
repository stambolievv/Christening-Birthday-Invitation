import { html } from 'lit-html';

export default (prop, path) => html`
  <section id="landing">
    <h1 class="heading">Свето кръщение<br />и<br />първи рожден ден<span>Кристиан</span></h1>
  </section>
  <section id="invitation">
    <div class="content">
      <p>Мъничък съм и игрив, весел съм и съм щастлив.</p>
      <p>Кристиан се наричам, всички вас обичам.</p>
      <p>За моята първа година голям празник ще има!</p>
      <p>Аз ви каня от сърце и на моето кръщене.</p>
      <p>Две събития в едно да празнуваме - ще пеем, ще лудуваме.</p>
      <p>Вие радостта ми споделете, скъпи ${prop}, гости ми бъдете!</p>
    </div>
  </section>
  <section id="program">
    <article class="card">
      <h2 class="caption">Дата</h2>
      <img class="icon" src="${path}/assets/images/date.png" alt="" />
      <p class="sub-description">2023 г.</p>
    </article>
    <article class="card">
      <h2 class="caption">Храм</h2>
      <img class="icon" src="${path}/assets/images/church.png" alt="" />
      <h3 class="description">&ldquo;св. вмчк Георги Победоносец&rdquo;<br />село Белащица</h3>
      <p class="sub-description">12:00 часа</p>
    </article>
    <article class="card">
      <h2 class="caption">Парти</h2>
      <img class="icon" src="${path}/assets/images/cake.png" alt="" />
      <h3 class="description">&ldquo;Сентрал Парк&rdquo;<br />Младежки хълм</h3>
      <p class="sub-description">14:00 часа</p>
    </article>
  </section>
  <section id="location">
    <img class="separator" src="${path}/assets/images/separator1.png" alt="" />
    <div class="map-container">
      <h4 class="map-name">Карта към храм &ldquo;св. вмчк Георги Победоносец&rdquo;</h4>
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11849.532070447933!2d24.7433795!3d42.0564089!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acdb1e9e11159d%3A0x752d03c5558998ce!2sBelashtitsa%20Monastery%20%E2%80%9CSveti%20Velikomachenik%20Georgi%20Pobedonosets%E2%80%9D!5e0!3m2!1sen!2sbg!4v1689026059645!5m2!1sen!2sbg" title="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <img class="separator" src="${path}/assets/images/separator2.png" alt="" />
    <div class="map-container">
      <h4 class="map-name">Карта към ресторант &ldquo;Сентрал Парк&rdquo;</h4>
      <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11836.38850443113!2d24.72347679391595!3d42.12680391927995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd0324755afe3%3A0x13e4b7a768479d70!2zItCh0LXQvdGC0YDQsNC7INC_0LDRgNC6Ig!5e0!3m2!1sbg!2sbg!4v1685027479324!5m2!1sbg!2sbg&" title="map" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="separator"></div>
  </section>
  <footer>
    <p>Очакваме Вашето потвърждение до 17.07.2023г.</p>
  </footer>
`;