let getUserList = function() {

	let userList = [];
	// webapiでデータ取得
	$.ajax({
	    url: './api/User/List',
	    type: 'get',
	    dataType: 'json',
	    async: false
	}).done(function(data) {
	    if (data.status == 'success') {
	    	userList = data.resultData;
	    }
	}).fail(function() {
	    alert('error');
	});
	return userList;

//  // 登録したリストを表示
//  let userList = sessionStorage.getItem('userList');
//
//  if (userList == null) {
//    userList = [];
//  } else {
//    userList = JSON.parse(userList);
//  }
//  return userList;
};

let makeTableHeader = function () {
  $('#registList').empty();
  // テーブルのヘッダ作成
  $('#registList').append(
    $('<ul>').addClass('nav').append(
      $('<li>').text('選択')
    ).append(
      $('<li>').text('アカウントID')
    ).append(
      $('<li>').text('パスワード')
    )
  );
};

let makeTableBody = function (data) {

  $.each(data, function () {
    let user = this;
    $('#registList').append(
      $('<ul>').addClass('nav').append(
        $('<li>').append($('<input>').attr({
          'type': 'checkbox',
          'value': user.userId
        }))
      ).append(
        $('<li>').text(user.userId)
      ).append(
        $('<li>').text(user.password)
      )
    );
  });

};

let editFunc = function() {
  // エラーメッセージクリア
  $('.user-message label').text('');
  // 値を取得
  let inputUserId = $('#userId').val();
  let inputPassword = $('#password').val();

  // チェック処理実行。エラーの場合は入力右横にエラーメッセージ表示。
  let errUser = validInput(inputUserId, '.user-userId');
  let errPass = validInput(inputPassword, '.user-password');
  if (errUser == true || errPass == true) {
    return;
  }

  $('#input').hide();
  $('#confirm').show();
  $('#finish').hide();

  $('#useid-confirm').text(inputUserId);
  $('#password-confirm').text(inputPassword);

};

let confirmAddFunc = function()

{// データ登録処理
  // 値を取得
  let inputUserId = $('#userId').val();
  let inputPassword = $('#password').val();

//  let userList = getUserList();

  let addData = {
    'userId': inputUserId,
    'password': inputPassword
  };

  //オブジェクトを文字列にして送信すること。
  let postData = JSON.stringify(addData);

	$.ajax({
	    url: './api/User/Add',
	    type: 'post',
	    dataType: 'json',
        contentType: 'application/json',
        data: postData,
	    async: false
	}).done(function(data) {
        if (data.status == 'success') {
            $('#input').hide();
            $('#confirm').hide();
            $('#finish').show();
        }
	}).fail(function() {
	    alert('error');
	});

//  userList.push(addData);
//
//  // object → string
//  sessionStorage.setItem('userList', JSON.stringify(userList));

//  $('#input').hide();
//  $('#confirm').hide();
//  $('#finish').show();

};

let confirmUpdateFunc = function()
{// データ登録処理
  // 値を取得
  let inputUserId = $('#userId').val();
  let inputPassword = $('#password').val();

  let userList = getUserList();

  // 更新処理
  let findIndex = -1;
  $.each(userList, function (index) {
      let user = this;
      if (user.userId == inputUserId) {
          findIndex = index;
          return false;
      }
  });

  if (findIndex >= 0) {
    userList[findIndex].password = inputPassword;
  }

  // object → string
  sessionStorage.setItem('userList', JSON.stringify(userList));

  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();

};

let finishFunc = function() {
  $('#userId').val('');
  $('#password').val('');

  // 登録したリストを表示
  let userList = getUserList();

  makeTableHeader();
  makeTableBody(userList);

  $('#input').show();
  $('#confirm').hide();
  $('#finish').hide();

};