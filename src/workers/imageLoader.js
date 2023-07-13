self.addEventListener('message', async ({ data }) => {
  try {
    const responses = await Promise.all(data.map(source => fetch(source)));
    const fileBlobs = await Promise.all(responses.map(response => response.blob()));
    const base64 = await Promise.all(fileBlobs.map(fileBlob => convertToBase64(fileBlob)));

    self.postMessage({ success: true, base64 });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
});

/**
 * @description Retrieves the base64 representation of the given blob.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} - A promise that resolves with the base64-encoded string.
 */
function convertToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(/**@type {string}*/ (reader.result)));
    reader.addEventListener('error', reject);

    reader.readAsDataURL(blob);
  });
}