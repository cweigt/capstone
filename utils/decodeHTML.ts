//this is to eliminate weird letters to make the cards more readable
const decodeHtml = (html: string) => {
    if(!html) return '';

    return html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&rsquo;/g, "'")
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '');
};

export default decodeHtml;