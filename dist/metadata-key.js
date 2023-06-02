"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataKey = void 0;
/**
 * Metadata key.
 */
class MetadataKey {
    /**
     * Constructor.
     *
     * @param name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * To string.
     */
    toString() {
        return this.name
            ? this.constructor.name + `(${this.name})`
            : this.constructor.name;
    }
}
exports.MetadataKey = MetadataKey;
//# sourceMappingURL=metadata-key.js.map