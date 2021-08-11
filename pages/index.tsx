import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { ShopInfo } from '../di/services/ShopInfo/ShopInfo';
import { dependenciesContainer, loadServerDependencies } from '../di/DependencyInitializer';
import { ShopInfoService } from '../di/services/ShopInfo/ShopInfoService';
import DependencyType from '../di/DependencyType';
import { useInjection } from '../di/DependencyContext';
import styles from './index.module.css';

export interface IndexProps {
    shopInfo?: ShopInfo;
}

const Index: NextPage<IndexProps> = props => {
    const [shopInfo, setShopInfo] = React.useState<ShopInfo | undefined>(props.shopInfo);
    const shopInfoService = useInjection<ShopInfoService>(DependencyType.ShopInfoService);

    React.useEffect(() => {
        if (!shopInfo) {
            shopInfoService
                .fetchShopInfo()
                .then(shopInfo => {
                    setShopInfo(shopInfo);
                })
                .catch(() => {
                    console.error('Failed to get shop info in client');
                });
        }
    }, [shopInfo, shopInfoService]);

    if (!shopInfo) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.container}>
            <h1>Welcome to {shopInfo.name}</h1>
            <p>{shopInfo.description}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async ctx => {
    const { req } = ctx;
    loadServerDependencies(req);

    const props: IndexProps = {};
    const shopInfoService = dependenciesContainer.get<ShopInfoService>(DependencyType.ShopInfoService);
    try {
        props.shopInfo = await shopInfoService.fetchShopInfo();
    } catch {
        console.error('Failed to get shop info in SSR!');
    }

    return { props };
};

export default Index;
