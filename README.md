# Admin JavaScript-API Client for Shopware 6

This code highly bases on the [Administration Code](https://github.com/shopware/platform/tree/745f1f7aaa5c47d123e04b5b5b93b81161eae19a/src/Administration/Resources/app/administration/src/core/data-new) and made JavaScript compatible.

## Template Repository

You can also use the [Shopware API Quickstart Template Repository](https://github.com/7underlines/shopware-api-quickstart) to quickly get started.

## Running the examples with a local Shopware 6 instance

Usually, running the examples is quite simple if you have an environment that already has a functional git and docker installation.

To get started, simply try to execute the following in your terminal/shell:

```bash
git clone https://github.com/7underlines/js-shopware-admin-api-client
cd js-shopware-admin-api-client
docker-compose up -d
# or docker compose up -d if you have a newer version of docker
# Visit http://localhost in your browser and refresh until the shop is available
npm i
node example/product.js
```

Once you are done, you can stop the docker container with:

```bash
docker-compose down
```

## Creation of API Client

### Installation

```bash
npm i shopware-admin-api-client
```

## Usage

```js
import {create} from 'shopware-admin-api-client';

// Create the API client
let api = await create('http://localhost', 'admin', 'shopware');

// Create repository
const productRepository = api.create('product');

// Access default context
const context = api.defaultContext();

// Acccess entity definition (contains the schema, required fields etc.)
const definition = api.EntityDefinition;

console.log(definition.get('product'))
console.log(definition.getRequiredFields('product'))
```

Take a look at the **[index.js](https://github.com/7underlines/shopware-api-quickstart/blob/main/index.js)** file in the quickstart template repository for a complete example.

## Credits

- [Soner Sayakci](https://github.com/shyim) - Original Creator

## License

[MIT](LICENSE.md)