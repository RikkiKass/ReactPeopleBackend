import React from "react";
import axios from 'axios';
import PersonForm from "./PersonForm";
import PersonRow from "./PersonRow";
class PeopleTable extends React.Component {
    state = {
        people: [],
        checkedPeople: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: '',

        },
        editMe: false,

    }
    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }
    getAll = () => {
        axios.get('/api/people/getall').then((res) => {
            this.setState({
                people: res.data,
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    checked: false
                },
                editMe: false,

            });
        });
    }

    onCheckboxClick = (person) => {
        const { checkedPeople } = this.state;
        if (checkedPeople.includes(person)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p.id !== person.id) });
        }
        else {
            const copy = [...checkedPeople, person];
            this.setState({ checkedPeople: copy });
        }

    }
    onAddClick = () => {

        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.getAll();
        });

    }
    onDeleteClick = (person) => {
        axios.post('/api/people/deleteperson', person).then(() => {
            this.getAll();
        });
    }
    onEditClick = (person) => {
        const copy = { ...this.state.person, firstName: person.firstName, lastName: person.lastName, age: person.age };
        this.setState({ person: copy, editMe: true });
    }
    checkAll = () => {
        const copy = [...this.state.people];
        this.setState({ checkedPeople: copy });
    }
    uncheckAll = () => {
        this.setState({ checkedPeople: [] })
    }

    onUpdateClick = (person) => {
        axios.post('/api/people/updateperson', person).then(() => {
            this.getAll();
        })
    }
    onCancelClick = () => {
        this.setState({ editMe: false, person: { firstName: '', lastName: '', age: '' } });
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    deleteAllChecked = () => {
        (this.state.checkedPeople && this.state.checkedPeople.forEach(p => axios.post('/api/people/deleteperson', p).then(() => {
            this.getAll();
        })))




    }
    render() {
        const { people, person, editMe } = this.state;
        return (
            <div className="container mt-3">
                <div className="row">
                    <PersonForm onAddClick={this.onAddClick}
                        onTextChange={this.onTextChange}
                        onUpdateClick={() => this.onUpdateClick(person)}
                        onCancelClick={this.onCancelClick}
                        editMe={editMe}
                        person={person} />
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <button className="btn btn-danger btn-block" onClick={this.deleteAllChecked}>Delete All Checked</button>
                                    <button className="btn btn-info btn-block" onClick={this.checkAll} >Check All</button>
                                    <button className="btn btn-info btn-block" onClick={this.uncheckAll}>Uncheck All</button>
                                </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => <PersonRow
                                person={p}
                                key={p.id}
                                onEditClick={() => this.onEditClick(p)}
                                onDeleteClick={() => this.onDeleteClick(p)}
                                shouldBeChecked={this.state.checkedPeople.includes(p)}
                                onCheckboxClick={() => this.onCheckboxClick(p)} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default PeopleTable;