/**
 * @fileoverview DB Model for m_user.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { TableUtils } from '../tableUtils';
import * as Promise from 'bluebird';

export class MUserProfile {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }
  
  // 个人设置 - 邮箱用户
  mailUserProfile (serviceId: number, userId: string) {
    return new Promise((resolve, reject) => {
      this.db.driver.execQuery(mailUserProfile, [serviceId, userId], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(TableUtils.toCamelCase(data[0]))
        }
      })
    });
  }

}

let mailUserProfile = `
SELECT 
  MU.STAR_NR,
  MU.W_OPEN_ID,
  US.VIP_FL,
  US.VIP_FROM_DT,
  US.VIP_TO_DT,
    (
      SELECT SUM(PL.POINT)
      FROM
        USER_POINT_LOG PL
      INNER JOIN M_POINT_TYPE PT
        ON PL.POINT_TYPE_ID = PT.POINT_TYPE_ID
      WHERE
        PL.USER_ID = MU.USER_ID
        AND PL.SERVICE_ID = MU.SERVICE_ID
    ) AS userPoint
  FROM
    M_USER MU
  LEFT JOIN USER_SERVICE US
      ON MU.USER_ID = US.USER_ID
      AND MU.SERVICE_ID = US.SERVICE_ID
  WHERE
    MU.SERVICE_ID = ?
    AND MU.USER_ID = ?
`;
