'use strict'

$(function () {
  var companyCd = 'halgai';
  var apiKey = 'Email-api-key';

  var sesshonKey = '';
  var refreshKey = '';
  var csrfToken = '';

  var userId = 0;
  var companyId = 0;

  // [認証系処理]

  // ログイン
  $('#login').on('click', function () {
    var userCd = $('#userCd').val();
    var password = $('#password').val();
    var json = JSON.stringify({ userCd: userCd, password: password });
    var res;
    $('#login-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/auth/login/mn',
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey
      },
      data: json
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      setSesionKey(data.sessionKey);
      setRefreshKey(data.refreshKey);
      setCsrfToken(data.csrfToken);
      setUserId(data.user.userId);
      setCompanyId(data.company.companyId);
      console.log(res);
      $('#login-result').val(res);
      $('#login').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#login-result').val(res);
      $('#login').blur();
    });
  });
  $('#login-clear').on('click', function () {
    $(this).blur();
    $('#login-result').val('');
    $('#userCd').val('');
    $('#password').val('');
  });

  // ログアウト
  $('#logout').on('click', function () {
    var json = JSON.stringify({ userId: userId });
    $('#logout-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/auth/logout',
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey,
        'x-csrf-token': csrfToken
      },
      data: json
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      // setSesionKey('');
      setSesionKey('LOGOUT_SESSION_KEY');
      // setRefreshKey('');
      setRefreshKey('LOGOUT_REFRESH_KEY');
      setCsrfToken('');
      $('#logout-result').val('status: ' + jqXRH.status + '\nstatus text: ' + jqXRH.statusText);
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#logout-result').val(res);
      $('#logout').blur();
    });
  });
  $('#logout-clear').on('click', function () {
    $(this).blur();
    $('#logout-result').val('');
  });

  // CSRF再取得
  $('#refresh-token').on('click', function () {
    var res;
    $('#refresh-token-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/auth/csrf',
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      console.log(res);
      $('#refresh-token-result').val(res);
      $('#refresh-token').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#refresh-token-result').val(res);
      $('#refresh-token').blur();
    });
  });
  $('#refresh-token-clear').on('click', function () {
    $(this).blur();
    $('#refresh-token-result').val('');
  });
  // ---------------------------- //
  // [項目取得処理]
  // 選択項目取得
  $('#get-select-item').on('click', function () {
    var selectItem;
    var res;
    $('#get-select-item-result').val('');
    selectItem = encodeURIComponent($('#get-select-item-selectItem').val());
    $.ajax({
      url: '/v1/' + companyCd + '/selectitems?target=' + selectItem,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      console.log(res);
      $('#get-select-item-result').val(res);
      $('#get-select-item').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#get-select-item-result').val(res);
      $('#get-select-item').blur();
    });
  });
  $('#get-select-item-clear').on('click', function () {
    $(this).blur();
    $('#get-select-item-result').val('');
  });

  // ---------------------------- //
  // User master
  // ---------------------------- //

  // [ユーザマスタ処理]
  // ユーザ一覧取得
  $('#search-user-info').on('click', function () {
    var res;
    var query = '/v1/' + companyCd + '/users';
    // 検索項目以外取得
    var sort = $('#search-user-info-sort').val();
    var asc = $('#search-user-info-asc').val();
    var limit = $('#search-user-info-limit').val();
    var offset = $('#search-user-info-offset').val();
    // 検索項目パラメータ生成
    var paramUserId = $('#search-user-info-UserId').val();
    var paramUserCd = $('#search-user-info-UserCd').val();
    var paramUserTx = $('#search-user-info-UserTx').val();
    var paramRoleId = $('#search-user-info-RoleId').val();
    var paramRoleTx = $('#search-user-info-RoleTx').val();
    var paramLogicalWhId = $('#search-user-info-LogicalWhId').val();
    // 検索項目編集

    // 最終パラメータ
    var search = makeFinalParameter(
      sort,
      asc,
      limit,
      offset,
      paramUserId,
      paramUserCd,
      paramUserTx,
      paramRoleId,
      paramRoleTx,
      paramLogicalWhId);
    $('#search-user-info-result').val('');

    console.log('search=[' + search + ']');
    if (search !== '') {
      query += search;
    }
    console.log('query=[' + query + ']');
    $.ajax({
      url: query,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      console.log(res);
      $('#search-user-info-result').val(res);
      $('#search-user-info').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#search-user-info-result').val(res);
      $('#search-user-info').blur();
    });
  });

  $('#search-user-info-clear').on('click', function () {
    $(this).blur();
    $('#search-user-info-result').val('');
    // 検索項目以外初期化
    $('#search-user-info-sort').val('');
    $('#search-user-info-asc').val('');
    $('#search-user-info-limit').val('');
    $('#search-user-info-offset').val('');
    // 検索項目初期化
    $('#search-user-info-UserId').val('');
    $('#search-user-info-UserCd').val('');
    $('#search-user-info-UserTx').val('');
    $('#search-user-info-RoleId').val('');
    $('#search-user-info-RoleTx').val('');
    $('#search-user-info-LogicalWhId').val('');
    // $('#search-user-info-SexCd').val('');
    // $('#search-user-info-SexTx').val('');
  });

  // ---------------------------- //
  // Arrival
  // ---------------------------- //

  // [入庫]
  // 入荷予定一覧表示
  $('#search-arrive-info').on('click', function () {
    // 検索項目以外取得
    var sort = $('#search-arrive-info-sort').val();
    var asc = $('#search-arrive-info-asc').val();
    var limit = $('#search-arrive-info-limit').val();
    var offset = $('#search-arrive-info-offset').val();

    var search;
    var query;
    var res;
    // 検索項目パラメータ生成
    var params = {};

    $('#search-arrive-info-result').val('');
    // 検索パラメータ編集
    search = makeArrivePlanSearchParam(sort, asc, limit, offset, params);
    console.log('search=[' + search + ']');
    query = '/v1/' + companyCd + '/arriveplans';
    if (search !== '') {
      query += search;
    }
    console.log('query=[' + query + ']');
    $.ajax({
      url: query,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      console.log(data);
      $('#search-arrive-info-result').val(res);
      $('#search-arrive-info').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#search-arrive-info-result').val(res);
      $('#search-arrive-info').blur();
    });
  });

  $('#search-arrive-info-clear').on('click', function () {
    $(this).blur();
    $('#search-arrive-info-result').val('');
  });

  function makeArrivePlanSearchParam(sort, asc, limit, offset, params) {
    var tmp = [];
    var result = '';

    if (sort !== '') {
      tmp.push('sort=' + sort);
    }
    if (asc !== '') {
      tmp.push('asc=' + asc);
    }
    if (limit !== '') {
      tmp.push('limit=' + limit);
    }
    if (offset !== '') {
      tmp.push('offset=' + offset);
    }
    if (tmp.length === 0) {
      return '';
    }

    for (var i = 0; i < tmp.length; i++) {
      if (i === 0) {
        result += '?' + tmp[i];
      } else {
        result += '&' + tmp[i];
      }
    }
    return result;
  }
  //

  function makeFinalParameter(sort, asc, limit, offset, userId, userCd, userTx, roleId, roleTx, logicalWhId) {
    var result;
    var tmp = [];
    if (sort !== '') {
      tmp.push('sort=' + sort);
    }
    if (asc !== '') {
      tmp.push('asc=' + asc);
    }
    if (limit !== '') {
      tmp.push('limit=' + limit);
    }
    if (offset !== '') {
      tmp.push('offset=' + offset);
    }
    if (userId !== '') {
      tmp.push('userId=' + encodeURIComponent(userId));
    }
    if (userCd !== '') {
      tmp.push('userCd=' + encodeURIComponent(userCd));
    }
    if (userTx !== '') {
      tmp.push('userTx=' + encodeURIComponent(userTx));
    }
    if (roleId !== '') {
      tmp.push('roleId=' + encodeURIComponent(roleId));
    }
    if (roleTx !== '') {
      tmp.push('roleTx=' + encodeURIComponent(roleTx));
    }
    if (logicalWhId !== '') {
      tmp.push('logicalWhId=' + encodeURIComponent(logicalWhId));
    }

    if (tmp.length === 0) {
      return '';
    }
    result = '';
    for (var i = 0; i < tmp.length; i++) {
      if (i === 0) {
        result += '?' + tmp[i];
      } else {
        result += '&' + tmp[i];
      }
    }
    return result;
  }

  // ユーザ情報取得
  $('#get-user-info').on('click', function () {
    var res;
    var targetUserId = $('#get-user-info-userId').val();
    $('#get-user-info-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/users/' + targetUserId,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey,
        'x-csrf-token': csrfToken
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      res = JSON.stringify(data, undefined, 2);
      console.log(res);
      $('#get-user-info-result').val(res);
      $('#get-user-info').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#get-user-info-result').val(res);
      $('#get-user-info').blur();
    });
  });
  $('#get-user-info-clear').on('click', function () {
    $(this).blur();
    $('#get-user-info-result').val('');
    $('#get-user-info-userId').val('');
  });

  // ユーザ情報登録
  $('#register-user-info').on('click', function () {
    var userCd = $('#register-user-info-UserCd').val();
    var userTx = $('#register-user-info-UserTx').val();
    var passwordTx = $('#register-user-info-PasswordTx').val();
    var langTx = $('#register-user-info-LangTx').val();
    var roleId = $('#register-user-info-RoleId').val();
    var logicalWhId = $('#register-user-info-LogicalWhId').val();
    var json = JSON.stringify({
      userCd: userCd,
      userTx: userTx,
      passwordTx: passwordTx,
      langTx: langTx,
      roleId: roleId,
      logicalWhId: logicalWhId
    });
    $('#register-user-info-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/users',
      method: 'post',
      data: json,
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey,
        'x-csrf-token': csrfToken
      }
    }).done(function (data, textStatus, jqXRH) {
      var res = JSON.stringify(data, undefined, 2);
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      console.log(res);
      $('#register-user-info-result').val(res);
      $('#register-user-info').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#register-user-info-result').val(res);
      $('#register-user-info').blur();
    });
  });
  $('#register-user-info-clear').on('click', function () {
    $(this).blur();
    $('#register-user-info-result').val('');
    $('#register-user-info-UserCd').val('');
    $('#register-user-info-UserTx').val('');
    $('#register-user-info-PasswordTx').val('');
    $('#register-user-info-LangTx').val('');
    $('#register-user-info-RoleId').val('');
    $('#register-user-info-LogicalWhId').val('');
  });

  // ユーザ情報更新
  $('#update-user-info').on('click', function () {
    var targetUserId = $('#update-user-info-UserId').val();
    var userCd = $('#update-user-info-UserCd').val();
    var userTx = $('#update-user-info-UserTx').val();
    var oldPasswordTx = $('#update-user-info-OldPasswordTx').val();
    var passwordTx = $('#update-user-info-PasswordTx').val();
    var langTx = $('#update-user-info-LangTx').val();
    var roleId = $('#update-user-info-RoleId').val();
    var logicalWhId = $('#update-user-info-LogicalWhId').val();
    var json = JSON.stringify({
      userCd: userCd,
      userTx: userTx,
      langTx: langTx,
      roleId: roleId,
      logicalWhId: logicalWhId,
      oldPasswordTx: oldPasswordTx,
      passwordTx: passwordTx
    });
    $('#update-user-info-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/users/' + targetUserId,
      method: 'put',
      data: json,
      contentType: 'application/json',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey,
        'x-csrf-token': csrfToken
      }
    }).done(function (data, textStatus, jqXRH) {
      var res = JSON.stringify(data, undefined, 2);
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      console.log(res);
      $('#update-user-info-result').val(res);
      $('#update-user-info').blur();
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#update-user-info-result').val(res);
      $('#update-user-info').blur();
    });
  });
  $('#update-user-info-clear').on('click', function () {
    $(this).blur();
    $('#update-user-info-result').val('');
    $('#update-user-info-UserId').val('');
    $('#update-user-info-UserCd').val('');
    $('#update-user-info-UserTx').val('');
    $('#update-user-info-LangTx').val('');
    $('#update-user-info-RoleId').val('');
    $('#update-user-info-LogicalWhId').val('');
  });

  // ユーザ情報削除
  $('#delete-user-info').on('click', function () {
    var targetUserId = $('#delete-user-info-UserId').val();
    $('#delete-user-info-result').val('');
    $.ajax({
      url: '/v1/' + companyCd + '/users/' + targetUserId,
      method: 'delete',
      headers: {
        'x-api-key': apiKey,
        'x-session-key': sesshonKey,
        'x-csrf-token': csrfToken
      }
    }).done(function (data, textStatus, jqXRH) {
      console.log('status=' + jqXRH.status + ' text=' + jqXRH.statusText);
      $('#delete-user-info-result').val('status: ' + jqXRH.status + '\nstatus text: ' + jqXRH.statusText);
    }).fail(function (data, textStatus, errorThrown) {
      var res = getErrorText(data);
      console.log(res);
      $('#delete-user-info-result').val(res);
      $('#delete-user-info').blur();
    });
  });
  $('#delete-user-info-clear').on('click', function () {
    $(this).blur();
    $('#delete-user-info-result').val('');
    $('#delete-user-info-userId').val('');
  });

  // ---------------------------- //

  // エラーJson生成
  function getErrorText(data) {
    var res;
    var result = 'status: ' + data.status + '\nstatusText: ' + data.statusText + '\nerrors:\n';
    result += '  [\n';
    res = $.parseJSON(data.responseText);
    $.each(res.errors, function (i, val) {
      result += '    {\n';
      $.each(val, function (key, val) {
        result += '      ' + key + ': ' + val + '\n';
      });
      result += '    }\n';
    });
    result += '  ]\n';
    return result;
  }

  // セッションキー保存/画面更新
  function setSesionKey(value) {
    console.log('Set SessionKey=[' + value + ']');
    sesshonKey = value;
    $('input[name="sessionKey"]').val(value);
  }

  // リフレッシュキー保存/画面更新
  function setRefreshKey(value) {
    console.log('Set RefreshKey=[' + value + ']');
    refreshKey = value;
    $('input[name="refreshKey"]').val(value);
  }

  // CSRFトークン保存/画面更新
  function setCsrfToken(value) {
    console.log('Set CsrfToken=[' + value + ']');
    csrfToken = value;
    $('input[name="csrfToken"]').val(value);
  }

  // ユーザID保存
  function setUserId(value) {
    console.log('Set userId=[' + value + ']');
    userId = value;
  }

  // 会社ID保存
  function setCompanyId(value) {
    console.log('Set companyId=[' + value + ']');
    companyId = value;
  }

  // 初期化
  function init() {
    $('input[name="apiKey"]').val(apiKey);
  }

  init();
});
