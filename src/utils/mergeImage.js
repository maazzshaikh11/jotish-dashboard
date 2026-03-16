export const mergeImages = (photoBase64, signatureBase64) => {
  return new Promise((resolve) => {
    if (!photoBase64 || !signatureBase64) return resolve(null);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const photo = new Image();
    const signature = new Image();

    photo.onload = () => {
      canvas.width = photo.width;
      canvas.height = photo.height;
      ctx.drawImage(photo, 0, 0);

      signature.onload = () => {
        // Overlay signature on top of the photo
        ctx.drawImage(signature, 0, 0, photo.width, photo.height);
        resolve(canvas.toDataURL("image/png"));
      };
      signature.src = signatureBase64;
    };
    photo.src = photoBase64;
  });
};