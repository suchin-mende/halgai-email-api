/**
 * @fileoverview Index route handler.
 * @author Suchin Mende <suqin81@gmail.com>
 * @version - 0.0.1
 */

import { Settings } from '../config/settings';
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';

// Load the routes.
import { Authentication } from './include/authentication';
import { User } from './include/user';
//Malajahui-api
import { Owner } from './include/sub/1Family/owner';
import { FamilyUsers } from './include/sub/1Family/familyUsers';
import { FamilyBasics } from './include/sub/1Family/familyBasics';
import { FamilyAquacul } from './include/sub/1Family/familyAquacul';
import { FamilyGrass } from './include/sub/1Family/familyGrass';
import { FamilyIncome } from './include/sub/1Family/familyIncome';
import { FamilyInsurance } from './include/sub/1Family/familyInsurance';
import { FamilyLive } from './include/sub/1Family/familyLive';
import { FamilyLoan } from './include/sub/1Family/familyLoan';
import { FamilyOther } from './include/sub/1Family/familyOther';
import { FamilyProject } from './include/sub/1Family/familyProject';
import { FamilyShed } from './include/sub/1Family/familyShed';
import { FamilySpending } from './include/sub/1Family/familySpending';
import { FamilyUnesco } from './include/sub/1Family/familyUnesco';
//DAGL-api
import { Project } from './include/sub/3Dagl/project';
import { Block } from './include/sub/3Dagl/block';
import { Archive } from './include/sub/3Dagl/archive';
import { File } from './include/sub/3Dagl/file';
import { Template } from './include/sub/3Dagl/template';
import { News } from './include/sub/3Dagl/news';

import { Db, Db1, Db2, Db3 } from '../db/db';

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {

    // Add home page route
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });

    // Add the logical warehouse route
    router.get('/v1/:id/service', (req: Request, res: Response, next: NextFunction) => {
      Db.mainDb.models.mService.select()
        .then(data => {
          return res.json({ service: data });
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });

    // Add the roles route
    router.get('/v1/:id/roles', (req: Request, res: Response, next: NextFunction) => {
      Db.mainDb.models.mRole.select()
        .then(data => {
          return res.json({ roles: data });
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });

    // Create the routes
    Authentication.create(router);
    Owner.create(router);
    User.create(router);
    // Malajahui-api
    FamilyUsers.create(router);
    FamilyBasics.create(router);
    FamilyAquacul.create(router);
    FamilyGrass.create(router);
    FamilyIncome.create(router);
    FamilyInsurance.create(router);
    FamilyLive.create(router);
    FamilyLoan.create(router);
    FamilyOther.create(router);
    FamilyProject.create(router);
    FamilyShed.create(router);
    FamilySpending.create(router);
    FamilyUnesco.create(router);
    // DAGL
    Project.create(router);
    Block.create(router);
    Archive.create(router);
    File.create(router);
    Template.create(router);
    News.create(router);
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    // set custom title
    this.title = 'API SERVER TEST 画面';

    // render template
    this.render(req, res, 'index');
  }
}
