/**
 * @fileoverview Utils class.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { Utils } from './utils';
import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '../config/settings';
const images = require('images');

export class FileUtils {
  constructor() { }

  /**
   * 依据MimeType类型判断是否图片类型
   * @param mimeType 
   */
  static isImage(mimeType) {
    return mimeType === 'image/png' || mimeType === 'image/jpeg' || mimeType === 'image/jpg';
  }

  /**
   * 缩放图像
   * @param imageBuffer 图像data
   * @param destPath    存储路径
   * @param maxWidth    最大宽度（可选）
   * @param maxHeight   最大高度（可选）
   * @param quality     图像质量（可选）
   */
  static zoomImage(imageBuffer, destPath, maxWidth, maxHeight, quality) {
    let img = images(imageBuffer);
    let width = img.width();
    let height = img.height();

    let rWidth = width;
    let rHeight = height;

    if (maxWidth != null && width > maxWidth) {
      rWidth = maxWidth;
      rHeight = maxWidth * height / width;
    }
    else if (maxHeight != null && height > maxHeight) {
      rWidth = maxHeight * width / height;
      rHeight = maxHeight;
    }

    img.size(rWidth, rHeight)
      .save(destPath, {
        quality: quality == null ? 100 : quality
      });
  }

  private static imageUpload(destPath, fileUpload) {
    let thumbPath = `${destPath}_${Settings.uploadSetting.image.thumbWidth}${path.extname(fileUpload.name)}`;
/*    
#    FileUtils.zoomImage(
#      fileUpload.data, 
#      destPath, 
#      Settings.uploadSetting.image.maxWidth, 
#      Settings.uploadSetting.image.maxHeight, 
#      Settings.uploadSetting.image.quality
#    );
*/
    var ws = fs.createWriteStream(destPath);
    ws.write(fileUpload.data);
    ws.end();

    FileUtils.zoomImage(
      fileUpload.data, 
      thumbPath, 
      Settings.uploadSetting.image.thumbWidth, 
      null,
      Settings.uploadSetting.image.quality
    );

    return {
      fileTx: destPath.substring(destPath.lastIndexOf('/') + 1),
      thumbTx: thumbPath.substring(thumbPath.lastIndexOf('/') + 1)
    };
  }

  private static docUpload(destPath, fileUpload) {
    var ws = fs.createWriteStream(destPath);
    ws.write(fileUpload.data);
    ws.end();
    return {
      fileTx: destPath.substring(destPath.lastIndexOf('/') + 1)
    }
  }

  /**
   * 存储上传的文件
   * @param storePath 存储路径
   * @param fileUpload 上传的文件
   * @returns {
    *            path: '路径',
    *            fileTx: '文件名名称.ext',
    *            thumbTx: '文件名名称.ext_xxx' (仅上传图像时返回)
    *          }
    */
  static fileUpload(storePath, fileUpload) {
    let hashPath = `/${FileUtils.isImage(fileUpload.mimetype) ? Settings.uploadSetting.folderImage : Settings.uploadSetting.folderDoc }/${fileUpload.md5.substring(0, 2)}/${fileUpload.md5.substring(2, 4)}`;
    let filePath = `${storePath}${hashPath}`;
    let fileName = `${fileUpload.md5}${Utils.getRandom(10000, 99999)}`;
    let fileExt = path.extname(fileUpload.name);

    if (!fs.existsSync(filePath))
      fs.mkdirSync(filePath, {recursive: true});

    let destPath = `${filePath}/${fileName}${fileExt}`;

    let ret = null;
    if (FileUtils.isImage(fileUpload.mimetype))
      ret = FileUtils.imageUpload(destPath, fileUpload);
    else
      ret = FileUtils.docUpload(destPath, fileUpload);

    ret.path = hashPath;
    return ret;
  }

  static fileUploadSp(storePath, fileUpload, callback) {
    if (!FileUtils.isImage(fileUpload.mimetype)) {
      return FileUtils.fileUpload(storePath, fileUpload);
    }
    
    const mimeType = Settings.uploadSetting.getMimeType(fileUpload.mimetype);
    const tmpPath = Settings.uploadSetting.path + '/' + fileUpload.md5 + Utils.getRandom(10000, 99999) + '.' + mimeType[fileUpload.mimetype][0];
    
    fileUpload.mv(tmpPath, ()=> {
      var fd = fs.openSync(tmpPath, 'r+');
      var buffer = fs.readFileSync(fd);
      fs.closeSync(fd);
      
      const rebuildParam = {};
      for (let p in fileUpload)
        rebuildParam[p] = fileUpload[p]
      rebuildParam['name'] = tmpPath;
      rebuildParam['data'] = buffer;
      
      const ret = FileUtils.fileUpload(storePath, rebuildParam)
      fs.unlinkSync(tmpPath);
      if (callback)
        callback(ret);
    })
  }
}
