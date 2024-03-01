import React from 'react';
import firebase from './firebase';
import "./App.css"; // Import your CSS file

class App extends React.Component {
    state = {
        name: '',
        phoneNumber: '',
        collegeEmail: '',
        edcEmail: '',
        team: '',
        Department: '',
        year:'',
        loading: false,
        errorMessage: '',
        esummitChecked: false // Added state for esummit checkbox
    };
    
    handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        if (name === 'collegeEmail' && !value.endsWith('@skct.edu.in')) {
            errorMessage = 'College email must end with @skct.edu.in';
        }

        this.setState({
            [name]: value,
            errorMessage: errorMessage
        });
    };

    // Function to handle esummit checkbox change
    handleEsummitCheckboxChange = (e) => {
        this.setState({ esummitChecked: e.target.checked });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { collegeEmail, esummitChecked } = this.state;

        if (!collegeEmail.endsWith('@skct.edu.in')) {
            this.setState({
                errorMessage: 'College email must end with @skct.edu.in'
            });
            return;
        }

        // Check if esummit checkbox is not checked
        if (!esummitChecked) {
            alert("Please confirm you have registered for the esummit IIT Madras before submitting the form.");
            return;
        }

        this.setState({ loading: true });

        const { name, phoneNumber, edcEmail, team, year, Department } = this.state;
  
        const formSubmissionsRef = firebase.database().ref('formSubmissions');
  
        formSubmissionsRef.push({
            name,
            phoneNumber,
            collegeEmail,
            edcEmail,
            team,
            year,
            Department
        })
        .then(() => {
            this.setState({
                name: '',
                phoneNumber: '',
                collegeEmail: '',
                // edcEmail: '',
                // team: '',
                Department: '',
                year:'',
                loading: false,
                errorMessage: ''
            });
            alert("Your form has been submitted successfully.");
        })
        .catch((error) => {
            console.error("Error saving form data:", error);
            alert("There was an error submitting your form. Please try again later.");
            this.setState({ loading: false });
        });
    };
  
    render() {
        const { loading, errorMessage, esummitChecked } = this.state;

        return (
            <div className="app-container container">
                <div className="skct-edc-form">
                    <h2>Ecell - SKCT(Registered for esummit IIT Madras)</h2>
                    <form className="contact-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Your Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Your Phone Number" required onChange={this.handleChange} value={this.state.phoneNumber} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="collegeEmail">Your College Email</label>
                            <input 
                                type="email" 
                                id="collegeEmail" 
                                name="collegeEmail" 
                                placeholder="Your College Email" 
                                required 
                                onChange={this.handleChange} 
                                value={this.state.collegeEmail} 
                            />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Department">Department</label>
                            <input type="text" id="Department" name="Department" placeholder="Your Department" required onChange={this.handleChange} value={this.state.Department} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Year">Year</label>
                            <input type="text" id="Year" name="year" placeholder="Year" required onChange={this.handleChange} value={this.state.year} />
                        </div>

                        {/* Checkbox for esummit */}
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={esummitChecked}
                                    onChange={this.handleEsummitCheckboxChange}
                                />
                                Registered for esummit IIT Madras
                            </label>
                        </div>
                        
                        <button type="submit" disabled={errorMessage || loading}>{loading ? 'Submitting...' : 'Submit Form'}</button>
                        {/* <Link to="/admin">
      <button>Admin</button>
    </Link> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
