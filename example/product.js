import { create } from '../src/index.js';
import Criteria from '../src/data/criteria.data.js';

async function test() {
    let api = await create('http://localhost', 'admin', 'shopware');

    let repository = api.create('product');
    let criteria = new Criteria();
    criteria.limit = 1;
    criteria.addFilter(Criteria.equals('parentId', null));

    let products = await repository.search(criteria, api.defaultContext());

    for (const product of products) {
        console.log(product.name);
        // product.name = 'Node Test';
        // console.log(product.name);
    }
    await repository.sync(products, api.defaultContext());
}

test();