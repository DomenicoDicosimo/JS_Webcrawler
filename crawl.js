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

async function crawlPage(currentURL){
    try {
        const response = await fetch(currentURL);
        
        if (response.status >= 400){
            console.error(`Error: Recieved status code ${response.status}`)
            return
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")){
            console.error(`Error: Expected content-type text/html buy received ${contentType}`)
            return
        }

        const html = await response.text();
        console.log(html);
    }catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

export { normalizeURL, getURLsFromHtml, crawlPage };