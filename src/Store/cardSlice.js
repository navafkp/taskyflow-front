import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { CardCreate, DragCardUpdate, GetCards } from "../Server/Card/getallCard";

import { GetComments } from "../Server/Card/GetComments";
import { CardEditUpdate } from "../Server/Card/CardEditUpdate";
import { InviteAssignee } from "../Server/Card/InviteNewAssignee";
import { NewComment } from "../Server/Card/AddNewComment";

// -----MIDDLEWARES---

// get all cards
export const getAllCards = createAsyncThunk('user/getAllCards', async ({ access, board_slug }) => {
    const response = await GetCards(access, board_slug)
    return response
})

// create a new card
export const newCardCreate = createAsyncThunk('user/newCardCreate', async ({ access, id, title, description, maxNum, selectedEmails , selectedColor, priority}) => {
    const response = await CardCreate(access, id, title, description, maxNum, selectedEmails, selectedColor, priority)
   
    return response
})

// drag card update
export const cardDragUpdate = createAsyncThunk('user/cardDragUpdate', async ({  droppableId, draggableId, access }) => {
    const response = await DragCardUpdate( droppableId, draggableId, access)
    return response
})


// add comment
export const addComment = createAsyncThunk('user/addComment', async ({ access, user_id,user_name, comment, card_id }) => {
    const response = await NewComment(access, user_id,user_name, comment, card_id)
    return response
})

// get all comments
export const getAllComment = createAsyncThunk('user/getAllComment', async ({ access, card_id }) => {
    const response = await GetComments(access, card_id)
    return response
})



// editable card data update
export const cardEditableUpdate = createAsyncThunk('user/cardEditableUpdate', async ({ access, card_id, updatedData }) => {
    const response = await CardEditUpdate(access, card_id, updatedData)
    if (response.message === 'Card updated successfully') {
        updatedData.cardId = card_id
        return updatedData
    }
    else {
        return response
    }
})

// invite member
export const AssigneeInvite = createAsyncThunk('user/inviteMember', async ({ access, selectedEmails, card_id }) => {
    const response = await InviteAssignee(access, selectedEmails, card_id)
    return response
})


const cardSlice = createSlice({
    name: 'cardData',
    initialState: initialstate.cardData,
    reducers: {
        clearCard: (state) => {
            return initialstate.cardData;
        },
        cardsUpdate: (state, action) => {
            return (
                { ...state, cards: action.payload }
            )
        },
        assigneeUpdate: (state, action) => {
            return (
                { ...state, assignee: action.payload }
            )
        },
        updateCardDeleteion: (state, action) => {
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCards.fulfilled, (state, action) => {
                return (
                    {
                        ...state, cards: action.payload.card?.length === 0 ? null : action.payload.card,
                        assignee: action.payload.card?.length === 0 ? null : action.payload.assignee,
                    }
                )
            })
            .addCase(newCardCreate.fulfilled, (state, action) => {
                state.cards = state.cards === null ? [action.payload.card] : [...state.cards, action.payload.card];
                state.assignee = state.assignee === null ? [...action.payload.assignee] : [...state.assignee, ...action.payload.assignee];
            })
            .addCase(addComment.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        comments: [...state.comments, action.payload],
                    }
                )
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        comments: [...action.payload],
                    }
                )
            })
            .addCase(cardEditableUpdate.fulfilled, (state, action) => {
                const updatedCardId = action.payload.cardId;
                const updatedCardData = action.payload;
            
                return {
                    ...state,
                    cards: state.cards.map((card) =>
                        card.id === updatedCardId ? { ...card, ...updatedCardData } : card
                    ),
                };
            })
            .addCase(AssigneeInvite.fulfilled, (state, action) => {
                return (
                    {
                        ...state,
                        assignee: [...state.assignee, ...action.payload],
                    }
                )
            })
            .addCase(cardDragUpdate.fulfilled, (state, action) => {
                const cardID = action.payload.id
                const updatedCardData = action.payload
          
                return (
                    {
                        ...state,
                        cards: state.cards.map((card)=> card.id === cardID ? { ...card, ...updatedCardData } : card)
                    }
                )
            })     
    }
})

export const { cardsUpdate, assigneeUpdate, updateCardDeleteion, clearCard } = cardSlice.actions;
export default cardSlice.reducer;