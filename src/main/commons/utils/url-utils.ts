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
            return UrlUtils.appendTrailingSlash(url);

        return url;
    }

    static appendTrailingSlash(url: string): string {
        if (!url || url.endsWith('/') || url.length === 0)
            return url;
        return `${url}/`;
    }

    static prependProtocol(url: string, protocol: string): string {
        if (!url || url.startsWith(protocol))
            return url;

        // ^.+(?=:\/\/)
        const protocolFromUrl = url.match('^.*:{0,1}\/{2}');
        if (protocolFromUrl !== null)
            url = url.substring(protocolFromUrl[0].length, url.length);

        return `${protocol}://${url}`;
    }

    static isRequestingImage(url: string): boolean {
        return url.endsWith('.png')
            || url.endsWith('.jpg')
            || url.endsWith('.gif')
            || url.endsWith('.tif')
            || url.endsWith('.svg')
            || url.endsWith('.tiff')
            || url.endsWith('.jpeg');
    }
}
