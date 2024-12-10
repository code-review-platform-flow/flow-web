export const formatEnterYear = (enterYear: string) => {
    if (!enterYear) return '';
    return `${enterYear.toString().substring(0, 2)}학번`;
};
