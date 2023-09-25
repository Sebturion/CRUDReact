import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Form } from 'reactstrap';

const data = [
  { id: 1, FirstName: "Paco", LastName: "Ruiz" },
  { id: 2, FirstName: "Luis", LastName: "Ordoñez" },
  { id: 3, FirstName: "Hugo", LastName: "Jimenez" },
  { id: 4, FirstName: "Donald", LastName: "Leyva" },
  { id: 5, FirstName: "Rick", LastName: "Suarez" },
  { id: 6, FirstName: "Jimmy", LastName: "Ruiz" }
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      FirstName: '',
      LastName: ''
    },
    modalInsert: false,
    modalEdit: false,
  };

  // Handle form input changes and update the form state
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  // Show the insert modal
  showModalInsert = () => {
    this.setState({ modalInsert: true });
  }

  // Hide the insert modal
  hideModalInsert = () => {
    this.setState({ modalInsert: false });
  }

  // Show the edit modal and populate it with the selected record
  showModalEdit = (record) => {
    this.setState({ modalEdit: true, form: record });
  }

  // Hide the edit modal
  hideModalEdit = () => {
    this.setState({ modalEdit: false });
  }

  // Insert a new record
  insert = () => {
    var NewValue = { ...this.state.form };
    NewValue.id = this.state.data.length + 1;
    var list = this.state.data;
    list.push(NewValue);
    this.setState({ data: list, modalInsert: false });
  }

  // Edit an existing record
  edit = (info) => {
    var counter = 0;
    var list = this.state.data;
    list.map((register) => {
      if (info.id == register.id) {
        list[counter].FirstName = info.FirstName;
        list[counter].LastName = info.LastName;
      }
      counter++;
    });
    this.setState({ data: list, modalEdit: false });
  }

  // Delete a record
  delete = (info) => {
    var option = window.confirm("Confirm delete record " + info.id);
    if (option) {
      var counter = 0;
      var list = this.state.data;
      list.map((register) => {
        if (register.id == info.id) {
          list.splice(counter, 1);
        }
        counter++;
      });
      this.setState({ data: list });
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          {/* Button to show the insert modal */}
          <Button color="success" onClick={() => this.showModalInsert()}>Insert New User</Button>
          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render data rows */}
              {this.state.data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.FirstName}</td>
                  <td>{element.LastName}</td>
                  <td>
                    {/* Button to show the edit modal */}
                    <Button color='primary' onClick={() => this.showModalEdit(element)}>Edit</Button>{"   "}
                    {/* Button to delete a record */}
                    <Button color='danger' onClick={() => this.delete(element)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Insert Modal */}
        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
            <div><h3>Insert Record</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type='text' value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>FirstName:</label>
              <input className='form-control' name='FirstName' type='text' onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>LastName: </label>
              <input className='form-control' name='LastName' type='text' onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {/* Button to insert a new record */}
            <Button color='primary' onClick={() => this.insert()}>Insert</Button>
            {/* Button to cancel the insert operation */}
            <Button color='danger' onClick={() => this.hideModalInsert()}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>
            <div>
              <h3>Edit Record</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type='text' value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>FirstName:</label>
              <input className='form-control' name='FirstName' type='text' onChange={this.handleChange} value={this.state.form.FirstName} />
            </FormGroup>

            <FormGroup>
              <label>LastName:</label>
              <input className='form-control' name='LastName' type='text' onChange={this.handleChange} value={this.state.form.LastName} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {/* Button to save the edited record */}
            <Button color='primary' onClick={() => this.edit(this.state.form)}>Save</Button>
            {/* Button to cancel the edit operation */}
            <Button color='danger' onClick={() => this.hideModalEdit()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default App;