///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Skincare = require('./skincare')


///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter SP
    const startSkincareProducts = [
        { name: "Shiseido Clear Sunscreen Stick", sensitiveSkin: true, day: true, night: false, skinType: "allskintypes", skinConcern: "SunProtection", imageUrl: "shiseido.webp"},
        { name: "Skin Aqua Super Moisture Gel", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "SunProtection", imageUrl: "skinAqua.jpg"},
        { name: "Biore Aqua Rich Watery Essence", sensitiveSkin: true, day: true, night: false, skinType: "allskintypes", skinConcern: "SunProtection", imageUrl: "biore.png"},
        { name: "Etude House Sunprise Mild Airy Finish Sun Milk", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "SunProtection", imageUrl: "etudeHouse.webp" },
        {name: "Beauty of Joseon Ginseng Essence Water", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "beautyofJoseon.jpg" },
        {name: "Goodal Green Tangerine Vita C Dark Spot Serum", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "goodalGreen.jpg"},
        {name: "Liz K Super First C Serum Pure Vitamin 13%", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "lizK.jpg"},
        {name: "Purito Pure Vitamin C Serum", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern:"Brightening", imageurl: "purito-pure-vitamin-c.avif"}, 
        {name: "Urang Vitamin Oil Serum", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "urang.jpg"},
        {name: "Klairs Freshly Juiced Vitamin Drop", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "klairs.jpg"},
        {name: "Isntree C-Niacin Toning Ampoule", sensitiveSkin: true, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "isntree.jpg"}, 
        {name: "Aromatica Super Brite Vita Serum", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern:"Brightening", imageurl: "aromatica.jpg"}, 
        {name: "It's Skin Power 10 Formula VC Effector", sensitiveSkin: false, day: true, night: false, skinType: "allskintypes", skinConcern: "Brightening", imageurl: "itsskinpower10.jpg"}, 
        {name: "Paula's Choice Clinical 1% Retinol Treatment Cream", sensitiveSkin: false, day: false, night: true, skinType: "allskintypes", skinConcern: "LinesAndWrinkles", imageUrl: "paulas-choice.jpg"}
      ]

    // delete all the existing SP
    Skincare.deleteMany({ owner: null })
        .then(deletedSkincareProducts => {
            console.log('this is what .deleteMany returns', deletedSkincareProducts)

            // create a bunch of new skincare products from starter products
            Skincare.create(startSkincareProducts)
                .then(data => {
                    console.log('here are the newly created skincare products', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})