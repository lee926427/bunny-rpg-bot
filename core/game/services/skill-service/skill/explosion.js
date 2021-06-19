const Skill = require('./skill');

/**
 * Explosion skill
 */
class Explosion extends Skill
{
    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async beforeInteraction(senders, receivers, action, args) {
        // check sender has skill
        // check cost is enough
        // check sender can send effect to receiver

    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async afterInteraction(senders, receivers, action, args) {

    }

    /**
     * Send effect data.
     * @param sender
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async sending(sender, receivers, action, args) {
        // cost mp, hp, sp

        // TODO: refactor use magic attack (compute by int)
        const damage = sender.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        action.writeImg('statics/skill-explosion.png');
        action.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();

        return damage;
    }
}


module.exports = Explosion;