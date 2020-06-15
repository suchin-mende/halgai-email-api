-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	実行時エラー																	*/
/************************************************************************************/

DROP PROCEDURE IF EXISTS PS_ERROR_RAISE;
DELIMITER //
CREATE PROCEDURE PS_ERROR_RAISE
(
	iErrNO 		SMALLINT UNSIGNED,
	iLang		VARCHAR(128),
	iMsgCd	 	VARCHAR(128)
)
BEGIN
	DECLARE vMESSAGE VARCHAR(100);
	-- メッセージ取得
	SELECT
		MESSAGE
	INTO
		vMESSAGE
	FROM
		MESSAGE_ALL
	WHERE
		MESSAGE_CD		= iMsgCd AND
		LANG 			= iLang;

	SIGNAL SQLSTATE
		'ERR0R'
	SET
		MYSQL_ERRNO		= iErrNO		,
		MESSAGE_TEXT	= vMESSAGE;
END;
//
DELIMITER ;
