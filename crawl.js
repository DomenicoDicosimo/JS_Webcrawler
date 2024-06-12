import { JSDOM } from 'jsdom'

function normalizeURL(URLString){
    const myURL = new URL(URLString)
    myURL.pathname = myURL.pathname.replace(/\//g, '');
    return `${myURL.hostname}${myURL.pathname}`
}

function getURLsFromHtml(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = [];

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href');
        
            if (href) {
                const resolvedURL = new URL(href, baseURL).href;
                urls.push(resolvedURL);
            }
        }
    }
    return urls
}   

export { normalizeURL, getURLsFromHtml };