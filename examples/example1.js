import {Cache} from "node-simple-in-memory-cache";

Cache.setEvictionDelay(5000);

const [key, value] = ["username", "John Doe"]

//  Set value
Cache.set(key, value)

//  Get Value within 5 seconds
Cache.get(key) // => "John Doe"

//  Get Value 10 seconds later
Cache.get(key) // => undefined