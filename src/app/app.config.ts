import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideApollo } from 'apollo-angular'
import { InMemoryCache, HttpLink } from '@apollo/client'
import { environment } from '../environments/environment'

const apiKey = environment.env.AWS_API_KEY
const apiUrl = environment.env.API_URL

const httpLink = new HttpLink({
  uri: apiUrl,
  headers: {
    'x-api-key': apiKey,
  }
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideApollo(() => {
      return {
        link: httpLink,
        cache: new InMemoryCache(),
      }
    }),
  ],
}
