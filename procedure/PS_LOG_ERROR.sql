-- Copyright (C) Halgai Corporation 2020 All rights reserved
/************************************************************************************/
/*	エラーログ																		*/
/************************************************************************************/

DROP PROCEDURE IF EXISTS PS_LOG_ERROR;
DELIMITER //
CREATE PROCEDURE PS_LOG_ERROR
(
	IN	methodTX	VARCHAR(100)		,
	IN	typeTX		VARCHAR(20)			,
	IN	errNO		SMALLINT UNSIGNED	,
	IN	msgTX		VARCHAR(1000)		,
	IN	trnID		BIGINT				,
	IN  serviceId 	BIGINT				,
	IN	userID		BIGINT				
)
BEGIN

	INSERT INTO LOG_ERROR
	(
		CONN_NO		,
		SCHEMA_TX	,
		METHOD_TX	,
		TYPE_TX		,
		ERR_NO		,
		MSG_TX		,
		TRN_ID		,
		SERVICE_ID	,
		USER_ID		
	)
	VALUES
	(
		CONNECTION_ID()	,
		DATABASE()		,
		methodTX		,
		typeTX			,
		errNO			,
		msgTX			,
		trnID			,
		serviceId		,
		userID			
	);

END;
//
DELIMITER ;
