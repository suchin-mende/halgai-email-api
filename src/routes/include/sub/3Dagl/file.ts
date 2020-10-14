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

      // if (query.projectId == null || query.blockId == null || 
      //     query.archiveId == null) 
      //   return res.status(400).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });

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

    // 上传文件 PC
    router.post('/:lan/v1/:id/archive/file/upload', auth.auth, async (req: any, res: Response, next: NextFunction) => {

      let params = req.body;
      if (req.files === null || req.files === undefined || req.files.file === null || Utils.isEmpty(params.projectId) 
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.archiveId)) {
        return res.status(500).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
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
      
      // 写入数据库
      try {
        const db = await Db3.getSubdb(req.session.db);
        await Db3.file.insert(db, params);
        return res.json({ message: 'OK'});
      } catch (err) {
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });

    // 上传文件 SP
    router.post('/:lan/v1/:id/archive/images/upload', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const imgs = req.files == null || req.files.images == null ? null :
        req.files.images instanceof Array ? req.files.images : [req.files.images]
      
      let params = req.body;
      if (imgs == null || Utils.isEmpty(params.projectId) 
          || Utils.isEmpty(params.blockId) 
          || Utils.isEmpty(params.archiveId)) {
        return res.status(500).send({ errors: [{ message: '', code: ErrorUtils.getDefaultErrorCode() }] });
      }

      // 检测文件格式
      imgs.forEach((file) =>{
        if (Settings.uploadSetting.getMimeType(file.mimetype) == null)
          return res.status(500).send({ errors: [{ message: 'Bad File Format', code: ErrorUtils.getDefaultErrorCode() }] });
      });

      params.userId = req.session.user.userId;
      params.userTx = req.session.user.userTx;

      const db = await Db3.getSubdb(req.session.db);
      for (let i = 0; i < imgs.length; i++) {


        
        FileUtils.fileUploadSp(Settings.uploadSetting.path, imgs[i], (ret) => {
          console.log(ret)

          var dbParams = {};
          for (let p in params) 
            dbParams[p] = params[p];

          for (let p in ret) 
            dbParams[p] = ret[p];
        
          // 写入数据库
          try {
            Db3.file.insert(db, dbParams);
          } catch (err) {
            return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
          }

        });
      }
      return res.json({ message: 'OK'});
    });

    router.delete('/:lan/v1/:id/file/:fid', auth.auth, async (req: any, res: Response, next: NextFunction) => {
      const query = {
        fileId: req.params.fid
      };
      try {
        const db = await Db3.getSubdb(req.session.db);
        const dbFile = await Db3.file.selectFileById(db, query);

        if (dbFile != null) {
          await Db3.file.delete(db, query);
          FileUtils.deleteFile(Settings.uploadSetting.path + dbFile['filePass'], 
            dbFile['fileTx']);
        }
        return res.json({ message: 'OK' });
      } catch (err) {
        console.log(err)
        return res.status(400).send({ errors: [{ message: err.sqlMessage, code: ErrorUtils.getDefaultErrorCode() }] });
      }
    });
  }

}
