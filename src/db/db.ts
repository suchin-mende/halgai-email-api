/**
 * @fileoverview DB handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { MainDb } from './maindb/maindb';
import { Subdb } from './subdb/familySubdb';

export class Db extends Subdb {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}

export class Db2 extends Subdb {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}
