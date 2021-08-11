import { inject, injectable } from 'inversify';
import DependencyType from '../../DependencyType';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ShopInfo } from './ShopInfo';
import { ShopInfoDocument, ShopInfoQuery, ShopInfoQueryVariables } from '../../../generated/shopify_types';

@injectable()
export class ShopInfoService {
    constructor(
        @inject(DependencyType.ApolloClient) private readonly apolloClient: ApolloClient<NormalizedCacheObject>,
    ) {}

    async fetchShopInfo(): Promise<ShopInfo> {
        const { data, error } = await this.apolloClient.query<ShopInfoQuery, ShopInfoQueryVariables>({
            query: ShopInfoDocument,
        });

        if (!data || error) {
            throw new Error('Unable to retrieve store info');
        }

        return {
            name: data.shop.name,
            description: data.shop.description ?? '',
        };
    }
}
