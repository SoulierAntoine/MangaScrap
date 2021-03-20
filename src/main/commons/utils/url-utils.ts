'use strict';

export default class UrlUtils {
    static url(addTrailingSlash: boolean = false, ...components: string[]): string {
        if (!components || components.length === 0)
            return '';
        if (components.length === 1)
            return components[0];

        const url = components
            .map(component => component
                .replace(/^\/+/, '')
                .replace(/\/+$/, '')
            )
            .join('/');

        if (addTrailingSlash)
            return UrlUtils.addTrailingSlash(url);

        return url;
    }

    static addTrailingSlash(url: string): string {
        if (!url || url.endsWith('/') || url.length === 0)
            return url;
        return `${url}/`;
    }
}
