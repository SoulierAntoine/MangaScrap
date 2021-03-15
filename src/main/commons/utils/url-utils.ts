
export default class UrlUtils {
    static url(...components: string[]): string {
        if (!components || components.length === 0)
            return '';
        if (components.length === 1)
            return components[0];

        return components
            .map(component => component
                .replace(/^\/+/, '')
                .replace(/\/+$/, '')
            )
            .join('/');
    }

    static addTrailingSlash(url: string): string {
        if (!url || url.endsWith('/') || url.length === 0)
            return url;
        return `${url}/`;
    }
}
