import {Injectable} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'

import {AppStore} from './app.store'
import {ProjectVM} from './application/view-model/project-vm'

@Injectable()
export class ProjectsResolver implements Resolve<any> {

  constructor(private store: AppStore) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Promise<ProjectVM[]> {
    return this.store.allProjects$.first().toPromise()
  }

}
