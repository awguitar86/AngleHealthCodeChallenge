import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { deleteMember, Member, updateMember } from '../api';
import MemberModal from './MemberModal';

interface MemberTableProps {
  members: Member[];
  getMembers: () => Promise<void>;
}

export const MemberTable = ({ members, getMembers }: MemberTableProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<Member>({phone: '', first_name: '', last_name: '', email: ''});
  const [emailError, setEmailError] = useState('');
  const [currentSort, setCurrentSort] = useState('up');
  const [allMembers, setAllMembers] = useState<Member[]>([]);

  useEffect(() => {
    setAllMembers(members.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1));
  }, [members]);

  const handleUpdateMember = async () => {
    const email = memberData?.email;
    const id = memberData?.member_id;
      if (id && email && validator.isEmail(email)) {
        const res = await updateMember(memberData, id);
        if (res) {
          setShowModal(false);
          getMembers();
        }
      } else {
        setEmailError('Enter valid Email!');
      }
  }

  const handleDeleteMember = async () => {
    const id = memberData?.member_id;
    if (id) {
      const res = await deleteMember(id);
      if (res) {
        setShowModal(false);
        getMembers();
      }
    }
  }

  const showMemberModal = (member: Member) => {
    setMemberData(member);
    setShowModal(true);
  }

  const onSortChange = (field: string) => {
    if (field === 'name') {
      setAllMembers(currentSort === 'up' ?
        members.sort((a, b) => (a.first_name > b.first_name) ? -1 : 1)
        : members.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1));
    } else {
      setAllMembers(currentSort === 'up' ?
      members.sort((a, b) => (a.email > b.email) ? -1 : 1)
      : members.sort((a, b) => (a.email > b.email) ? 1 : -1));
    }
		setCurrentSort((prevState) => prevState === 'up' ? 'down' : 'up');
	};

  return (
    <>
      <Table striped bordered hover style={{marginTop: '20px', marginBottom: '20px'}}>
        <thead>
          <tr>
            <th style={{cursor:'pointer'}} onClick={() => onSortChange('name')}>
              <span>Name</span>
              <FontAwesomeIcon icon={faSort} style={{marginLeft: '5px'}}/>
            </th>
            <th style={{cursor:'pointer'}} onClick={() => onSortChange('email')}>
              <span>Email</span>
              <FontAwesomeIcon icon={faSort} style={{marginLeft: '5px'}}/>
            </th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {allMembers.map((member) => {
            return (
              <tr key={member.member_id} onClick={() => showMemberModal(member)} style={{cursor: 'pointer'}}>
                <td>{`${member.first_name} ${member.last_name}`}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <MemberModal
          showModal={showModal}
          setShowModal={setShowModal}
          memberData={memberData}
          setMemberData={setMemberData}
          emailError={emailError}
          handleClick={handleUpdateMember}
          buttonText='Update'
          hasDelete={true}
          handleDelete={handleDeleteMember}
      />
    </>
  )
}