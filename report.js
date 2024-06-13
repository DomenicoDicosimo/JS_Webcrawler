function printReport(pages){
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    for(const [url, count] of sortedPages){
        console.log(`Found ${count} internal links to ${url}`)
    }
}

export {printReport};