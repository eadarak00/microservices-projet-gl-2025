// import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import { NgModule } from '@angular/core';
// import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

// const uri = 'http://localhost:8080/api/classe/graphql';
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

// @NgModule({
//   exports: [ApolloModule],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
// })
// export class GraphQLModule {}

import { NgModule } from '@angular/core';
import { APOLLO_NAMED_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          classeClient: {
            cache: new InMemoryCache(),
            link: httpLink.create({ uri: 'http://localhost:8080/api/classe/graphql' }),
          },
          etudiantClient: {
            cache: new InMemoryCache(),
            link: httpLink.create({ uri: 'http://localhost:8080/api/etudiant/graphql' }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
