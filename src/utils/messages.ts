const Messages = {
  en: {
    constraint_min: 'Minimum value: %s',
    constraint_max: 'Maximum value: %s',
    constraint_minLength: 'Minimum length: %s',
    constraint_maxLength: 'Maximum length: %s',
    constraint_email: 'Email',
    constraint_pattern: 'Required pattern: %s',
    format_numeric: 'Numeric',
    format_real: 'Real',
    format_uuid: 'UUID',
    formats_date: 'yyyy-MM-dd',
    error_invalid: 'Invalid value',
    error_invalid_java_util_Date: 'Invalid date value',
    error_invalid_date_format: 'Invalid date.',
    error_required: 'This field is required',
    error_number: 'Numeric value expected',
    error_real: 'Real number value expected',
    error_real_precision:
      'Real number value with no more than %s digit(s) including {1} decimal(s) expected',
    error_min: 'Must be greater or equal to %s',
    error_min_strict: 'Must be strictly greater than %s',
    error_max: 'Must be less or equal to %s',
    error_max_strict: 'Must be strictly less than %s',
    error_minLength: 'Minimum length is %s',
    error_maxLength: 'Maximum length is %s',
    error_email: 'Valid email required',
    error_pattern: 'Must satisfy %s',
    error_date: 'Valid date required',
    error_uuid: 'Valid UUID required',
    error_expected_date: 'Date value expected',
    error_expected_date_isoformat: 'Iso date value expected',
    error_expected_time: 'Time value expected',
    error_expected_jsarray: 'Array value expected',
    error_expected_jsboolean: 'Boolean value expected',
    error_expected_jsnumber: 'Number value expected',
    error_expected_jsobject: 'Object value expected',
    error_expected_jsstring: 'String value expected',
    error_expected_jsnumberorjsstring: 'String or number expected',
    error_expected_keypathnode: 'Node value expected',
    error_expected_uuid: 'UUID value expected',
    error_expected_validenumvalue: 'Valid enumeration value expected',
    error_expected_enumstring: 'String value expected',
    error_path_empty: 'Empty path',
    error_path_missing: 'Missing path',
    error_path_result: 'Multiple results for the given path',
    http_bad_request: 'Bad Request',
    http_unauthorized: 'Unauthorized',
    http_forbidden: 'Forbidden',
    http_not_found: 'Not Found path: [%s]',
    http_method_no_allowed: 'Method Not Allowed',
    http_not_acceptable: 'Not Acceptable',
    http_request_timeout: 'Request Timeout',
    http_conflict: 'Conflict',
    http_gone: 'Gone',
    http_request_entity_too_large: 'Request Entity Too Large',
    http_request_uri_too_long: 'Request-URI Too Long',
    http_unsupported_media_type: 'Unsupported Media Type',
    http_too_many_request: 'Too Meny Requests',
    http_internal_server_error: 'Internal Server Error',
    http_service_unavailable: 'Service Unavailable',
    error_http_header_invalid_contenttype: 'Content Type is invalid',
    error_http_header_required_apikey: 'API Key header is required',
    error_http_header_required_sessionkey: 'Session Key header is required',
    error_http_header_required_csrftoken: 'CSRF Token header is ruiquired',
    error_http_header_invalid_csrftoken: 'CSRF Token header is invalid',
    error_http_body_required_jsondata: 'Json data is empty',
    error_invalid_userid: 'User ID is invalid',
    error_required_userid: 'User ID is required',
    error_invalid_loginid: 'Login ID is invalid',
    error_required_loginid: 'Login ID is required',
    error_invalid_logincd: 'Login code is invalid',
    error_required_logincd: 'Login code is required',
    error_invalid_usercd: 'User code is invalid',
    error_required_usercd: 'User code is required',
    error_overlapping_usercd: 'User code is overlapping',
    error_already_exists_usercd: 'User code already exists',
    error_invalid_usertx: 'User name is invalid',
    error_required_usertx: 'User name is required',
    error_invalid_password: 'Password is invalid',
    error_required_password: 'Password is required',
    error_minlength_password: 'Password minLength: %s',
    error_toosimple_password: 'Password is too simple',
    error_required_old_and_new_passwords: 'Old and new passwords are required',
    error_invalid_old_password: 'Old password is invalid',
    error_invalid_loginid_password: 'Invalid Login ID or password',
    error_saving_session: 'Error saving the session for the user.',
    error_invalid_language: 'Language is invalid',
    error_required_language: 'Language is required',
    error_invalid_roleid: 'Role ID is invalid',
    error_required_roleid: 'Role ID is required',
    error_invalid_companyid: 'Company ID is invalid',
    error_required_companyid: 'Company ID is required',
    error_invalid_companycd: 'Company code is invalid',
    error_required_companycd: 'Company code is required',
    error_invalid_companytx: 'Company name is invalid',
    error_required_companytx: 'Company name is required',
    error_invalid_apikey: 'API Key is invalid',
    error_required_apikey: 'API Key is irequired',

    //これより追加
    error_invalid_authcd: 'AuthCd is invalid',
  },
  ja: {
    constraint_min: '最小値: %s',
    constraint_max: '最大値: %s',
    constraint_minLength: '最小の長さ: %s',
    constraint_maxLength: '最大の長さ: %s',
    constraint_email: '電子メール',
    constraint_pattern: '必須パターン: %s',
    format_date: '日付 ("%s")',
    format_numeric: '数字',
    format_real: '実数',
    format_uuid: 'UUID',
    formats_date: 'yyyy-MM-dd',
    error_invalid: '無効な値です。有効な値を入力してください。',
    error_invalid_java_util_Date:
      '無効な日付です。有効な日付を入力して下さい。',
    error_invalid_date_format: '日付が無効です。有効な日付を入力して下さい。',
    error_required: '必須項目です。',
    error_number: '数値のみです。',
    error_real: '小数値のみです。',
    error_real_precision: '{１} 桁の小数を含む %s 桁以下の実数値のみです。',
    error_min: '%s 以上でなければなりません。',
    error_min_strict: '%s より大きくなければなりません。',
    error_max: '%s 以下でなければなりません。',
    error_max_strict: '%s より小さくなければなりません。',
    error_minLength: '%s 桁以上でなければなりません。',
    error_maxLength: '%s 桁以下でなければなりません。',
    error_email: '有効な電子メールアドレスを入力してください。',
    error_pattern: '%s を満たす必要があります。',
    error_date: '有効な日付を入力してください。',
    error_uuid: '有効なUUIDを入力してください。',
    error_expected_date: 'Dateでなければなりません。',
    error_expected_date_isoformat: 'ISO Date形式でなければなりません。',
    error_expected_time: 'Time値でなければなりません。',
    error_expected_jsarray: 'Array値でなければなりません。',
    error_expected_jsboolean: 'Boolean値でなければなりません。',
    error_expected_jsnumber: 'Number値でなければなりません。',
    error_expected_jsobject: 'Object値でなければなりません。',
    error_expected_jsstring: 'String値でなければなりません。',
    error_expected_jsnumberorjsstring:
      'StringまたはNumber値でなければなりません。',
    error_expected_keypathnode: 'Node値でなければなりません。',
    error_expected_uuid: 'UUID値でなければなりません。',
    error_expected_validenumvalue: '有効な列挙値でなければなりません',
    error_expected_enumstring: 'String値でなければなりません。',
    error_path_empty: 'パスが空です。',
    error_path_missing: 'パスが見つかりません。',
    error_path_result: '指定されたパスに対して複数の結果があります。',
    http_bad_request: '不正なリクエストです。',
    http_unauthorized: '認証が必要です。',
    http_forbidden: 'アクセスが禁止されています。',
    http_not_found: 'パスが見つかりません。 path: [%s]',
    http_method_no_allowed: '指定されたメソッドは利用できません。',
    http_not_acceptable: 'Accept関連ヘッダに受理できない内容が含まれています。',
    http_request_timeout: 'リクエストが時間内に完了しませんでした。',
    http_conflict: 'リソースが矛盾しています。',
    http_gone: '指定されたリソースは消滅しました。',
    http_request_entity_too_large: 'リクエストボディが大きすぎます。',
    http_request_uri_too_long: 'リクエストされたURIが長すぎます。',
    http_unsupported_media_type:
      'サポートされないメディアタイプが指定されました。',
    http_too_many_request: 'リクエスト回数が多すぎます。',
    http_internal_server_error: 'サーバ側でエラーが発生しました。',
    http_service_unavailable: 'サーバが一時的に停止しています。',
    error_http_header_invalid_contenttype: 'ContentTypeが無効です。',
    error_http_header_required_apikey: 'APIキーヘッダーは必須です。',
    error_http_header_required_sessionkey: 'セッションキーヘッダーは必須です。',
    error_http_header_required_csrftoken: 'CSRFトークンヘッダーは必須です。',
    error_http_header_invalid_csrftoken: 'CSRFトークンヘッダーが無効です。',
    error_http_body_required_jsondata: 'データが空です。',
    error_invalid_userid:
      'ユーザIDが無効です。有効なユーザーIDを入力してください。',
    error_required_userid: 'ユーザIDは必須です。ユーザIDを入力してください。',
    error_invalid_loginid:
      'ログインIDが無効です。有効なログインIDを入力してください。',
    error_required_loginid:
      'ログインIDは必須です。ログインIDを入力してください。',
    error_invalid_logincd:
      'ログインコードが無効です。有効なログインコードを入力してください。',
    error_required_logincd:
      'ログインコードは必須です。ログインコードを入力してください',
    error_invalid_usercd:
      'ユーザコードが無効です。有効なユーザコードを入力してください。',
    error_required_usercd:
      'ユーザコードは必須です。ユーザコードを入力してください。',
    error_overlapping_usercd: 'ユーザコードが重複しています。',
    error_already_exists_usercd: 'ユーザコードはすでに存在しています。',
    error_invalid_usertx:
      'ユーザ名が無効です。有効なユーザ名を入力してください。',
    error_required_usertx: 'ユーザ名は必須です。ユーザ名を入力してください。',
    error_invalid_password:
      'パスワードが無効です。有効なパスワードを入力してください。',
    error_required_password:
      'パスワードは必須です。パスワードを入力してください',
    error_minlength_password: 'パスワードは %s 桁以上で指定してください。',
    error_toosimple_password: 'もっと複雑なパスワードを指定してください。',
    error_required_old_and_new_passwords:
      '変更前および変更後のパスワードを入力してください。',
    error_invalid_old_password: '旧パスワードが無効です。',
    error_invalid_loginid_password: 'ログインIDまたはパスワードが無効です。',
    error_saving_session: 'Error saving the session for the user.',
    error_invalid_language: '言語設定が無効です。',
    error_required_language: '言語設定は必須です。',
    error_invalid_roleid: '権限IDが無効です。',
    error_required_roleid: '権限IDは必須です。',
    error_invalid_companyid: '会社IDが無効です。',
    error_required_companyid: '会社IDは必須です。',
    error_invalid_companycd: '会社コードが無効です。',
    error_required_companycd: '会社コードは必須です。',
    error_invalid_companytx: '会社名は無効です。',
    error_required_companytx: '会社名は必須です。',
    error_invalid_apikey:
      'APIキーが無効です。有効なAPIキーを入力してください。',
    error_required_apikey: 'APIキーは必須です。APIキーを入力してください。',

    //これより追加
    error_invalid_authcd: 'AuthCd is invalid',
  },
  cn: {
    constraint_min: '最小值: %s',
    constraint_max: '最大值: %s',
    constraint_minLength: '最小长度: %s',
    constraint_maxLength: '最大长度: %s',
    constraint_email: '电子邮件',
    constraint_pattern: '必需状态: %s',
    format_date: '日期 ("%s")',
    format_numeric: '数学',
    format_real: '实数',
    format_uuid: 'UUID',
    formats_date: 'yyyy-MM-dd',
    error_invalid: '无效的值。请输入有效值。',
    error_invalid_java_util_Date:
      '无效日期。请输入有效日期。',
    error_invalid_date_format: '日期无效。请输入有效日期。',
    error_required: '这是必填项。',
    error_number: '只输入数字。',
    error_real: '只输入分数',
    error_real_precision: '只包含{１}位分数 %s 位以下的整数。',
    error_min: '必须 %s 以上。',
    error_min_strict: '必须 %s 更大。',
    error_max: '必须 %s 以下。',
    error_max_strict: '必须 %s 更小。',
    error_minLength: '必须 %s 位以上。',
    error_maxLength: '必须 %s 位以下',
    error_email: '请输入有效的电子邮箱地址。',
    error_pattern: '必须满足 %s 。',
    error_date: '请输入有效日期。',
    error_uuid: '请输入有效的UUID。',
    error_expected_date: '必须是Date。',
    error_expected_date_isoformat: '必须是ISO Date格式。',
    error_expected_time: '必须是Time值。',
    error_expected_jsarray: '必须是Array值。',
    error_expected_jsboolean: '必须是Boolean值。',
    error_expected_jsnumber: '必须是Number值。',
    error_expected_jsobject: '必须是Object值。',
    error_expected_jsstring: '必须是String值。',
    error_expected_jsnumberorjsstring:
      '必须是String或者是Number值',
    error_expected_keypathnode: '必须是Node值。',
    error_expected_uuid: '必须是UUID值。',
    error_expected_validenumvalue: '必须是有效的列挙值。',
    error_expected_enumstring: '必须是String值。',
    error_path_empty: '路径是空的。',
    error_path_missing: '未找到路径。',
    error_path_result: '此路径有多个结果。',
    http_bad_request: '请求不正确。',
    http_unauthorized: '需要认证。',
    http_forbidden: '禁止访问。',
    http_not_found: '找不到路径。 path: [%s]',
    http_method_no_allowed: '指定的方法不可用。',
    http_not_acceptable: 'Accept相关页眉中包含了无法受理的内容。',
    http_request_timeout: '请求没有在时间内完成。',
    http_conflict: '资源不一致。',
    http_gone: '资源已消失。',
    http_request_entity_too_large: '请求主体太大。',
    http_request_uri_too_long: '请求的URI太长。',
    http_unsupported_media_type:
      '设置了不支持的媒体类型。',
    http_too_many_request: '请求的次数太多。',
    http_internal_server_error: '服务器发生错误。',
    http_service_unavailable: '服务器已暂停。',
    error_http_header_invalid_contenttype: 'ContentType无效。',
    error_http_header_required_apikey: '必需有API密钥页眉。',
    error_http_header_required_sessionkey: '会话密钥页眉是必需的。',
    error_http_header_required_csrftoken: 'CSRF令牌页眉是必需的。',
    error_http_header_invalid_csrftoken: 'CSRF令牌页眉无效。',
    error_http_body_required_jsondata: '数据为空。',
    error_invalid_userid:
      '用户ID无效。请输入有效的用户ID。',
    error_required_userid: '用户ID是必需的。请输入用户ID。',
    error_invalid_loginid:
      '登录ID无效。请输入有效的登录ID。',
    error_required_loginid:
      '登录ID是必需的。请输入登录ID。',
    error_invalid_logincd:
      '登录号无效。请输入有效的号。',
    error_required_logincd:
      '登录号是必需的。请输入登录号',
    error_invalid_usercd:
      '用户号无效。请输入一个有效的用户号。',
    error_required_usercd:
      '必需使用用户号。请输入用户号。',
    error_overlapping_usercd: '用户号重复。',
    error_already_exists_usercd: '用户号已经存在。',
    error_invalid_usertx:
      '用户名无效。请输入有效的用户名。',
    error_required_usertx: '用户名是必需的。请输入用户名。',
    error_invalid_password:
      '密码无效。请输入有效密码。',
    error_required_password:
      '密码是必需的。请输入密码',
    error_minlength_password: '密码必须在 %s 位以上。',
    error_toosimple_password: '请设置更复杂的密码。',
    error_required_old_and_new_passwords:
      '请输入修改前和修改后的密码。',
    error_invalid_old_password: '旧密码无效。',
    error_invalid_loginid_password: '登录ID或密码无效。',
    error_saving_session: '为用户保存会话时出错。',
    error_invalid_language: '语言设置无效。',
    error_required_language: '语言设置是必需的。',
    error_invalid_roleid: '权限ID无效。',
    error_required_roleid: '权限ID是必需的。',
    error_invalid_companyid: '公司ID无效。',
    error_required_companyid: '公司ID是必需的。',
    error_invalid_companycd: '公司号码无效。',
    error_required_companycd: '公司号码是必需的。',
    error_invalid_companytx: '公司名称无效。',
    error_required_companytx: '公司名是必需的。',
    error_invalid_apikey:
      'API键无效。请输入有效的API键。',
    error_required_apikey: 'API键是必需的。请输入API键。',

    //これより追加
    error_invalid_authcd: 'AuthCd无效',
  },
  mn: {
    constraint_min: '最小値: %s',
    constraint_max: '最大値: %s',
    constraint_minLength: '最小の長さ: %s',
    constraint_maxLength: '最大の長さ: %s',
    constraint_email: '電子メール',
    constraint_pattern: '必須パターン: %s',
    format_date: '日付 ("%s")',
    format_numeric: '数字',
    format_real: '実数',
    format_uuid: 'UUID',
    formats_date: 'yyyy-MM-dd',
    error_invalid: '無効な値です。有効な値を入力してください。',
    error_invalid_java_util_Date:
      '無効な日付です。有効な日付を入力して下さい。',
    error_invalid_date_format: '日付が無効です。有効な日付を入力して下さい。',
    error_required: '必須項目です。',
    error_number: '数値のみです。',
    error_real: '小数値のみです。',
    error_real_precision: '{１} 桁の小数を含む %s 桁以下の実数値のみです。',
    error_min: '%s 以上でなければなりません。',
    error_min_strict: '%s より大きくなければなりません。',
    error_max: '%s 以下でなければなりません。',
    error_max_strict: '%s より小さくなければなりません。',
    error_minLength: '%s 桁以上でなければなりません。',
    error_maxLength: '%s 桁以下でなければなりません。',
    error_email: '有効な電子メールアドレスを入力してください。',
    error_pattern: '%s を満たす必要があります。',
    error_date: '有効な日付を入力してください。',
    error_uuid: '有効なUUIDを入力してください。',
    error_expected_date: 'Dateでなければなりません。',
    error_expected_date_isoformat: 'ISO Date形式でなければなりません。',
    error_expected_time: 'Time値でなければなりません。',
    error_expected_jsarray: 'Array値でなければなりません。',
    error_expected_jsboolean: 'Boolean値でなければなりません。',
    error_expected_jsnumber: 'Number値でなければなりません。',
    error_expected_jsobject: 'Object値でなければなりません。',
    error_expected_jsstring: 'String値でなければなりません。',
    error_expected_jsnumberorjsstring:
      'StringまたはNumber値でなければなりません。',
    error_expected_keypathnode: 'Node値でなければなりません。',
    error_expected_uuid: 'UUID値でなければなりません。',
    error_expected_validenumvalue: '有効な列挙値でなければなりません',
    error_expected_enumstring: 'String値でなければなりません。',
    error_path_empty: 'パスが空です。',
    error_path_missing: 'パスが見つかりません。',
    error_path_result: '指定されたパスに対して複数の結果があります。',
    http_bad_request: '不正なリクエストです。',
    http_unauthorized: '認証が必要です。',
    http_forbidden: 'アクセスが禁止されています。',
    http_not_found: 'パスが見つかりません。 path: [%s]',
    http_method_no_allowed: '指定されたメソッドは利用できません。',
    http_not_acceptable: 'Accept関連ヘッダに受理できない内容が含まれています。',
    http_request_timeout: 'リクエストが時間内に完了しませんでした。',
    http_conflict: 'リソースが矛盾しています。',
    http_gone: '指定されたリソースは消滅しました。',
    http_request_entity_too_large: 'リクエストボディが大きすぎます。',
    http_request_uri_too_long: 'リクエストされたURIが長すぎます。',
    http_unsupported_media_type:
      'サポートされないメディアタイプが指定されました。',
    http_too_many_request: 'リクエスト回数が多すぎます。',
    http_internal_server_error: 'サーバ側でエラーが発生しました。',
    http_service_unavailable: 'サーバが一時的に停止しています。',
    error_http_header_invalid_contenttype: 'ContentTypeが無効です。',
    error_http_header_required_apikey: 'APIキーヘッダーは必須です。',
    error_http_header_required_sessionkey: 'セッションキーヘッダーは必須です。',
    error_http_header_required_csrftoken: 'CSRFトークンヘッダーは必須です。',
    error_http_header_invalid_csrftoken: 'CSRFトークンヘッダーが無効です。',
    error_http_body_required_jsondata: 'データが空です。',
    error_invalid_userid:
      'ユーザIDが無効です。有効なユーザーIDを入力してください。',
    error_required_userid: 'ユーザIDは必須です。ユーザIDを入力してください。',
    error_invalid_loginid:
      'ログインIDが無効です。有効なログインIDを入力してください。',
    error_required_loginid:
      'ログインIDは必須です。ログインIDを入力してください。',
    error_invalid_logincd:
      'ログインコードが無効です。有効なログインコードを入力してください。',
    error_required_logincd:
      'ログインコードは必須です。ログインコードを入力してください',
    error_invalid_usercd:
      'ユーザコードが無効です。有効なユーザコードを入力してください。',
    error_required_usercd:
      'ユーザコードは必須です。ユーザコードを入力してください。',
    error_overlapping_usercd: 'ユーザコードが重複しています。',
    error_already_exists_usercd: 'ユーザコードはすでに存在しています。',
    error_invalid_usertx:
      'ユーザ名が無効です。有効なユーザ名を入力してください。',
    error_required_usertx: 'ユーザ名は必須です。ユーザ名を入力してください。',
    error_invalid_password:
      'パスワードが無効です。有効なパスワードを入力してください。',
    error_required_password:
      'パスワードは必須です。パスワードを入力してください',
    error_minlength_password: 'パスワードは %s 桁以上で指定してください。',
    error_toosimple_password: 'もっと複雑なパスワードを指定してください。',
    error_required_old_and_new_passwords:
      '変更前および変更後のパスワードを入力してください。',
    error_invalid_old_password: '旧パスワードが無効です。',
    error_invalid_loginid_password: 'ID ᠪᠤᠶᠤ ᠨᠢᠭᠤᠴᠨ ᠨᠤᠮᠧᠷ ᠴᠢᠨᠢ ᠪᠤᠷᠤᠭᠤ ᠲᠠᠢ᠃',
    error_saving_session: 'Error saving the session for the user.',
    error_invalid_language: '言語設定が無効です。',
    error_required_language: '言語設定は必須です。',
    error_invalid_roleid: '権限IDが無効です。',
    error_required_roleid: '権限IDは必須です。',
    error_invalid_companyid: '会社IDが無効です。',
    error_required_companyid: '会社IDは必須です。',
    error_invalid_companycd: '会社コードが無効です。',
    error_required_companycd: '会社コードは必須です。',
    error_invalid_companytx: '会社名は無効です。',
    error_required_companytx: '会社名は必須です。',
    error_invalid_apikey:
      'APIキーが無効です。有効なAPIキーを入力してください。',
    error_required_apikey: 'APIキーは必須です。APIキーを入力してください。',

    //これより追加
    error_invalid_authcd: 'AuthCd is invalid',
  },
}

export { Messages };
