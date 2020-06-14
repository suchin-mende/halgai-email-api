/**
 * @fileoverview DB handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { MainDb } from './maindb/maindb';
import { Subdb1 } from './subdb/familySubdb';
import { Subdb2 } from './subdb/mailSubdb';

export class Db extends Subdb1 {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}

export class Db2 extends Subdb2 {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}
