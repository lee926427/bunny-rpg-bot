const StandardBuff = require('./standard-buff');

/**
 * AsBossBuff
 */
class AsBossBuff extends StandardBuff
{
    /**
     * Constructor
     *
     * @param character
     */
    constructor(character) {
        super(character);
    }

    /**
     * Internal inject for ignore property.
     * @return {function(*, *, *, *): boolean}
     */
    getIgnoreCondition() {
        return (repeatIndex, sender, receiver, args) => receiver.isState('dead');
    }

    /**
     * Get buff ID.
     * @return {string}
     */
    getId() {
        return "as-boss";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "as-boss",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `魔王的加護 (${(this.getEffectTime()/1000) - this.timer}s)`
    }

    /**
     * Buff up
     * @param options
     */
    up(options) {

    }

    /**
     * Buff down
     * @param options
     */
    down(options) {

    }

    /**
     * Effective
     */
    effect() {
        // not things to do
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 5;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 1000 * 60;
    }

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return 1000;
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return 1000;
    }

    /**
     * Getter for str
     * @return {number}
     */
    get dex() {
        return 500;
    }

    /**
     * Getter for agi
     * @return {number}
     */
    get agi() {
        return 70;
    }

    /**
     * Getter for int
     * @return {number}
     */
    get int() {
        return 1000;
    }

    /**
     * Getter for int
     * @return {number}
     */
    get luk() {
        return -500;
    }
}

module.exports = AsBossBuff;