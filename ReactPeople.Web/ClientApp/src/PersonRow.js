import React from 'react';
function PersonRow({ person, onEditClick, onDeleteClick, shouldBeChecked, onCheckboxClick }) {
    const { firstName, lastName, age, } = person;

    return (
        <tr>
            <td><input type='checkbox' checked={shouldBeChecked} className='form-control' onChange={onCheckboxClick} /></td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td><button className='btn btn-warning' onClick={onEditClick}>Edit</button>
                <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}
export default PersonRow;