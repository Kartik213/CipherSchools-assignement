import React from 'react'
import Navbar from "../components/navbar/Navbar"
import UserMain from "../components/user/UserMain"
import Aboutme from "../components/aboutme/Aboutme"
import Ciphermap from '../components/ciphermap/Ciphermap'
import OntheWeb from "../components/onweb/OntheWeb"
import Professional from "../components/ProfessionalInforamtion/Professional"
import Password from "../components/password/Password"
import Interest from "../components/interest/Interest"

const HomePage = () => {
  return (
    <div className="app">
      <Navbar />
      <UserMain />
      <Aboutme />
      <Ciphermap />
      <OntheWeb />
      <Professional />
      <Password />
      <Interest />
    </div>
  );
}

export default HomePage
