class Agent {

    id: any
    name: any
    price: any
    imageUrl: any
    stockLevel: any
    
    constructor(id: any, title: any, price: any, imageUrl: any, stockLevel: any) {
        this.id = id;
        this.title = title;
        this.price = price,
        this.imageUrl = imageUrl
        this.stockLevel = stockLevel;
    }
}

export default Product;