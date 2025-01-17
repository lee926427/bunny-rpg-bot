const Character = require('../../../character-service/character/character');

/**
 * CharactersHasSkill condition.
 */
class CharactersHasSkill
{
    /**
     * Condition dispatch
     * @param skill
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<boolean>}
     */
    static async dispatch({skill, senders, receivers, action, args}) {

        for (let i in senders) {
            const sender = senders[i];
            if (! (sender instanceof Character)) {
                action.writeMsg(`[${sender.getName()}] 必須是角色才可以使用技能 [${skill.getDisplayName()}]`);
                return true;
            }

            // TODO: remove duplicate
            if (sender.state instanceof Character.States.Dead) {
                action.writeMsg(`[${sender.getName()}] 為 [${sender.state}] 狀態，無法使用技能 [${skill.getDisplayName()}]`);
                return true;
            }

            if (! sender.hasSkill(skill.getStandardName())) {
                action.writeMsg(`[${sender.getName()}] 沒有技能 [${skill.getDisplayName()}]`);
                return true;
            }
        }

        return false;
    }
}

module.exports = CharactersHasSkill;