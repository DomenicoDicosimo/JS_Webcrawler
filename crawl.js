import { JSDOM } from 'jsdom'

function normalizeURL(URLString) {
    const myURL = new URL(URLString);
    let fullPath = `${myURL.host}${myURL.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
      }
      return fullPath
}


function getURLsFromHtml(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){
    try {
        const currentURLOBJ = new URL(currentURL);
        const baseURLObj = new URL(baseURL)
        if (currentURLOBJ.hostname !== baseURLObj.hostname){
            return pages;
        }
        const normalizedCurrentURL = normalizeURL(currentURLOBJ).toString();
        if (normalizedCurrentURL in pages){
            pages[normalizedCurrentURL]++;
            return pages;
        }
        else{
            pages[normalizedCurrentURL] = 1;
        }
        const html = await fetchHTML(currentURLOBJ);
        const urls = getURLsFromHtml(html,baseURLObj);

        for(const url of urls){
            await crawlPage(baseURLObj,url,pages);
        }
        return pages;

    }catch (error) {
        console.error(`Error: ${error.message}`);
        return pages;
    }
}



async function fetchHTML(currentURL){
    try {
        const response = await fetch(currentURL);
        
        if (response.status >= 400){
            console.error(`Error: Recieved status code ${response.status}`);
            return
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")){
            console.error(`Error: Expected content-type text/html buy received ${contentType}`);
            return
        }

        const html = await response.text();
        return html;
    }catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

export { normalizeURL, getURLsFromHtml, crawlPage };