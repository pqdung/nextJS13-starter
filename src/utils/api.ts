import slugify from "slugify";

export const convertSlugUrl = (str: string) => {
    if (!str) return '';
    str = slugify(str, {
        locale: 'vi',
        lower: true
    });
    return str;
}