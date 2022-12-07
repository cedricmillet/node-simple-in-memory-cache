/**
 * Test native Map() behaviour, is it really an Hash Table ?
 */
export class Cache {

    private static data$ = new Map();
    private static metadata$ = new Map<string, Metadata>();
    private static evictionDelay$ : number = 5000; // ms

    public static setEvictionDelay(delayInMilliseconds : number) : void {
        if(isNaN(delayInMilliseconds)) return;
        delayInMilliseconds = Math.max(0, delayInMilliseconds);
        this.evictionDelay$ = delayInMilliseconds;
    }

    public static getEvitionDelay = () => this.evictionDelay$;

    /**
     * Get value by key
     * Is value is outdated then undefined is returned
     * @param key string
     * @returns Value
     */
    public static get(key:string) {
        const value = this.data$.get(key);
        if(value && this.isOutdated(key)) {
            this.data$.delete(key);
            this.metadata$.delete(key);
            return undefined;
        }
        return value;
    }

    public static set(key:string,value:any) : void {
        this.data$.set(key, value);
        this.metadata$.set(key, {insertDate: Date.now()});
    }

    // TO DO
    public static toString() {
        return this.data$.entries()
    }

    // TO TEST
    private static isOutdated(key:string) {
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