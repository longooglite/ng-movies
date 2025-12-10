import { isPlatformBrowser } from "@angular/common"
import { inject, Injectable, PLATFORM_ID } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { MOBILE_WIDTH, ScreenSize } from "../consts/globals"



@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  constructor() {
    if (this.isBrowser) {   
        this.screenSizeSubject.next(this.getScreenSize())
        const checkScreenSize = () => {
            this.screenSizeSubject.next(this.getScreenSize())
        }
        window.addEventListener('resize', checkScreenSize)
        window.addEventListener('unload', () => {
            window.removeEventListener('resize', checkScreenSize)
        })
        checkScreenSize()
    }
  }
  private screenSizeSubject = new BehaviorSubject<ScreenSize>('desktop' as ScreenSize)
  screenSize$ = this.screenSizeSubject.asObservable()
  private getScreenSize() {
    if (window.innerWidth < MOBILE_WIDTH) {
      return 'mobile' as ScreenSize
    }
    return 'desktop' as ScreenSize
  }
}