-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	一時認証コード削除																	*/
/************************************************************************************/

/*
*/

DROP PROCEDURE IF EXISTS TMP_AUTH_Del;
DELIMITER //
CREATE PROCEDURE TMP_AUTH_Del(
	IN	iUSER_CD					VARCHAR(30)	,
	IN	iSERVICE_ID					BIGINT		,
	IN	iLANG_TX					VARCHAR(20)	,
	IN	iTEL_TX						BIGINT		,
	IN	iAUTH_CD					VARCHAR(100)
)
BEGIN
	-- 変数宣言エリア
	DECLARE procName VARCHAR(100) DEFAULT 'TMP_AUTH_Del';
	DECLARE notFoundFl INT DEFAULT 0;
	DECLARE rowCountNr INT;

	-- 終了ハンドラ宣言エリア
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
			@errno = MYSQL_ERRNO,
			@type = RETURNED_SQLSTATE,
			@msg = MESSAGE_TEXT;

		-- 例外時ロールバック
		SELECT 'ROLLBACK';
		ROLLBACK;

		CALL PS_LOG_ERROR(procName, @type, @errno, @msg, 0, iSERVICE_ID, 0);
		COMMIT;

		-- 例外を上位に返す
		RESIGNAL;
	END;

	CALL PS_LOG_DEBUG(procName, 'Info', 'Start', 0, iSERVICE_ID, 0);

	-- 削除（必ず1件）
	DELETE
	FROM
		TMP_AUTH
	WHERE
		USER_CD	= iUSER_CD AND
		TEL		= iTEL_TX AND
		AUTH_CD = iAUTH_CD;
	SELECT ROW_COUNT() INTO rowCountNr;
	IF rowCountNr <> 1 THEN
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	CALL PS_LOG_DEBUG(procName, 'Info', 'End', 0, iSERVICE_ID, 0);
END;
//
DELIMITER ;
