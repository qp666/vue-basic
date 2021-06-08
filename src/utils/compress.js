const ImgObj = {
    createObjectURL(blob) {
        let url = "";
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(blob)
        } else if (window.URL != undefined) { // IE
            url = window.URL.createObjectURL(blob)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(blob)
        }
        return url;
    },
    convertToBlob(base64Str, fileType) {
        let base64 = window.atob(base64Str);
        let len = base64.length;
        let buff = new ArrayBuffer(len);
        let uarr = new Uint8Array(buff);

        for (let i = 0; i < len; i++) {
            uarr[i] = base64.charCodeAt(i);
        }

        let blob = null;

        try {
            blob = new Blob([buff], { type: fileType });
        } catch (e) {
            let BlobBuilder = window.BlobBuilder = (
                window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder
            );

            if (e.name === "TypeError" && BlobBuilder) {
                let builder = new BlobBuilder();
                builder.append(buff);
                blob = builder.getBlob(fileType);
            }
        }

        return blob;
    },
    resizeImage(file) {
        return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            try {
                
            reader.onload = function() {
                let img = new Image();
                let maxW = 500;
                let maxH = 500;
                img.onload = function() {
                    let w = this.naturalWidth;
                    let h = this.naturalHeight;
                    // 如果图片尺寸小于最大限制，则不压缩直接上传
                    if (w <= maxW && h <= maxH) {
                        resolve(file);
                        return;
                    }

                    let level = 0.6;
                    let resizeW = 0,
                        resizeH = 0;
                    if (w > maxW || h > maxH) {
                        //图片宽度大于高度，以宽度为准，高度重计
                        if (w > h) {
                            resizeW = maxW;
                            resizeH = (maxW * h) / w;
                        } else if (h > w) {
                            //图片高度大于宽度，以高度为准，宽度重计
                            resizeW = (maxH * w) / h;
                            resizeH = maxH;
                        }
                    } else {
                        resizeW = w;
                        resizeH = h;
                    }
                    // var multiple = Math.max(w / maxW, h / maxH);
                    // var resizeW = w / multiple;
                    // var resizeH = h / multiple;

                    let canvas = document.createElement("canvas");

                    canvas.width = resizeW;
                    canvas.height = resizeH;

                    let ctx = canvas.getContext("2d");

                    ctx.drawImage(img, 0, 0, resizeW, resizeH);

                    let base64Img = canvas.toDataURL(file.type, level);
                    let arr = base64Img.split(",");

                    resolve(arr[1]);
                };

                img.src = this.result;
            };
            reader.readAsDataURL(file);
            } catch (error) {
                reject(error)
            }

        });
    }
}
export default ImgObj;