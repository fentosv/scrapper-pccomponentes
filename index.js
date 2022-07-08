// const loop = require('./loop.js')
const ProxyJSON = require('./src/functions/proxy')
const Scrapy_PCCom = require('./src/functions/scrapy_pccom')
const delayProxy = 10000
const delayNoProxy = 90000

let index = 0;

//Itera sobre el objeto array y vuelve a empezar, con delay
const loop = (array, time) => {
    const arrayLength = array.length;

    //Usamos el scrapper cada X segundos
    Scrapy_PCCom("https://www.pccomponentes.com/lian-li-uni-fan-sl120-rgb-kit-x3-120mm", undefined)
    // console.log(`${index} es ${array[index].ip}`)

    index = (index + 1) % arrayLength;
    setTimeout(loop, time, array, time);
}

const resolve = async () => {

    console.log("Fentos scraper running...")
    const proxyList = await ProxyJSON()
    console.log(`${proxyList.length} proxies cargados.`)

    if (proxyList.length === 0) {
        console.log("El programa se ejecuturá sin proxies.")
        loop(proxyList, delayNoProxy)

    } else {
        //Recorremos los proxies y ejecutamos el scraper dentro
        loop(proxyList, delayProxy)

    }
}

resolve()