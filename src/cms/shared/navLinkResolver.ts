/**
 * Lightweight link resolver for navigation components.
 * Avoids importing utils.ts (which has server-only dependencies like crypto).
 */

interface NavLinkUrl {
    base?: string;
    default?: string;
    hierarchical?: string;
    type?: string;
}

export function resolveNavLink(url: NavLinkUrl | undefined | null, currentDomain: string): string {
    if (!url) return '#';

    const type = url.type || 'HIERARCHICAL';

    if (type === 'EXTERNAL') {
        return url.default || '#';
    }

    // Strip protocol for domain comparison
    const normalizedCurrent = currentDomain.replace(/^https?:\/\//, '');
    const normalizedBase = (url.base || '').replace(/^https?:\/\//, '');
    const isSameDomain = normalizedCurrent === normalizedBase || !url.base;

    if (isSameDomain) {
        return url.hierarchical || url.default || '#';
    }

    if (url.default && url.default.startsWith('http')) {
        return url.default;
    }

    return url.hierarchical || url.default || '#';
}
