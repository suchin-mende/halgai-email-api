-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	ユーザー更新																	*/
/************************************************************************************/

/*
*/

DROP PROCEDURE IF EXISTS USER_Upd;
DELIMITER //
CREATE PROCEDURE USER_Upd(
	IN	iUSER_ID					BIGINT		,
	IN	iSERVICE_ID					BIGINT		,
	IN	iUSER_TX					VARCHAR(200),
	IN	iLANG_TX					VARCHAR(20)	,
	IN	iPASSWORD_TX 				VARCHAR(200),
	IN	iMAIL						VARCHAR(30)	,
	IN	iLOCK_FL					TINYINT		,
	IN	iRESET_FL 					TINYINT		,
	IN  iCOUNTRY_CD					BIGINT		,
	IN  iTEL						VARCHAR(20)	,
	IN	iMY_NO		 				VARCHAR(200),
	IN	iSEX 						TINYINT		,
	IN  iWECHAT_CD					VARCHAR(20)	,
	IN	iUPDPROGRAM_CD				VARCHAR(100)
)
BEGIN
	-- 変数宣言エリア
	DECLARE procName VARCHAR(100) DEFAULT 'USER_Upd';
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

	UPDATE
		M_USER
	SET
		USER_TX                 = iUSER_TX			,
		LANG_TX                 = iLANG_TX	        ,
		PASSWORD_TX             = iPASSWORD_TX      ,
		MAIL           		  	= iMAIL  		    ,
		LOCK_FL					= IFNULL(iLOCK_FL, 0),
		RESET_FL                = IFNULL(iRESET_FL, 0),
		COUNTRY_CD 				= iCOUNTRY_CD		,
		TEL 					= iTEL				,
		MY_NO 					= iMY_NO			,
		SEX 					= iSEX 				,
		WECHAT_CD 				= iWECHAT_CD		,
		--
		UPD_DT					= NOW()				,
		UPDPROGRAM_CD			= iUPDPROGRAM_CD	,
		UPDCOUNTER_NR			= UPDCOUNTER_NR + 1
	WHERE
		USER_ID					= iUSER_ID;
	SELECT ROW_COUNT() INTO rowCountNr;
	IF rowCountNr <> 1 THEN
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	UPDATE
		USER_SERVICE
	SET
		-- TODO 項目を追加する

		--
		UPD_DT					= NOW()				,
		UPDPROGRAM_CD			= iUPDPROGRAM_CD	,
		UPDCOUNTER_NR			= UPDCOUNTER_NR + 1
	WHERE
		USER_ID = iUSER_ID AND
		SERVICE_ID = iSERVICE_ID;
	SELECT ROW_COUNT() INTO rowCountNr;
	IF rowCountNr <> 1 THEN
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	CALL PS_LOG_DEBUG(procName, 'Info', 'End', 0, iSERVICE_ID, 0);
END;
//
DELIMITER ;
