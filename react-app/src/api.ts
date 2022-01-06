
export interface Member {
  member_id?: number;
  phone?: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const getAllMembers = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/members');
    return response.json();
  } catch (err) {
    throw(err);
  }
}

export const getSingleMember = async (id: number): Promise<{state: string; value: Member}> => {
  try {
    const response = await fetch(`http://localhost:8000/api/members/${id}`);
    const singleMember = response.json();
    console.log((await singleMember).value);
    return (await singleMember).value;
  } catch (err) {
    throw(err);
  }
}

export const createMember = async (user: Member) => {
  try {
    const response = await fetch(`http://localhost:8000/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const result = response.json();
    console.log(result);
    return result;
  } catch (err) {
    throw(err);
  }
}

export const updateMember = async (user: Member, id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const result = response.json();
    console.log(result);
    return result;
  } catch (err) {
    throw(err);
  }
}

export const partialUpdateMember = async (user: Member, id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/api/members/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const result = response.json();
    console.log(result);
    return result;
  } catch (err) {
    throw(err);
  }
}

export const deleteMember = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/api/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    return response;
  } catch (err) {
    throw(err);
  }
}