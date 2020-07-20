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
	IN	iVIP_PLAN_CD 				TINYINT		,
	IN	iUPDPROGRAM_CD				VARCHAR(100)
)
BEGIN
	-- 変数宣言エリア
	DECLARE procName VARCHAR(100) DEFAULT 'USER_Ins';
	DECLARE notFoundFl INT DEFAULT 0;
	DECLARE rowCountNr INT;

	DECLARE vUSER_ID   BIGINT;
	DECLARE vVIP_FL    BIGINT;
	DECLARE vVIP_FROM_DT  DATE;
	DECLARE vVIP_TO_DT    DATE;

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

	START TRANSACTION;

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
		SELECT 0 INTO vVIP_FL;
		IF iVIP_PLAN_CD > 0 THEN
			SELECT 1 INTO vVIP_FL;
			SELECT CURDATE() INTO vVIP_FROM_DT;
			IF  iVIP_PLAN_CD = 1 THEN
				SELECT DATE_ADD(CURDATE(), INTERVAL 1 MONTH) 
				INTO vVIP_TO_DT;
			END IF;
			IF iVIP_PLAN_CD = 2 THEN
				SELECT DATE_ADD(CURDATE(), INTERVAL 6 MONTH) 
				INTO vVIP_TO_DT;
			END IF;
			IF iVIP_PLAN_CD = 3 THEN
				SELECT DATE_ADD(CURDATE(), INTERVAL 12 MONTH) 
				INTO vVIP_TO_DT;
			END IF;
		END IF;

		INSERT INTO USER_SERVICE
		(
			USER_ID,
			SERVICE_ID,
			VIP_FL,
			VIP_PLAN_CD,
			VIP_FROM_DT,
			VIP_TO_DT
		)
		VALUES
		(
			vUSER_ID,
			iSERVICE_ID,
			vVIP_FL,
			iVIP_PLAN_CD,
			vVIP_FROM_DT,
			vVIP_TO_DT
		);

		SELECT ROW_COUNT() INTO rowCountNr;
		IF rowCountNr <> 1 THEN
			CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
		END IF;

	ELSE
		CALL PS_ERROR_RAISE(5000, iLANG_TX, '5002');
	END IF;

	COMMIT;

	CALL PS_LOG_DEBUG(procName, 'Info', 'End', 0, iSERVICE_ID, 0);
END;
//
DELIMITER ;
