/*
  @utility: decodeHTML
  @description: eliminiates weird characters from the article card

  @props {string} html: takes in the HTML that needs to be changed

  @example… from app/(tabs)/index.tsx
  const description = decodeHtml(extract('description'));
*/

const decodeHtml = (html: string) => {
    if(!html) return '';

    return html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '-')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&rsquo;/g, "'")
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')

};

export default decodeHtml;