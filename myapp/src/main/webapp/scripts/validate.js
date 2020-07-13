/**
 文字列チェック
 @param  input    String  チェック対象文字列
 @param  charType String  チェック種別
                          　・"zenkaku"               : 全角文字（ひらがな・カタカナ・漢字 etc.）
                          　・"hiragana"              : 全角ひらがな
                          　・"katakana"              : 全角カタカナ
                          　・"alphanumeric"          : 半角英数字（大文字・小文字）
                          　・"numeric"               : 半角数字
                          　・"alphabetic"            : 半角英字（大文字・小文字）
                          　・"upper-alphabetic"      : 半角英字（大文字のみ）
                          　・"lower-alphabetic"      : 半角英字（小文字のみ）
 @return Boolean チェック結果OKかどうか 
                 true  : チェックOK（引数に指定した種別の文字列のみで構成されている)
                 false : チェックNG（引数に指定した種別以外の文字列が含まれている）
 */
function checkCharType(input, charType) {
    switch (charType) {
        // 全角文字（ひらがな・カタカナ・漢字 etc.）
        case "zenkaku":
            return (input.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) ? true : false;
        // 全角ひらがな
        case "hiragana":
            return (input.match(/^[\u3041-\u3096]+$/)) ? true : false;
        // 全角カタカナ
        case "katakana":
            return (input.match(/^[\u30a1-\u30f6]+$/)) ? true : false;
        // 半角英数字（大文字・小文字）
        case "alphanumeric":
            return (input.match(/^[0-9a-zA-Z]+$/)) ? true : false;
        // 半角数字
        case "numeric":
            return (input.match(/^[0-9]+$/)) ? true : false;
        // 半角英字（大文字・小文字）
        case "alphabetic":
            return (input.match(/^[a-zA-Z]+$/)) ? true : false;
        // 半角英字（大文字のみ）
        case "upper-alphabetic":
            return (input.match(/^[A-Z]+$/)) ? true : false;
        // 半角英字（小文字のみ）
        case "lower-alphabetic":
            return (input.match(/^[a-z]+$/)) ? true : false;
    }
    return false;
}

let isHanEisu = function (str) {
    let tmpStr = (str == null) ? "" : str;
    if (tmpStr.match(/^[A-Za-z0-9]*$/)) {
        return true;
    } else {
        return false;
    }
}

// 入力チェックの共通処理
let validInput = function (strVal, errClass) {
    let tmpErrMsg = '';

    // 未入力チェック
    if (strVal == '') {
        tmpErrMsg = '未入力です';
    }

    // 半角英数字文字のみ
    if (isHanEisu(strVal) == false) {
        tmpErrMsg = '半角英数字のみです';
    }

    if (tmpErrMsg.length > 0) {
        //$('.user-message.user-userId label').text(tmpErrMsg);
        $('.user-message' + errClass + ' label').css('color', 'blue').text(tmpErrMsg);
    }

    return tmpErrMsg.length > 0;

};
