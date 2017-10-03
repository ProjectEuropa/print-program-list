const AJAX_ERROR_MSG = "phpビルトインサーバー等を起動してサーバー上でhtmlにアクセスしてください。";

// phpビルトインサーバー等を起動してサーバー上でhtmlにアクセスすること
// テキストファイルからデータを取り出しセレクトボックスに値を入れる
$.ajax({
        url: "data/person.txt"
    })
    .then(
        function (data) {
            const arrayPerson = data.split(/\r\n|\r|\n/);
            addSelectboxElementAndDisplay("#person", arrayPerson);
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
            addSelectboxElementAndDisplay("#program", arrayProgram);
        },
        function () {});

// 担当者追加ボタンクリックイベント
$("#person-add").on("click", function () {
    const person = $("#person option:selected").text();
    addDraggableElement(person, "added-person");
});

// プログラム追加ボタンクリックイベント
$("#program-add").on("click", function () {
    const program = $("#program option:selected").text();
    addDraggableElement(program);
});

// 担当者セレクトボックス追加テキストボックスクリックイベント
$("#person-add-select-box").on("click", function () {
    addSelectboxOneElement("#person", "#person-add-text")
});

// プログラムセレクトボックス追加テキストボックスクリックイベント
$("#program-add-select-box").on("click", function () {
    addSelectboxOneElement("#program", "#program-add-text")
});

/*
 * セレクトボックスにテキストボックスに書かれた要素を１つ追加する
 * @param String 対象セレクトボックスid (ex."#person")
 * @param String 対象テキストボックスid (ex."#person-add-text")
 * return void
 */
function addSelectboxOneElement(selectboxId, textboxId) {
    const text = $(textboxId).val();
    if (text !== "") {
        $(selectboxId).append($("<option>").html(text).val(text));
        $(textboxId).val("");
    }
}

/*
 * ドラッグアンドドロップ可能な要素を追加する。ダブルクリックで要素を消せるようにも設定。
 * ドラッグした要素はコピー元のまま残す。コピーしたクローンは再度クローンを残さない。
 * @param String セレクトボックスで選択している文字列
 * @param String 追加するclass要素
 * return void
 */
function addDraggableElement(val, className) {
    $("main").append("<div class=" + "'draggable " + className + " container table-char'>" + val + "</div>");
    $( ".draggable" ).draggable({
        helper : "clone",
        snap: ".draggable-snap",
    }).dblclick(function (event) {
        $(this).remove();
    });

    // ドラッグ元をコピーして残す
    $("body").droppable({
        drop: function(event, ui) {
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
        }
    });
}

/*
 * 第一引数のIDのセレクトボックスに対して第二引数の配列の値を追加する。
 * 最後にセレクトボックスの全ての中身をD＆D可能な要素として表示する。
 * @param String (ex. "#person")
 * @param array 
 * return void
 */
function addSelectboxElementAndDisplay(id, array) {
    array.forEach(function (element) {
        if (element !== "") {
            $(id).append($("<option>").html(element).val(element));
        }
    });

    const selectboxElement = $(id).children();

    let className = "";

    // idが担当者のみクラス要素を追加
    if (id == "#person") {
        className = "added-person"
    }

    Object.keys(selectboxElement).forEach(function (value, index) {
        addDraggableElement(selectboxElement.eq(index).text(), className);
    });
}