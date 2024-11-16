import React, { useRef } from 'react'
import './search-bar.css'
import { Col, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'

const SearchBar = ({ setTours }) => {
   const locationRef = useRef('')

   const searchHandler = async (e) => {
      e.preventDefault()
      const location = locationRef.current.value

      if (location === '') {
         return alert('All fields are required!')
      }

      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)

      if (!res.ok) alert('Something went wrong')

      const result = await res.json()
      if (!result?.data) {
         return;
      }
      setTours(result?.data)
   }

   return <Col lg="12">
      <div className="search__bar">
         <form onSubmit={searchHandler} className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i className='ri-map-pin-line'></i></span>
               <div>
                  <h6>Location</h6>
                  <input type="text" placeholder='Where are you going?' ref={locationRef} />
               </div>
            </FormGroup>
            <span className='search__icon' type='submit'>
               <i className='ri-search-line'></i>
            </span>
         </form>
      </div>
   </Col>
}

export default SearchBar