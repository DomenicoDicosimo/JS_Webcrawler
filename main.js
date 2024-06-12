import { argv } from 'node:process';
import { crawlPage } from './crawl.js'; 

function main() {
    try {
        if (argv.length < 3){
            throw new Error('No URL was passed in.')
        }
        else if (argv.length > 3){
            throw new Error(`Too many URLs were passed in. ${argv}`)
        }
        else{
            console.log(`The crawler is starting at ${argv[2]}`)
            crawlPage(argv[2])
        }

    } catch (err) {
        console.log(err.message)
    }
}

main()