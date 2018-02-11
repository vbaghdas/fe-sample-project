"use strict"
import productPayload from '../../product-payload.json';

export function itemsReducers(state={...productPayload}, action) {
    switch(action.type){
        case "GET_ITEMS":
            return {...state, items: [...state.items]};
            
        case "POST_ITEM":
            return {items: [...state.items, ...action.payload]};
            break;
            
        case "DELETE_ITEM":
            const currentItemToDelete = [...state.items];
            const indexToDelete = currentItemToDelete.findIndex(
                (item) => {
                    return item._id === action.payload._id;
                }
            )
            return {items: [...currentItemToDelete.slice(0, indexToDelete), ...currentItemToDelete.slice(indexToDelete + 1)]}
            break;

        case "UPDATE_ITEM":
            const currentItemToUpdate = [...state.items];
            const indexToUpdate = currentItemToUpdate.findIndex(
                (item) => {
                    return item._id === action.payload._id;
                }
            )
            const newItemToUpdate = {
                ...currentItemToUpdate[indexToUpdate],
                title: action.payload.title
            }

            console.log("what is it newitemToUpdate", newItemToUpdate);
            return {items: [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate + 1)]}
            break;
    }
    return state;
}