/*
Sacamos lo que nos interesa de una web y mandamos webhook  
*/

const chalk = require('chalk')
const axios = require('axios-https-proxy-fix')
const cheerio = require("cheerio");

const webhook = require('./webhook')

//Hay que pasarle el enlace y proxy (que puede ser undefined o null si no usamos uno)
const Scrapy_PCCom = (link, proxy) => {

    const instance = axios.create({
        timeout: 15000,

        headers: {
            'Accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty'
        },
        proxy: proxy && proxy
    });

    instance.get(link)
        .then((res) => {
            const $ = cheerio.load(res.data)

            // console.log(' ')

            //JSON Info PcComponentes
            const microdata = JSON.parse($('#microdata-product-script')
                // .text()
                .html())
            // console.log(microdata)

            //TITULO
            console.log(`\n${chalk.hex('#9f33ff').bold('TÍTULO:')} ${microdata.name}`);

            //PRECIO
            //instock = offers.offers
            //oos = offers
            console.log(`${chalk.hex('#9f33ff').bold('PRECIO:')} ${microdata.offers.price || microdata.offers.offers.price}€`);

            //SKU
            console.log(`${chalk.hex('#9f33ff').bold('SKU:')} ${microdata.sku}`);

            //ATC
            console.log(`${chalk.hex('#9f33ff').bold('ATC:')} https://www.pccomponentes.com/cart/addItem/${microdata.sku}`);

            //IMG URL
            console.log(`${chalk.hex('#9f33ff').bold('IMG URL:')} ${microdata.image}`);

            //PRODUCT URL
            console.log(`${chalk.hex('#9f33ff').bold('PRODUCT URL:')} ${microdata.url}`);

            //AVAILABILITY
            //instock = offers.offers
            //oos = offers
            console.log(`${chalk.hex('#9f33ff').bold('AVAILABILITY:')} ${(microdata.offers.availability || microdata.offers.offers.availability).substr(18)}\n`);


            //!WEBHOOK
            //SACAMOS EL WEBHOOK SI TIENE STOCK
            // Webhook_Item(title, link, price, sku, linkImg)

            //Comprobamos si offers tiene un .offers. En ese caso, sabemos que 
            if (microdata.offers.hasOwnProperty('offers')) {

                // console.log(microdata.offers.hasOwnProperty('offers'))
                console.log(`${chalk.hex('#1bbf07').bold(microdata.name.trim())} IN STOCK, SENDING WEBHOOK\n`)

                webhook(microdata.name, link, microdata.offers.price || microdata.offers.offers.price, microdata.sku, "https:" + microdata.image)

            } else {
                // console.log(microdata.offers.hasOwnProperty('offers'))
                console.log(`${chalk.hex('#bf1c07').bold(microdata.name.trim())} OUT OF STOCK\n`)
            }


        })

}


Scrapy_PCCom("https://www.pccomponentes.com/lian-li-uni-fan-sl120-rgb-kit-x3-120mm", undefined)


module.exports = Scrapy_PCCom