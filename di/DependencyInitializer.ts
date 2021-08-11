import { Container } from 'inversify';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import DependencyType from './DependencyType';
import { buildApolloClient } from './factories/ApolloClientFactory';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { ShopInfoService } from './services/ShopInfo/ShopInfoService';

export const dependenciesContainer = new Container();

dependenciesContainer
    .bind<ApolloClient<NormalizedCacheObject>>(DependencyType.ApolloClient)
    .toConstantValue(buildApolloClient());

dependenciesContainer.bind<ShopInfoService>(DependencyType.ShopInfoService).to(ShopInfoService).inSingletonScope();

export function loadServerDependencies(
    req: (IncomingMessage & { cookies: NextApiRequestCookies }) | null = null,
): void {
    if (typeof window !== 'undefined') {
        // On client side, should not load server module.
        return;
    }

    if (dependenciesContainer.isBound(DependencyType.ApolloClient)) {
        dependenciesContainer.unbind(DependencyType.ApolloClient);
    }

    dependenciesContainer.bind(DependencyType.ApolloClient).toConstantValue(buildApolloClient());
}
