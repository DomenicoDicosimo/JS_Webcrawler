import { argv } from 'node:process';
import { crawlPage } from './crawl.js'; 

async function main() {
    try {
        if (argv.length < 3){
            throw new Error('No URL was passed in.')
        }
        else if (argv.length > 3){
            throw new Error(`Too many URLs were passed in. ${argv}`)
        }
        else{
            const baseURL= argv[2]; 
            console.log(`The crawler is starting at ${argv[2]}`);
            const pages = await crawlPage(baseURL);
            console.log(pages);
        }

    } catch (err) {
        console.log(err.message)
    }
}

main()