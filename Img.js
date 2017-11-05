class Img {
    constructor() {
        this.imgsize = {
            width: 0,
            height: 0
        }
    }
    load(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechange = () => {
                    if (img.readyState == 'complete') {
                        this.imgsize.width = img.width;
                        this.imgsize.height = img.height;
                        resolve(this.imgsize);
                    }
                }
            } else {
                img.onload = () => {
                    if (img.complete) {
                        this.imgsize.width = img.width;
                        this.imgsize.height = img.height;
                        resolve(this.imgsize);
                    }
                }
            }
            img.onerror = () => {
                reject(null);
            };
            img.src = url;
        });
    }
}

export default new Img();
