export const formatEnterYear = (enterYear: string) => {
    if (!enterYear) return '';
    return `${enterYear.toString().substring(2, 4)}학번`;
};
