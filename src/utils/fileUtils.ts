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

  /**
   * 存储上传的图像
   * @param path 存储路径
   * @param uploadFile 上传的文件
   * @returns {
   *            path: '路径',
   *            fileTx: '文件名名称.jpg',
   *            thumbTx: '文件名名称.jpg_xxx'
   *          }
   */
  static storeImageUpload(storePath, fileUpload) {
    
    let hashPath = `/${fileUpload.md5.substring(0, 2)}/${fileUpload.md5.substring(2, 4)}`;
    let filePath = `${storePath}${hashPath}`;
    let fileName = `${fileUpload.md5}${Utils.getRandom(1000, 9999)}`;
    let fileExt = path.extname(fileUpload.name);

    if (!fs.existsSync(filePath))
      fs.mkdirSync(filePath, {recursive: true});

    let fullPath = `${filePath}/${fileName}${fileExt}`;
    let thumbName = `${fileName}${fileExt}_${Settings.uploadSetting.image.thumbWidth}${fileExt}`;
    let thumbPath = `${filePath}/${thumbName}`;

    if (fs.existsSync(fullPath))
      return `${hashPath}/${fileName}${fileExt}`;

    FileUtils.zoomImage(
      fileUpload.data, 
      fullPath, 
      Settings.uploadSetting.image.maxWidth, 
      Settings.uploadSetting.image.maxHeight, 
      Settings.uploadSetting.image.quality
    );

    FileUtils.zoomImage(
      fileUpload.data, 
      thumbPath, 
      Settings.uploadSetting.image.thumbWidth, 
      null,
      Settings.uploadSetting.image.quality
    );

    return {
      path: hashPath,
      fileTx: `${fileName}${fileExt}`,
      thumbTx: thumbName
    };
  }

  /**
   * 存储文件
   * @param storePath 
   * @param fileUpload 
   */
  static storeFile(storePath, fileUpload) {

  }
}
