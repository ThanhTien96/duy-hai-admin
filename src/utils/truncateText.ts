
export const truncateText = (text: string, len: number) => {
    if(text.length > len) {
        const newtext = text.slice(0, len);
        return newtext + "...";
    } else {
        return text;
    }
}