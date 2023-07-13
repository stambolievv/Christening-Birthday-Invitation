export default {
  borderImages: {
    name: 'border-images-container',
    source: [
      'leaf1.png',
      'leaf2.png',
      'leaf3.png',
      'leaf4.png',
      'leaf5.png',
      'leaf6.png',
      'leaf7.png',
      'leaf8.png',
      'leaf9.png',
      'leaf10.png',
      'leaf11.png',
      'leaf12.png',
      'leaf13.png',
      'leaf14.png',
      'leaf15.png',
    ],
    parentStyle: {
      position: 'relative',
    },
    containerStyle: {
      zIndex: Number.MIN_SAFE_INTEGER.toString(),
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
    },
    spacing: 0.4,
    offset: {
      default: -0.2,
      top: 0.5,
      bottom: 0.4,
    },
  },
};