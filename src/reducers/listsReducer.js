import { CONSTANTS } from "../actions";
import expect from "expect";
import store from "../store";

let listID = 2;
let cardID = 6;

const initialState = [
  {
    title: "To do",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Take a bath"
      },
      {
        id: `card-${1}`,
        text: "Do drawing"
      }
    ]
  },
  {
    title: "Doing",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${3}`,
        text: "Coding"
      },
      {
        id: `card-${4}`,
        text: "Learning and Implementing"
      },
      {
        id: `card-${5}`,
        text: "Listening songs"
      }
    ]
  }
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: 
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };
      cardID += 1;
      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });
      return newState;
    }
    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        list
      } = action.payload;
      const newState = [...state];
      if(list === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find(list => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    }
    case CONSTANTS.DELETE_LIST: {
      const {listID} = action.payload;
      const newState = state.filter(list => {
        return list.id !== listID
      })
      return newState;
    }
    case CONSTANTS.DELETE_CARD: {
      const {cardId, listId} = action.payload;
      const list = state.find(item => item.id === listId)
      const newCards = list.cards.filter(card => {
        return card.id !== cardId
      })
      const newState = state.map(list => {
        if(list.id === listId) {
          return {
            ...list,
            cards: newCards
          }
        } else {
          return list;
        }
      })
      return newState;
    }
    default:
      return state;
  }
};

const testAddList = () => {
  const stateBefore = [
    {
        id: 'list-0',
        title: 'To do',
        cards: [
            {id: 'card-0', text: "Take a bath"},
            {id: 'card-1', text: 'Do drawing'}
        ]
    },
    {
        id: 'list-1',
        title: 'Doing',
        cards: [
            {
              id: 'card-3',
              text: "Coding"
            },
            {
              id: 'card-4',
              text: "Learning and Implementing"
            },
            {
              id: 'card-5',
              text: "Listening songs"
            }
          ]
    }
  ];
  const action = {
    type: "ADD_LIST",
    payload: 'Completed',
  };
  const stateAfter = [
    {
      id: 'list-0',
      title: 'To do',
      cards: [
          {id: 'card-0', text: "Take a bath"},
          {id: 'card-1', text: 'Do drawing'}
      ]
    },
    {
        id: 'list-1',
        title: 'Doing',
        cards: [
            {
              id: 'card-3',
              text: "Coding"
            },
            {
              id: 'card-4',
              text: "Learning and Implementing"
            },
            {
              id: 'card-5',
              text: "Listening songs"
            }
          ]
    },
    {
      id: 'list-2',
      title: 'Completed',
      cards: []
    },
  ];
  expect(listsReducer(stateBefore, action)).toEqual(stateAfter);
}

const testDeleteList = () => {
  const stateBefore = [
      {
          id: 'list-0',
          title: 'To do',
          cards: [
              {id: 'card-0', text: "Take a bath"},
              {id: 'card-1', text: 'Do drawing'}
          ]
      },
      {
          id: 'list-1',
          title: 'Doing',
          cards: [
              {
                id: 'card-3',
                text: "Coding"
              },
              {
                id: 'card-4',
                text: "Learning and Implementing"
              },
              {
                id: 'card-5',
                text: "Listening songs"
              }
            ]
      }
  ];
  const action = {
    type: "DELETE_LIST",
    payload: {
      listID: 'list-0',
    }
  };
  const stateAfter = [
      {
          id: 'list-1',
          title: 'Doing',
          cards: [
              {
                id: 'card-3',
                text: "Coding"
              },
              {
                id: 'card-4',
                text: "Learning and Implementing"
              },
              {
                id: 'card-5',
                text: "Listening songs"
              }
            ]
      }
  ];
  expect(listsReducer(stateBefore, action)).toEqual(stateAfter);
};

const testAddCard = () => {
  const stateBefore = [
    {
        id: 'list-0',
        title: 'To do',
        cards: [
            {id: 'card-0', text: "Take a bath"},
            {id: 'card-1', text: 'Do drawing'}
        ]
    },
    {
        id: 'list-1',
        title: 'Doing',
        cards: [
            {
              id: 'card-3',
              text: "Coding"
            },
            {
              id: 'card-4',
              text: "Learning and Implementing"
            },
            {
              id: 'card-5',
              text: "Listening songs"
            }
          ]
    }
  ];
  const action = {
    type: "ADD_CARD",
    payload: {listID:'list-0', text:'Learn to shade'},
  };
  const stateAfter = [
    {
      id: 'list-0',
      title: 'To do',
      cards: [
          {id: 'card-0', text: "Take a bath"},
          {id: 'card-1', text: 'Do drawing'},
          {id: 'card-6', text: 'Learn to shade'}
      ]
    },
    {
        id: 'list-1',
        title: 'Doing',
        cards: [
            {
              id: 'card-3',
              text: "Coding"
            },
            {
              id: 'card-4',
              text: "Learning and Implementing"
            },
            {
              id: 'card-5',
              text: "Listening songs"
            }
          ]
    }
  ];
  expect(listsReducer(stateBefore, action)).toEqual(stateAfter);
}

const testDeleteCard = () => {
  const stateBefore = [
      {
          id: 'list-0',
          title: 'To do',
          cards: [
              {id: 'card-0', text: "Take a bath"},
              {id: 'card-1', text: 'Do drawing'}
          ]
      },
      {
          id: 'list-1',
          title: 'Doing',
          cards: [
              {
                id: 'card-3',
                text: "Coding"
              },
              {
                id: 'card-4',
                text: "Learning and Implementing"
              },
              {
                id: 'card-5',
                text: "Listening songs"
              }
            ]
      }
  ];
  const action = {
    type: "DELETE_CARD",
    payload: {
      cardId: 'card-5',
      listId: 'list-1',
    }
  };
  const stateAfter = [
    {
        id: 'list-0',
        title: 'To do',
        cards: [
            {id: 'card-0', text: "Take a bath"},
            {id: 'card-1', text: 'Do drawing'}
        ]
    },
    {
        id: 'list-1',
        title: 'Doing',
        cards: [
            {
              id: 'card-3',
              text: "Coding"
            },
            {
              id: 'card-4',
              text: "Learning and Implementing"
            }
          ]
    }
];
  expect(listsReducer(stateBefore, action)).toEqual(stateAfter);
};

testAddCard();
testDeleteCard();
testAddList();
testDeleteList();
console.log("all tests are passed");

export default listsReducer;
