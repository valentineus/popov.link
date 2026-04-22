export const websiteId = (siteUrl: string): string => new URL("#website", siteUrl).toString();

export const personId = (siteUrl: string): string => new URL("#person", siteUrl).toString();
