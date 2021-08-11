import { Container, interfaces } from 'inversify';
import React, { createContext } from 'react';
import { dependenciesContainer } from './DependencyInitializer';

export const DependencyContext = createContext<Container | null>(null);

export function useContainer(): Container {
    const container = dependenciesContainer;
    if (container === null) {
        throw new Error(`The dependency container should be defined`);
    }
    return container;
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
    return useContainer().get<T>(identifier);
}
