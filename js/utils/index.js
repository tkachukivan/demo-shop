export const setFileToBase64 = (file) => {
    return new Promise((resolve) => {
        const fr = new FileReader();

        fr.onload = () => { resolve(fr.result); }

        fr.readAsDataURL(file);
    });
};

export const resolvePromiseInTime = (timeout) => {
    return new Promise((res) => {
        setTimeout(res, timeout);
    })
}
