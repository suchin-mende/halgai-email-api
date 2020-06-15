-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	ユーザー削除																	*/
/************************************************************************************/

/*
*/

DROP PROCEDURE IF EXISTS USER_Del;
DELIMITER //
CREATE PROCEDURE USER_Del(
	IN	iUSER_ID					BIGINT,
	IN	iLANG_TX					VARCHAR(20)
)
BEGIN
	-- 変数宣言エリア
	DECLARE procName VARCHAR(100) DEFAULT 'USER_Del';
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

		CALL PS_LOG_ERROR(procName, @type, @errno, @msg, 0, 0, 0);
		COMMIT;

		-- 例外を上位に返す
		RESIGNAL;
	END;

	CALL PS_LOG_DEBUG(procName, 'Info', 'Start', 0, 0, 0);

	-- 削除（必ず1件）
	DELETE
	FROM
		M_USER
	WHERE
		USER_ID	   = iUSER_ID;
	SELECT ROW_COUNT() INTO rowCountNr;
	IF rowCountNr <> 1 THEN
		CALL PS_ERROR_RAISE(5000, iLANG, '5002');
	END IF;

	CALL PS_LOG_DEBUG(procName, 'Info', 'End', 0, 0, 0);
END;
//
DELIMITER ;
