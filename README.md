README

////////////////////OVERVIEW////////////////////////

This is a full stack app that recommends skincare products for morninig/evening routines based on skincare concerns. 

-Skincare products (using API)
https://github.com/LauraRobertson/skincareAPI
-User model
///////////////////SKINCARE PRODUCTS/////////////////
Each skincare product will have attributes from skincare analysis
    -Comment capability under each skincare product
    -Attributes from skincare analysis
        -Lines/Wrinkles
        -Loss of firmness
        -Dull/tired looking skin
        -Pores
        -Uneven skintone
        -Sun protection
        -Brightening
        -Dark spots
        -Puffiness
        -Dark circles
        -Dryness
        -Morning/Evening 
        -Suitable for sensitive skin
            -formulation
                -chemical - not suitable
                -mineral - suitable
        -Skin type
            -Dry
            -normal/combination
            -oily
    -Each skincare product will have a "targets: ---" listing the skin concern each product targets under image
Skincare Analysis: 
Skin type: 
    -Dry
    -Normal/Combination
    -Oily
Skin Concerns:
    -Lines/Wrinkles
    -Loss of firmness
    -Dull/tired looking skin
    -Pores
    -Uneven skintone
    -Sun protection
    -Brightening
    -Dark spots
    -Puffiness
    -Dark circles
    -Dryness
-skin sensitivities: 
    -yes
    -No
After registration, user will be prompted to complete a "Skincare Analysis" to best meet their skincare concerns. Results of skincare analysis will be saved with user. 

/////////////////FUTURE CAPABILITY///////////
    -Product details
        -quick view
        -add to cart (from quick view and main product viewing)
        -add to favorites
    -able to buy recommended skincare products)
        -Cart
            -number of items displayed in cart
        -basket capabilities
            -add, remove, delete
        -total
    -return policy
    -account details
        -billing/shipping address
        -username
        -secure payment platform
        -return status/method
        -change email address/shipping address on user account
    -customer service   
        -order delayed
        -order not received
        -check shipping status
    -Guest account (in payment methods)
-Using science and technology, we curate the skincare product that's right for you. 
///////////////USER STORIES///////////////
1.) home page
    -login/register
    -myAccount
    -Favorites
    -Home
2.) if New User, prompt to complete skincare analysis
3.) completion of skincare analysis
4.) listing of applicable products


![Wireframe_1](./Wireframe_1.jpg)
![Wireframe_2](./Wireframe_2.jpg)
![ERD](./ERD.png)