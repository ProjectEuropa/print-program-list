function enablePasteForCanvas(canvas) {
    const pasteEvent = function (e) {
        (function () {
            //画像データを検索
            const items = e.clipboardData.items;
            let imageItem;

            Object.keys(items).some(function (value, index) {
                if (items[index].type.indexOf("image/") != -1) {
                    imageItem = items[index];
                    return true;
                }
            });

            if (!imageItem) {
                // 画像がないので何もしない
                return;
            }

            //clipboardData.items -> Blob -> Image の順に変換
            const blob = imageItem.getAsFile();
            const blobUrl = window.URL.createObjectURL(blob);
            let img = new Image();
            img.onload = function () {
                //Imageをキャンバスに描画
                const width = img.width;
                const height = img.height;
                canvas.width = width;
                canvas.height = height;
                let context = canvas.getContext("2d");
                context.drawImage(img, 0, 0, width, height)
                // 描画したあとにリサイズ
                canvasResize(canvas, 100, 100);
            };
            img.src = blobUrl;

        }());
        e.preventDefault();
    };

    canvas.addEventListener("focus", function (e) {
        document.addEventListener("paste", pasteEvent, false);
    }, false);
    canvas.addEventListener("blur", function (e) {
        document.removeEventListener("paste", pasteEvent, false);
    }, false);
}

function canvasResize(canvas, width, height) {
    let img = new Image();
    img.onload = function () {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
    }
    img.src = canvas.toDataURL();
}

window.addEventListener("load", function (e) {
    enablePasteForCanvas(document.getElementById("canvas-left"));
    enablePasteForCanvas(document.getElementById("canvas-right"));
});
