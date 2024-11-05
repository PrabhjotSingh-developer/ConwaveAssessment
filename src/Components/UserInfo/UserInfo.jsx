import React from 'react'

const UserInfo = ({name,age,nationality,gender}) => {

  return (
    <div>
      
        <ul>
                <li>Name : {name}</li>
                <li>Gender : {gender}</li>

                <li>Age : {age!=null ? age : Math.floor(Math.random()*80)+1}</li>
                <li>Nationality : {nationality?.[0]?.country_id!=null?nationality?.[0]?.country_id:"IN"}</li>
              </ul>
         
    </div>
  )
}

export default UserInfo
