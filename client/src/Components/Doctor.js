import React from 'react'
import { useNavigate } from 'react-router-dom'

function Doctor({ doctor }) {
    const navigate = useNavigate();
    return (
        <div className="card p-2 cursor-pointer" onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
            {/* setting state by using setdoctor and data isme api se agr successfully aya to isme dal dia and further isko as a props yaha pass kr k use kr rhe hain */}
            {/* track back from where we are getting this data , see doctor set doctor in home page api*/}
            <h4 className='doctor-info'>{doctor.firstName} {doctor.lastName}</h4>
            <p className='card-text'><b>Phone #: </b>{doctor.phoneNumber}</p>
            <p className='card-text'><b>Address: </b>{doctor.address}</p>
            <p className='card-text'><b>Consultation Fee: </b>{doctor.feePerConsultation}</p>
            <p className='card-text'><b>Timings: </b>
                {doctor.timings[0]}-{doctor.timings[1]}
            </p>
            <p className='card-text'><b>Specialization: </b>{doctor.specialization}</p>
            <p className='card-text'><b>Experience: </b>{doctor.experience} <b> years</b></p>



        </div>
    )
}

export default Doctor