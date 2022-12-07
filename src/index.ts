/**
 * A minimalist cache entity with native js Map() object
 */
export class Cache {
    //  Data hash table
    private static data$ = new Map<string, any>();
    //  Metadata hash table, to store insertDate
    private static metadata$ = new Map<string, Metadata>();
    //  ...
    private static evictionDelay$ : number = 5000; // ms

    /**
     * Set key/value storage duration (in milliseconds)
     * @param delayInMilliseconds number
     * @returns 
     */
    public static setEvictionDelay(delayInMilliseconds : number) : void {
        if(isNaN(delayInMilliseconds)) return;
        delayInMilliseconds = Math.max(0, delayInMilliseconds);
        this.evictionDelay$ = delayInMilliseconds;
    }

    /**
     * Get key/value storage duration
     * @returns number (ms)
     */
    public static getEvitionDelay = () : number => this.evictionDelay$;

    /**
     * Get value by key
     * Is value is outdated then undefined is returned
     * Time complexity: O(1)
     * @param key string
     * @returns Value
     */
    public static get(key:string) : any {
        const value = this.data$.get(key);
        if(value && this.isOutdated(key)) {
            this.data$.delete(key);
            this.metadata$.delete(key);
            return undefined;
        }
        return value;
    }

    /**
     * Set value by key
     * Time complexity: O(1)
     * @param key string based key
     * @param value any type of data to store
     */
    public static set(key:string,value:any) : void {
        this.data$.set(key, value);
        this.metadata$.set(key, {insertDate: Date.now()});
    }

    /**
     * Is provided key outdated ?
     * @param key 
     * @returns 
     */
    private static isOutdated(key:string) : boolean {
        const metadata = this.metadata$.get(key);
        if(!metadata) return false;

        const currentTimestamp = Date.now();
        const insertTimestamp = metadata.insertDate;
        return insertTimestamp + this.evictionDelay$ < currentTimestamp;
    }
}

interface Metadata {
    insertDate: number;
}