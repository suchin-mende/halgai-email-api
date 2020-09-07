/**
 * @fileoverview Owner route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../../../route';
import { ErrorUtils } from '../../../../utils/errorUtils';
import { AuthenticationMiddleware } from '../../../../authenticate/authenticationMiddleware';
import { Db3 } from '../../../../db/db';
import { Utils } from '../../../../utils/utils';
import { Settings } from '../../../../config/settings';
import { FileUtils } from '../../../../utils/fileUtils';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
/**
 * / route
 *
 * @class Template
 */
export class Template extends BaseRoute {
  /**
   * Constructor
   *
   * @class Project
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the routes.
   *
   * @class Project
   * @method create
   * @static
   */
  public static create(router: Router) {

    // 检索模版
    router.get('/:lan/v1/:id/template', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }

      try {
        Utils.args2SqlLimit(query);

        const db = await Db3.getSubdb(req.session.db);
        const count = await Db3.template.selectCount(db, query);
        let result = {};
        if (count > 0) {
          const tmpRet = await Db3.template.select(db, query);
          const templates = [];
          tmpRet.forEach(v => {
            templates.push({
              templateId: v.templateId,
              templateCd: v.templateCd,
              templateTx: v.templateTx,
              addDt: v.addDt,
              adduserId: v.adduserId,
              adduserTx: v.adduserTx,
              blockId: v.blockId,
              filePath: v.filePath,
              fileTx: v.fileTx
            })
          });
          result['templates'] = templates;
        }

        Utils.pagerNext(req, query, count, result['templates'], result);
        res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 新增模版
    router.post('/:lan/v1/:id/template', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      console.log(req.files)
      let params = req.body;
      if (req.files === null || req.files === undefined || req.files.file === null
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.templateCd) 
          || Utils.isEmpty(params.templateTx)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      const file = req.files.file;
      // 文件格式错误
      if (Settings.uploadSetting.getMimeType(file.mimetype) == null)
        return res.status(500).send({ errors: [{ message: 'Bad File Format', code: ErrorUtils.getDefaultErrorCode() }] });

      // 存储文件
      let ret = FileUtils.fileUpload(Settings.uploadSetting.path, file);
      for (let p in ret) 
        params[p] = ret[p];

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        const ret = await Db3.template.insert(db, params);
        if (ret['affectedRows'] > 0) {
          params['templateId'] = ret['insertId'];
          await Db3.file.insert(db, params);
        }
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 更新模版
    router.put('/:lan/v1/:id/template/:templateId', auth.auth, async (req: any, res: Response, next: NextFunction) => {

      let params = req.body;
      if (Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.templateCd) 
          || Utils.isEmpty(params.templateTx)
          || Utils.isEmpty(req.params.templateId)) {
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      let isFileUpload = req.files !== null && req.files !== undefined && req.files.file !== null;
      if (isFileUpload && 
        Settings.uploadSetting.getMimeType(req.files.file.mimetype) == null) {
          return res.status(500).send({ errors: [{ message: 'Bad File Format', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      params.templateId = req.params.templateId;
      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      try {
        const db = await Db3.getSubdb(req.session.db);
        const ret = await Db3.template.update(db, params);
        if (ret['affectedRows'] > 0 && isFileUpload) {
          Db3.file.logicaDeleteWithTemplate(db, params);

          const file = req.files.file;
          let ret = FileUtils.fileUpload(Settings.uploadSetting.path, file);
          for (let p in ret)
            params[p] = ret[p];
          await Db3.file.insert(db, params);
        }
        return res.json({ message: 'OK'});
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
