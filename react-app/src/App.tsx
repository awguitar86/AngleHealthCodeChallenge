import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Button } from 'react-bootstrap';
import MemberModal from './Components/MemberModal';
import { getAllMembers, Member, createMember } from './api';
import { MemberTable } from './Components/MemberTable';
import validator from 'validator';

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [memberData, setMemberData] = useState<Member>({phone: '', first_name: '', last_name: '', email: ''});
  const [emailError, setEmailError] = useState('');

  const handleCreateMember = async () => {
    const email = memberData.email;
    if (validator.isEmail(email)) {
      const res = await createMember(memberData);
      res && setShowModal(false);
    } else {
      setEmailError('Enter valid Email!');
    }
  }

  const getMembers = async () => {
    const members = await getAllMembers();
    setMembers(members);
    setAllMembers(members);
  }

  const filterMembers = (e: string) => {
    const text = e.toLowerCase();
    setAllMembers(members.filter((m) =>
      m.first_name.toLowerCase().includes(text) ||
      m.last_name.toLowerCase().includes(text) ||
      m.email.toLowerCase().includes(text) ||
      m.phone?.includes(text)));
  }

  useEffect(() => {
    getMembers();
  }, [showModal]);

  return (
    <Container className="py-5">
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Members</h1>
        <input placeholder='Filter Table' style={{width: '30%', height: '50%'}} onChange={(e) => filterMembers(e.target.value)}/>
      </div>
      <MemberTable members={allMembers} getMembers={getMembers}/>
      <MemberModal
        showModal={showModal}
        setShowModal={setShowModal}
        memberData={memberData}
        setMemberData={setMemberData}
        emailError={emailError}
        handleClick={handleCreateMember}
        buttonText='Add'
        hasDelete={false}
      />
      <Button onClick={() => setShowModal(true)}>Add Member</Button>
    </Container>
  );
};

export default App;
