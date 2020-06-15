-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	Regist User																	*/
/************************************************************************************/

/*
*/

DROP PROCEDURE IF EXISTS USER_Ins;
DELIMITER //
CREATE PROCEDURE USER_Ins(
	IN	iUSER_CD					VARCHAR(30)	,
	IN	iCOMPANY_ID 				BIGINT		,
	IN	iSERVICE_ID					BIGINT		,
	IN	iUSER_TX					VARCHAR(200),
	IN	iLANG_TX					VARCHAR(20)	,
	IN	iPASSWORD_TX 				VARCHAR(200),
	IN	iTEL_TX						BIGINT		,
	IN	iLOCK_FL					TINYINT		,
	IN	iRESET_FL 					TINYINT		,
	IN	iUPDPROGRAM_CD				VARCHAR(100)
)
BEGIN
	-- 変数宣言エリア
	DECLARE procName VARCHAR(100) DEFAULT 'USER_Ins';
	DECLARE notFoundFl INT DEFAULT 0;
	DECLARE rowCountNr INT;

	DECLARE vUSER_ID   BIGINT;

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

	-- 重複チェック
	SELECT
		USER_ID
	INTO
		vUSER_ID
	FROM
		M_USER
	WHERE
		USER_CD		= iUSER_CD;
	IF vUSER_ID IS NOT NULL THEN
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5001');
	END IF;

	INSERT INTO M_USER
	(
		USER_CD		,
		SERVICE_ID 	,
		USER_TX		,
		LANG_TX		,
		PASSWORD_TX ,
		TEL			,
		LOCK_FL		,
		RESET_FL
	)
	VALUES
	(
		iUSER_CD	,
		iSERVICE_ID ,
		iUSER_TX	,
		iLANG_TX	,
		iPASSWORD_TX,
		iTEL_TX		,
		IFNULL(iLOCK_FL, 0),
		IFNULL(iRESET_FL, 0)
	);
	SELECT ROW_COUNT() INTO rowCountNr;
	IF rowCountNr <> 1 THEN
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	SELECT
		USER_ID
	INTO
		vUSER_ID
	FROM
		M_USER
	WHERE
		USER_CD		= iUSER_CD;
	IF vUSER_ID IS NOT NULL THEN

		INSERT INTO USER_SERVICE
		(
			USER_ID,
			SERVICE_ID
		)
		VALUES
		(
			vUSER_ID,
			iSERVICE_ID
		);
		SELECT ROW_COUNT() INTO rowCountNr;
		IF rowCountNr <> 1 THEN
			CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
		END IF;

	ELSE
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	CALL PS_LOG_DEBUG(procName, 'Info', 'End', 0, iSERVICE_ID, 0);
END;
//
DELIMITER ;
