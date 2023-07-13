import config from '../config';

class BackgroundParticles {
  /**
   * @description The container element that holds the particles.
   * @type {HTMLElement}
   */
  #container;

  /**
   * @description The configuration options for the background particles.
   * @type {object}
   */
  #config = {};

  /**
   * @description The array of particle objects.
   * @type {Array<Particle>}
   */
  #particles = [];

  /**
   * @description The animation frame ID for the particle movement.
   * @type {number|null}
   */
  #animation = null;

  /**
   * @description Creates an instance of BackgroundParticles.
   * @param {object} options - The options for configuring the animation.
   * @param {object} options.config - The configuration options for the animation.
   * @constructor
   */
  constructor({ config }) {
    this.#container = document.createElement('div');
    this.#config = config;

    this.#particles = [];
    this.#animation = null;

    this.#applyStyle(this.#container, {
      zIndex: Number.MIN_SAFE_INTEGER.toString(),
      position: 'absolute',
      inset: '0',
      overflow: 'hidden'
    });

    this.#applyStyle(document.body, { position: 'relative' });
    document.body.appendChild(this.#container);
  }

  /**
   * @description Loads the particle images asynchronously from the provided source URLs.
   * @param {Array<string>} source - An array of image source URLs.
   * @returns {Promise} A promise that resolves when all images are loaded.
   */
  async load(source) {
    const promises = source.map(src => {
      return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.alt = '';

        this.#applyStyle(image, { position: 'absolute' });

        image.onload = () => resolve(image);
      });
    });

    const images = await Promise.all(promises);
    this.#particles = this.#generateParticlesElements(images);
  }

  /**
   * @description Starts the particle animation.
   */
  start() {
    if (this.#animation) return;

    this.#particles.forEach(({ image }) => this.#container.appendChild(image));
    this.#move();
  }

  /**
   * @description Stops the particle animation.
   */
  stop() {
    if (!this.#animation) return;

    cancelAnimationFrame(this.#animation);

    this.#particles.forEach(({ image }) => this.#container.removeChild(image));
    this.#animation = null;
  }

  /**
   * @description Generates an array of particle elements based on the loaded images.
   * @param {Array<HTMLImageElement>} images - The array of loaded image elements.
   * @returns {Array<Particle>} An array of particle objects with image and offset properties.
   */
  #generateParticlesElements(images) {
    const landingPage = document.getElementById('landing');
    const result = [];

    if (!landingPage) return result;

    for (let i = 0; i < this.#config.amountOfParticles; i++) {
      const randomIndex = Math.floor(this.#getRandomFloat(0, images.length));
      const image = images[randomIndex].cloneNode(true);
      const particle = this.#resetParticle({ image: /** @type {HTMLImageElement} */ (image) });

      particle.offset = this.#getRandomFloat(
        -(this.#container.offsetHeight - landingPage.offsetHeight),
        landingPage.offsetHeight,
      );

      result.push(particle);
    }

    return result;
  }

  /**
   * @description Moves the particles and updates their positions.
   */
  #move() {
    const { motionAmplitude, motionPeriod } = this.#config;

    for (const particle of this.#particles) {
      particle.offset -= particle.speed;

      if (particle.offset <= -this.#container.offsetHeight) this.#resetParticle(particle);

      const motionPosition = (particle.offset / particle.image.height) * motionPeriod;
      const motionOffset = Math.sin(motionPosition * Math.PI * 2) * motionAmplitude;

      this.#applyStyle(particle.image, {
        bottom: `${-particle.offset}px`,
        transform: `translateX(${motionOffset}px)`,
      });
    }

    this.#animation = requestAnimationFrame(this.#move.bind(this));
  }

  /**
   * @description Resets the properties of a particle to its initial state.
   * @param {Partial<Particle>} particle - The particle object to be reset.
   * @returns {Particle} The reset particle object.
   */
  #resetParticle(particle) {
    const { speed, scale, opacity } = this.#config;

    particle.offset = particle.image?.height;
    particle.speed = this.#getRandomFloat(speed.min, speed.max);

    particle.image && this.#applyStyle(particle.image, {
      left: `${this.#getRandomFloat(-particle.image.width / 2, this.#container.offsetWidth - particle.image.width / 2)}px`,
      scale: this.#getRandomFloat(scale.min, scale.max).toString(),
      opacity: this.#getRandomFloat(opacity.min, opacity.max).toString(),
    });

    return /**@type {Particle} */ (particle);
  }

  /**
   * @description Generates a random float value between the specified minimum and maximum values.
   * @param {number} min - The minimum value for the random float (inclusive).
   * @param {number} max - The maximum value for the random float (inclusive).
   * @returns {number} - The generated random float between the min and max values.
   */
  #getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * @description Applies CSS styles to an element.
   * @param {HTMLElement} element - The target element.
   * @param {Partial<CSSStyleDeclaration>} style - The style object to apply.
   */
  #applyStyle(element, style) {
    Object.assign(element.style, style ?? {});
  }
}

/**
 * @description Initializes the background particles and starts their animation.
 * @param {PageJS.Context} ctx - The context object.
 * @param {Function} next - The next function in the middleware chain.
 */
export function initParticles(ctx, next) {
  const { backgroundParticles: { source, ...rest } } = config;

  const assets = source.map(src => `${ctx.baseUrl}/assets/images/${src}`);
  const particles = new BackgroundParticles({ config: rest });

  particles.load(assets).then(() => particles.start());

  next();
}

/**
 * @description Represents an individual particle.
 * @typedef {object} Particle
 * @property {HTMLImageElement} image - The image element representing the particle.
 * @property {number} offset - The vertical offset of the particle, indicating its current position along the y-axis.
 * @property {number} speed - The vertical speed of the particle, determining how fast it moves upward.
 */