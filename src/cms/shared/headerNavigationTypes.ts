// Shared type definitions for navigation components

export interface LinkUrlType {
    base?: string;
    default?: string;
    hierarchical?: string;
    type?: string;
}

export interface LinkType {
    text: string;
    url: LinkUrlType;
}

export interface MenuItemType {
    Link: LinkType;
    LinkText?: string;
    SubMenuItems?: MenuItemType[];
}
