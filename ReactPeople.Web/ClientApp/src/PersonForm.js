import React from "react";
function PersonForm({ onAddClick, onTextChange, person, editMe, onUpdateClick, onCancelClick }) {
    const { firstName, lastName, age } = person;

    return (

        <div className="container">
            <div className="row jumbotron">
                <div className="col-md-3 ">
                    <input type="text" value={firstName} className="form-control" name="firstName" placeholder="First Name" onChange={onTextChange}></input>
                </div>
                <div className="col-md-3">
                    <input type="text" value={lastName} className="form-control" name="lastName" placeholder="Last Name" onChange={onTextChange}></input>
                </div>
                <div className="col-md-3">
                    <input type="text" value={age} className="form-control" name="age" placeholder="Age" onChange={onTextChange}></input>
                </div>
                <div className="col-md-3">
                    {editMe ? <div><button className="btn btn-info" onClick={onUpdateClick}>Update</button>
                        <button className="btn btn-danger" onClick={onCancelClick}>Cancel</button> </div>
                        : <button className="btn btn-primary" onClick={onAddClick}>Add</button>}

                </div>
            </div>
        </div>
    )

}
export default PersonForm;