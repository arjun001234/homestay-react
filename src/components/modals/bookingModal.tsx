import { AxiosResponse } from 'axios'
import { Form, Formik } from 'formik'
import { format } from 'path'
import React from 'react'
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { roomCartType } from '../../redux/reducers/app'
import { userActions } from '../../redux/reducers/user'
import { Booking, BookingInputType } from '../../types/types'
import { fetcher } from '../../utils/axios'

type bookingValuesType = {
    from: Date,
    to: Date
}

type bookingModalProps = {
    roomCart: roomCartType,
    closeModal: () => void
}

const BookingModal : React.FC<bookingModalProps> = ({roomCart,closeModal}) => {

  const {id} = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  return <Formik<bookingValuesType>
      initialValues={{from: new Date(),to: new Date()}}
      onSubmit={async (values) => {
          closeModal()
          try {
            const rooms : {quantity: number,roomId: string}[] = []
            roomCart.rooms.map(curr => rooms.push({quantity: curr.quantity,roomId: curr.room.id}))
            const res = await fetcher.post<Booking>("/booking",{
                from: values.from.toUTCString(),
                to: values.to.toUTCString(),
                rooms: rooms,
                homestayId: id
            },{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.status === 201) {
               dispatch(userActions.addBooking(res.data))
               navigate("/profile")
            }else if (res.status === 403){
                toast.error("User not authenticated",{
                    position: "top-right"
                })
                navigate("/login")
            }
          } catch(e) {
              console.log(e)
          }
      }}
      >
      {formik => (
          <div className='modal-container'>
              <div onClick={closeModal.bind(null)}>
                  <GrClose />
              </div>
              <Form className='booking-modal' onSubmit={formik.handleSubmit}>
                  <h1>Confirm your booking</h1>
                  <div>
                      <label htmlFor='from'>From</label>
                      <input type="date" name="from" />
                  </div>
                  <div>
                      <label htmlFor='to'>To</label>
                      <input type="date" name="to" />
                  </div>
                  <button type='submit'>Confirm Booking</button>
              </Form>
          </div>
      )}
  </Formik>
}

export default BookingModal