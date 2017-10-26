const AJAX_ERROR_MSG = "phpビルトインサーバー等を起動してサーバー上でhtmlにアクセスしてください。";

// phpビルトインサーバー等を起動してサーバー上でhtmlにアクセスすること
// テキストファイルからデータを取り出しセレクトボックスに値を入れる
$.ajax({
        url: "data/person.txt"
    })
    .then(
        function (data) {
            const arrayPerson = data.split(/\r\n|\r|\n/);
            addDraggableElementAndDisplay("#person", arrayPerson);
        },
        function () {
            //1回だけダイアログを表示する
            $("#error").html(AJAX_ERROR_MSG);
            $("#myModal").modal("show");
        });

$.ajax({
        url: "data/program.txt"
    })
    .then(
        function (data) {
            const arrayProgram = data.split(/\r\n|\r|\n/);
            addDraggableElementAndDisplay("#program", arrayProgram);
        },
        function () {});

// 担当者追加ボタンクリックイベント
$("#person-add-button").on("click", function () {
    addDraggableElement($("#person-add-text").val(), "added-person");
    $("#person-add-text").val("");
});

// プログラム追加ボタンクリック
$("#program-add-button").on("click", function () {
    addDraggableElement($("#program-add-text").val());
    $("#program-add-text").val("");
});


/*
 * ドラッグアンドドロップ可能な要素を追加する。ダブルクリックで要素を消せるようにも設定。
 * ドラッグした要素はコピー元のまま残す。コピーしたクローンは再度クローンを残さない。
 * @param String セレクトボックスで選択している文字列
 * @param String 追加するclass要素
 * return void
 */
function addDraggableElement(val, className) {
    $("#draggable-fix").append("<div class=" + "'draggable " + className + " container table-char'>" + val + "</div>");
    $(".draggable").draggable({
        helper: "clone",
        snap: ".draggable-snap",
        appendTo: "body"
    }).dblclick(function (event) {
        $(this).remove();
    });

    // ドラッグ元をコピーして残す
    $("table").droppable({
        drop: function (event, ui) {
            // コピーしたクローンは残さない
            if (!$(ui.helper).hasClass("draggable-clone")) {
                $(ui.helper).removeClass("draggable");
                const newDiv = $(ui.helper).clone().addClass("draggable-clone " + className);
                $(this).append(newDiv);
                $(".draggable-clone").draggable({
                    snap: ".draggable-snap",
                }).dblclick(function (event) {
                    $(this).remove();
                });
            }
        },
    });
}

/*
 * セレクトボックスの全ての中身をD＆D可能な要素として表示する。
 * @param String (ex. "#person")
 * @param array 
 * return void
 */
function addDraggableElementAndDisplay(id, array) {
    let className = "";

    // idが担当者のみクラス要素を追加
    if (id == "#person") {
        className = "added-person"
    }

    array.forEach(function (value, index) {
        addDraggableElement(value, className);
    });
}

// クリック時にドラッグできる要素群を下部に固定する
$("table").on("click", function () {
    $("#draggable-fix").addClass("fixed");
});

const NUM_RIGHT_CLICK = 3;
// 右クリック時にドラッグできる要素群を下部に固定から元に戻す
$("table").on("mousedown", function(e) {
      if (e.which === NUM_RIGHT_CLICK) {
        $("#draggable-fix").removeClass("fixed"); 
      }
});
    
