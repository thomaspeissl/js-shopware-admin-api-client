import { create } from '../src/index.js';
import Criteria from '../src/data/criteria.data.js';

async function test() {
    let api = await create('http://localhost', 'SWIAD0VBY1HTR2PSTM5OAUVHMQ', 'eXcxZUlDWW5IZG1GRk5iM1MwUnRjb2cwN0dBcjFOQ2lySlUwYXk');

    let repository = api.create('product');
    let criteria = new Criteria();
    criteria.limit = 1;
    criteria.addFilter(Criteria.equals('parentId', null));

    let products = await repository.search(criteria, api.defaultContext());

    for (const product of products) {
        console.log(product.name);
        // product.name = 'Node Test';
        // console.log(product.name);
        // await repository.save(product, api.defaultContext()); // use this if you want to save the changes to this product directly (single update)
    }
    // await repository.sync(products, api.defaultContext()); // or if you update multiple products you can use this to save all changes at once (bulk update)
}

test();