import React, { useState, useEffect } from 'react'
import { DragDropContext } from "react-beautiful-dnd"
import Header from '../../Components/header'
import Columns from '../../Components/Board/Columns'
import { useDispatch, useSelector } from 'react-redux'
import CreateCard from '../../Components/Card/CreateCard'
import { useParams } from 'react-router-dom'
import { addingColumns, getAllColumns } from '../../Store/columnsSlice'
import { cardDragUpdate, getAllCards } from '../../Store/cardSlice'
import Loading from '../../Components/loading'
import { setLoading } from '../../Store/loadingSlice'
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Kanban = () => {
  const user = useSelector(state => state.userData)
  const access = useSelector(state => state.usertoken.access)
  const allboard = useSelector(state => state.boards)
  const allcolumns = useSelector(state => state.columns)
  const allcard = useSelector(state => state.cardData)
  const load = useSelector(state => state.loading)
  const [columnsData, setColumnsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [memberData, setMemberData] = useState([])
  const [boardData, setBoardData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState('');
  const [showColumn, setShowColumn] = useState(false);
  const [columnTitle, setcolumnTitle] = useState('')
  const { board } = useParams();
  const dispatch = useDispatch()
  const boardId = board.split('+')[1]


  // choosing specific board from all board
  useEffect(() => {
    const thisBoard = () => {
      if (allboard) {
        // spilt board id from useparams
        const id = board.split('+')[1]
        const data = allboard?.find((board) => board.id.toString() == id)
        setBoardData(data)
      }
    }
    thisBoard()
  }, [])


  // redux data - columns and cards added to state data
  useEffect(() => {
    if (allcolumns) {
      setColumnsData(allcolumns)
    }
    if (allcard) {
      setCardsData(allcard?.cards)
      setMemberData(allcard?.assignee)
    }

  }, [allcard, allcolumns])

  // getting all columns and cards, also handle loading
  useEffect(() => {
    if (access && board) {
      const board_slug = board.split('+')[0]
      dispatch(setLoading(true))
      dispatch(getAllColumns({ access, board_slug }))
        .then((res) => {
          dispatch(getAllCards({ access, board_slug }))
            .then((res) => {
              dispatch(setLoading(false))
            })
        })
    }
  }, [access])


  // handling card dragging
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;   // If there is no destination or the drag is cancelled, return
    // Create a copy of columnsData and cardsData
    const updatedColumnsData = [...columnsData];
    const updatedCardsData = [...cardsData];

    // Find the source and destination columns
    const sourceColumn = updatedColumnsData.find(column => column.position === source.droppableId);
    const destinationColumn = updatedColumnsData.find(column => column.position === destination.droppableId);
    const draggedCard = updatedCardsData.find(card => card.id.toString() === draggableId);

    if (sourceColumn && destinationColumn && draggedCard) {
      // Update only the column property of the dragged card
      const updatedCards = updatedCardsData.map(card => {
        if (card.id.toString() === draggedCard.id.toString()) {
          return { ...card, column: destination.droppableId };
        }
        return card;
      });

      // Update the state with the modified data
      await setCardsData(updatedCards)

      if (access) {
        const droppableId = destination.droppableId
        dispatch(cardDragUpdate({ droppableId, draggableId, access }))
      }
    }
  }

  // filtering card based on the user
  useEffect(() => {
    if (allcard && selectedMember) {
      if (selectedMember === 'all') {
        setCardsData(allcard?.cards)
      } else {
        const data = allcard?.assignee?.filter((user) => user.user == selectedMember)
        const card = data?.map((assignee) => {
          return allcard?.cards.find((card) => assignee.card == card.id)
        })
        setCardsData(card)
      }
    }
  }, [selectedMember, allcard])


  // adding more columns
  const addColumns = (e) => {
    e.preventDefault()
    const position = allcolumns?.reduce((a, b) => parseInt(a.position) > parseInt(b.position) ? a.position : b.position)
    const newPosition = parseInt(position) + parseInt(1)
    dispatch(addingColumns({ access, boardId, columnTitle, newPosition }))
  }


  return (
    <div className='flex'>
      <Header />
      <div
        className="p-7 w-full overflow-hidden  bg-[#FFFF] "
      >
        <div>
          <h1
            className='text-2xl text-black font-semibold text-left 
          border-b uppercase mb-5 pb-3'
          >
            {board.split('+')[0]}
          </h1>
        </div>
        <DragDropContext onDragEnd={onDragEnd} >

          <div className='flex justify-between md:flex-col'>
            <h2 className='p-3 uppercase font-bold'>{board.split('+')[0]}</h2>
            {boardData && user && boardData?.visibility === 'private' && (
              user?.id.toString() === boardData?.user_id.toString() && (
                <button onClick={() => setShowForm(true)}
                  className='bg-[#1D1E2C] text-sm  text-white text-center 
                   px-3 mb-2 rounded-lg '>
                  NEW CARD<span className='font-bold text-lg'>+</span>
                </button>
              )
            )}



            {boardData && user &&
              boardData?.visibility === 'public' && user?.role === 'manager' && (
                <button onClick={() => setShowForm(true)}
                  className='bg-[#1D1E2C] text-sm text-white 
                text-center px-3 mb-2 rounded-lg'>
                  NEW CARD<span className='font-bold text-lg'>
                    +
                  </span>
                </button>
              )}


            {boardData && user &&
              boardData?.visibility === 'public' && 

              (< select
              className='bg-[#D7CDCC]  rounded-lg p-2 font-bold text-sm'
            onChange={(e) => {
              setSelectedMember(e.target.value);
            }}
            value={selectedMember}
            >
            <option value="all">Filter by member</option>
            {memberData?.length > 0 && (
              <>
                {Array.from(new Set(memberData.map((user) => user.user))).map((uniqueUser) => (
                  <option value={uniqueUser} key={uniqueUser}>
                    {uniqueUser}
                  </option>
                ))}
              </>
            )}
          </select>)}
      </div>

      <div
        className='flex overflow-auto rounded-lg p-3 w-full h-[100%] m-auto'
      >
        {load && <Loading />}
        {columnsData?.length > 0 && columnsData?.map((column) => {
          const matchingCards = cardsData?.length > 0 && cardsData?.filter(
            card => {
              return board.split('+')[1] == card.board && column.position === card.column;
            }
          )

          return (
            <Columns key={column.position}
              columnTitle={column.title}
              tasks={matchingCards}
              columnid={column.position}
              boardId={board.split('+')[1]}
            />
          )
        })
        }

        <div className='m-3'>
          <button
            onClick={(e) => setShowColumn(!showColumn)}
            className=' text-center  font-bold bg-[#EEF2F5] py-3 w-[200px] 
              uppercase rounded-xl'
          >
            Add More Colums+
          </button>
          {showColumn && (<div className='flex relative'>
            <input
              className='px-2 py-1 border mt-1 '
              name='column' placeholder='Enter the column name'
              value={columnTitle} onChange={(e) => setcolumnTitle(e.target.value)}
            />
            <IoCheckmarkDoneCircle onClick={addColumns} color='green' size={'20px'}
              className='absolute right-1 top-3' />
          </div>)}
        </div>
      </div>

      {showForm &&
        <CreateCard id={board.split('+')[1]}
          closeModal={() => setShowForm(false)} />}

    </DragDropContext>
      </div >
    </div >
  )
}

export default Kanban