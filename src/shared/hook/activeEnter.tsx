export const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>, toggle: () => void) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        toggle();
    }
};
