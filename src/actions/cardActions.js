import {CONSTANTS} from "../actions"

export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listID, text}
    }
}

export const deleteCard = (cardId, listId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {
            cardId,
            listId
        }
    }
}
