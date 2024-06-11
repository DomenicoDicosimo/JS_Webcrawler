function normalizeURL(URLString){
    const myURL = new URL(URLString)
    myURL.pathname = myURL.pathname.replace(/\//g, '');
    return `${myURL.hostname}${myURL.pathname}`
}

export { normalizeURL };