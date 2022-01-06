import { SetStateAction, Dispatch } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Member } from '../api';

interface MemberModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  memberData: Member;
  setMemberData: Dispatch<SetStateAction<Member>>;
  emailError: string;
  handleClick: () => {};
  buttonText: string;
  hasDelete: boolean;
  handleDelete?: () => Promise<void>
}

const NewMemberModal: React.FC<MemberModalProps> = (props: MemberModalProps) => {
  const { showModal, setShowModal, memberData, setMemberData, emailError, handleClick, buttonText, hasDelete, handleDelete } = props;
  const {phone, first_name, last_name, email} = memberData;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control required value={first_name} onChange={(e) => setMemberData(prevState => ({...prevState, first_name: e.target.value}))}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control required value={last_name} onChange={(e) => setMemberData(prevState => ({...prevState, last_name: e.target.value}))}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {' '}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control required value={email} type='email' onChange={(e) => setMemberData(prevState => ({...prevState, email: e.target.value}))}/>
              {emailError && <span style={{color: 'red', fontWeight: 'bold'}}>{emailError}</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control value={phone} onChange={(e) => setMemberData(prevState => ({...prevState, phone: e.target.value}))}/>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-flex-end">
        <Button variant="outline-primary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        {hasDelete && (
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button onClick={handleClick}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewMemberModal;
