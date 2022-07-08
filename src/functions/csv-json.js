const fs = require('fs');
const neatCsv = require('neat-csv');
const path = require('path')

const csv = fs.readFileSync("items.csv", 'utf-8').trim();


//Lee el CSV, lo filtra y lo convierte en objeto
const CSV_Parser = async () => {

    const parse = await neatCsv(csv);
    //=> [{type: 'unicorn', part: 'horn'}, {type: 'rainbow', part: 'pink'}]

    //Filtramos los que tengan algún campo vacío
    const parseFiltered = parse.filter(element =>
        element.ITEM.trim() != '' &&
        element.URL.trim() != ''
    )


    console.log("CSV successfully parsed!");
    // console.log(parseFiltered);
    // console.log(typeof parseFiltered);
    return parseFiltered
}


class Item {
    constructor(name, url, price) {
        this.name = name
        this.url = url
        this.price = price
        // this.available = available
    }
}


const url = path.join(__dirname, "../resources/items.json")
// console.log(url)

//Crea el archivo JSON y añade en él los datos sacados del CSV
const JSONer = async (items) => {

    //Si no existe el item.json, lo creamos
    // if (!fs.existsSync('items.json')) {
    //     fs.writeFileSync('items.json', JSON.stringify([]))
    // }
    if (!fs.existsSync(url)) {
        fs.writeFileSync(url, JSON.stringify([]))
    }

    //Leemos el archivo y se utiliza parse para que se convierta en objeto javascript
    const datos = JSON.parse(fs.readFileSync(url, 'utf-8').trim());
    // console.log(typeof datos)


    //Itera el objeto y va creándolo con la clase que hemos construido
    for (const item of items) {

        //Pasamos al constructor los objetos, cuyas propiedades se llaman como las columnas del CSV: ITEM y URL
        const entry = new Item(item.ITEM, item.URL)

        datos.push(entry);
    }

    console.log("\nJSON file created!")
    // console.log(datos);


    //Luego para escribirlo hay que hacerlo en formato json, por lo que se usa stringify
    const data = JSON.stringify(datos);
    fs.writeFileSync(url, data);
}



const resolve = async () => {
    // console.log("(1) Hola")
    // const array = await getArray()
    // console.log(`(2) ${array[0]}`)
    // console.log("(3) Adios")
    // setTimeout(tsss, 1500)

    const csvParsed = await CSV_Parser()

    JSONer(csvParsed)


}

resolve()

module.exports = JSONer










