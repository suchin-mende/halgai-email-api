/**
 * @fileoverview DB handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { MainDb } from './maindb/maindb';
import { Subdb1 } from './subdb/familySubdb';
import { Subdb2 } from './subdb/mailSubdb';
import { Subdb3 } from './subdb/daglSubdb';

export class Db extends MainDb {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}

export class Db1 extends Subdb1 {
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

export class Db3 extends Subdb3 {
  public static mainDb = new MainDb();

  constructor() {
    super();
  }
}
