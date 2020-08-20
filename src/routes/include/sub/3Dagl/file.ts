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
import * as fs from 'fs';
import { FileUtils } from '../../../../utils/fileUtils';
import * as path from 'path';

const auth = new AuthenticationMiddleware();
const passport = require('passport');
const images = require('images');
/**
 * / route
 *
 * @class Project
 */
export class File extends BaseRoute {
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
    router.get('/:lan/v1/:id/archive/files', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      let query;
      if (Object.keys(req.query).length > 0) {
        query = req.query;
      }
      if (query === undefined) {
        query = {};
      }

      if (query.projectId == null || query.blockId == null || 
          query.archiveId == null) 
        return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });

      try {
        Utils.args2SqlLimit(query);

        const db = await Db3.getSubdb(req.session.db);
        const count = await Db3.file.selectCount(db, query);
        let result = {};
        if (count > 0)
          result['files'] = await Db3.file.select(db, query);

        Utils.pagerNext(req, query, count, result['files'], result);
        res.json(result);
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 上传文件
    router.post('/:lan/v1/:id/file/upload', auth.auth, async (req: any, res: Response, next: NextFunction) => {

      let params = req.body;
      if (req.files === undefined || req.files.file === undefined || Utils.isEmpty(params.projectId) 
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.archiveId)) {
        return res.status(500).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      const file = req.files.file;

      // 文件格式错误
      if (Settings.uploadSetting.allowMimeTypes.indexOf(file.mimetype) == -1)
        return res.status(500).send({ errors: [{ message: 'Bad File Format', code: ErrorUtils.getDefaultErrorCode() }] });

      // 存储文件
      let ret = null;
      if (FileUtils.isImage(file.mimetype))
        ret = FileUtils.storeImageUpload(Settings.uploadSetting.path, file);
      
      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;
      
      // 写入数据库

      return res.json({message: 'OK'});
    });


  }

}
