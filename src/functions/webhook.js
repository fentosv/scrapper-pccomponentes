require('dotenv').config()


const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

/* Creamos el formato del webhook  */
const { Webhook, MessageBuilder } = require('discord-webhook-node');

//Add to cart
// https://www.pccomponentes.com/cart/addItem/129408

const Webhook_Item = (title, link, price, sku, linkImg) => {
    const hook = new Webhook(DISCORD_WEBHOOK_URL);

    const embed = new MessageBuilder()
        .setTitle(title)
        .setURL(link)

        // .setAuthor('BrocolAIO', 'link', 'https://www.google.com')
        .addField('Sitio web', "**[PcComponentes](https://www.pccomponentes.com/)**", true)
        .addField('Precio', price + "€", true)
        .addField('Disponibilidad', "\u{1F49A} En stock - " + "**[[Add to Cart]](" + "https://www.pccomponentes.com/cart/addItem/" + sku + ")**", false)

        .addField('Enlaces útiles', '\u{1F6D2} [Carrito](https://www.pccomponentes.com/cart/)\n\u{1F4B8} [Checkout](https://www.pccomponentes.com/cart/order)\n')

        .setColor('#f27023 ')
        // .setImage(linkImg)
        .setThumbnail(linkImg)
        .setFooter('PcComponentes monitor, by Fentos', 'https://i.ibb.co/zxtL34D/pngwing-com.png')
        .setTimestamp();

    hook.setUsername('PcComponentes');
    hook.setAvatar('https://img.pccomponentes.com/articles/20/201735/1.jpg')
    hook.send(embed);
}

// Webhook_Item(title, link, price, sku, linkImg)
module.exports = Webhook_Item
