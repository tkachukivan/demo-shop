export const setFileToBase64 = (file) => {
    return new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result);
        }
        fr.readAsDataURL(file);
    });
};


