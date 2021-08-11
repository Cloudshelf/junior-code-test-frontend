import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export function buildApolloClient(): ApolloClient<NormalizedCacheObject> {
    const httpLink = createHttpLink({
        uri: `https://dev-cloudshelf.myshopify.com/api/graphql`,
        headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
    });

    return new ApolloClient<NormalizedCacheObject>({
        link: httpLink,
        cache: new InMemoryCache(),
    });
}
