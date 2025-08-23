import type {App} from "vue";
import {onError} from "@apollo/client/link/error";
import {SchemaLink} from "@apollo/client/link/schema";
import {makeExecutableSchema} from "@graphql-tools/schema";
import { ApolloClient, InMemoryCache, from } from "@apollo/client/core"
import {DefaultApolloClient} from "@vue/apollo-composable";

import typeDefs from '../plugins/graphql/schema.graphql?raw'
import resolvers from "./graphql/resolvers";

export function createApolloClient(){
    const errorLink = onError(({ graphQLErrors, networkError}) => {
        if(graphQLErrors) for(const e of graphQLErrors) console.error('[GraphQL error]', e.message, e)
        if(networkError) console.error('[Network error]', networkError)
    })

    const link = new SchemaLink({schema: makeExecutableSchema({typeDefs, resolvers}) })

    return new ApolloClient({
        link: from([errorLink,link]),
        cache: new InMemoryCache(),
    })
}

export const apolloPlugin = {
    install(app:App){
        const client = createApolloClient()
        app.provide(DefaultApolloClient, client)
    }
}