class DropZoneEventManager {
    constructor () {
        this.pool = [];
    }

    /**
     * Attach an event listener to a node and store in eventPool
     * @param {Element} node
     * @param {String} event
     * @param {Function} handler
     */
    add (node, event, handler) {
        this.pool.push({ node, event, handler });
        node.addEventListener(event, handler);
    }

    /**
     * Remove all event listeners and return an empty pool
     */
    removeAll () {
        this.pool = this.pool.reduce((pool, item) => {
            const { node, event, handler } = item;

            node.removeEventListener(event, handler);
            return pool;
        }, []);
    }

    /**
     * Prevent default event behaviour & propagation
     * @param  {Event} event
     */
    preventer (event) {
        event.preventDefault();
    }
}

module.exports = DropZoneEventManager;
