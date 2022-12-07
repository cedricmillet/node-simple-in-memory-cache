# node-simple-in-memory-cache

## Test / build
```bash
yarn install
# Run tests
npm run test
# Build project
npm run build
```

## Example
```javascript
import {Cache} from "node-simple-in-memory-cache";

Cache.setEvictionDelay(5000);

const [key, value] = ["username", "John Doe"]

//  Set value
Cache.set(key, value)

//  Get Value within 5 seconds
Cache.get(key) // => "John Doe"

//  Get Value 10 seconds later
Cache.get(key) // => undefined

```


## To do
* Eviction policy & parameters
* Publish on npmjs.org
* Express.js middleware