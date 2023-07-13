import config from '../config';

const SIDES = Object.freeze({
  'left': Object.freeze({ axis: 'top', rotation: 0, transformOrigin: undefined }),
  'right': Object.freeze({ axis: 'top', rotation: 180, transformOrigin: undefined }),
  'top': Object.freeze({ axis: 'left', rotation: 90, transformOrigin: 'top' }),
  'bottom': Object.freeze({ axis: 'left', rotation: 270, transformOrigin: 'bottom' }),
});

class BorderImages {
  /**
   * @description The container element that holds the border images.
   * @type {HTMLElement}
   */
  #container;
  /**
   * @description The array of loaded base64 images.
   * @type {Array<HTMLImageElement>}
   */
  #images = [];
  /**
   * @description The configuration options for the border images.
   * @type {Record<string, any>}
   */
  #config = {};

  /**
   * @description Creates an instance of BorderImages.
   * @param {object} options - The options for configuring the images.
   * @param {string} options.name - The name/id of the container element.
   * @param {Record<string, any>} options.config - The configuration object for the images.
   * @constructor
   */
  constructor({ name, config }) {
    this.#container = document.getElementById(name) || document.createElement('div');
    this.#config = Object.freeze(config);

    this.#applyStyle(this.#container, this.#config.containerStyle);
    this.#container.setAttribute('id', name);

    this.#applyStyle(document.body, this.#config.parentStyle);
    document.body.appendChild(this.#container);
  }

  /**
   * @description Loads the border images asynchronously from the provided source URLs.
   * @param {Array<string>} source - An array of image source URLs.
   * @returns {Promise} A promise that resolves when all images are loaded.
   */
  async load(source) {
    const responses = await Promise.all(source.map(source => fetch(source)));
    const fileBlobs = await Promise.all(responses.map(response => response.blob()));
    const base64 = await Promise.all(fileBlobs.map(fileBlob => this.#convertToBase64(fileBlob)));

    this.#images = await this.#loadImages(base64);
    this.#generateBorderImages();

    screen.orientation.addEventListener('change', () => {
      window.addEventListener('resize', () => {
        this.#generateBorderImages();
      }, { once: true });
    });
  }

  /**
   * @description Retrieves the base64 representation of the given blob.
   * @param {Blob} blob - The Blob object to convert.
   * @returns {Promise<string>} - A promise that resolves with the base64-encoded string.
   */
  #convertToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(/**@type {string}*/(reader.result)));
      reader.addEventListener('error', reject);

      reader.readAsDataURL(blob);
    });
  }

  /**
   * @description Loads the images from the provided sources.
   * @param {Array<string>} sources - An array of image sources.
   * @returns {Promise<Array<HTMLImageElement>>} A promise that resolves to an array of loaded HTML image elements.
   */
  #loadImages(sources) {
    return Promise.all(sources.map((source) => (
      new Promise((resolve, reject) => {
        const image = new Image();
        image.src = source;
        image.alt = '';

        this.#applyStyle(image, { position: 'absolute', maxWidth: 'min(17vh, 17vw)', height: 'auto' });

        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', reject);
      })
    )));
  }

  /**
   * @description Generates the border images based on the loaded images and configuration.
   */
  #generateBorderImages() {
    this.#container.replaceChildren();

    const { clientWidth, clientHeight } = this.#container;
    const { spacing, offset } = this.#config;
    const footerHeight = document.querySelector('footer')?.clientHeight ?? 0;

    for (const side of Object.keys(SIDES)) {
      const { axis, rotation, transformOrigin } = SIDES[side];
      const footerOffset = side === 'bottom' ? footerHeight : 0;
      const offsetting = (offset[side] ?? offset.default);
      let distance = 0;

      do {
        const image = this.#getRandomImage();
        this.#container.appendChild(image);

        this.#applyStyle(image, {
          [axis]: `${distance}px`,
          [side]: `${(image.offsetWidth * offsetting) + footerOffset}px`,
          transformOrigin,
          transform: `rotate(${rotation}deg)`,
        });

        distance += image.offsetWidth * spacing;
      } while (distance > 0 && distance < (axis === 'top' ? clientHeight : clientWidth));
    }
  }

  /**
   * @description Retrieves a randomly selected image form the loaded images.
   * @returns {HTMLImageElement} The randomly selected HTML image element.
   */
  #getRandomImage() {
    const image = this.#images[Math.floor(Math.random() * this.#images.length)];
    return /**@type {HTMLImageElement}*/ (image.cloneNode(true));
  }

  /**
   * @description Applies CSS styles to an element.
   * @param {HTMLElement} element - The target element.
   * @param {Partial<CSSStyleDeclaration>} style - The style object to apply.
   */
  #applyStyle(element, style = {}) {
    Object.assign(element.style, style);
  }
}

/**
 * @description Creates the border images.
 * @param {PageJS.Context} ctx - The context object.
 * @param {Function} next - The next function in the middleware chain.
 */
export function createBorderImages(ctx, next) {
  const { borderImages: { name = 'custom-container', source, ...rest } } = config;

  const assets = config.borderImages.source.map(src => `${ctx.baseUrl}/assets/images/${src}`);
  new BorderImages({ name, config: rest }).load(assets);

  next();
}