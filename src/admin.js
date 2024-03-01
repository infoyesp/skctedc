import React, { Component } from 'react';
import firebase from './firebase';
import './admin.css';
import * as XLSX from 'xlsx'; // Importing the xlsx library

class App extends Component {
    state = {
        formData: [],
        loading: true
    };

    componentDidMount() {
        // Reference to the 'formSubmissions' node in Firebase Realtime Database
        const formSubmissionsRef = firebase.database().ref('formSubmissions');

        // Fetch data from Firebase
        formSubmissionsRef.once('value', snapshot => {
            const formData = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                formData.push(data);
            });
            this.setState({ formData: formData, loading: false });
        }, error => {
            console.error("Error fetching form data:", error);
            this.setState({ loading: false });
        });
    }

    // Function to convert form data to Excel format
    convertToExcel = () => {
        const { formData } = this.state;

        // Prepare Excel data
        const data = formData.map(entry => {
            return {
                'Name': entry.name,
                'Phone Number': entry.phoneNumber,
                'College Email': entry.collegeEmail,
                'Department':entry.Department,
                'Year':entry.Year,
                // 'EDC Email': entry.edcEmail,
                // 'Team': entry.team,
                
                // Add more fields as necessary
            };
        });

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(data);

        // Add the sheet to the workbook
        XLSX.utils.book_append_sheet(workbook, sheet, 'Form Submissions');

        // Save the workbook to an Excel file
        XLSX.writeFile(workbook, 'form_submissions.xlsx');
    };

    render() {
        const { loading } = this.state;

        return (
            <div className="app-container container">
                <div className="skct-edc-form">
                    <h2>Form Submissions</h2>
                    <button onClick={this.convertToExcel}>Download Excel</button>
                    <div className="form-submissions">
                        <h3>Form Submissions</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            this.state.formData.map((data, index) => (
                                <div key={index} className="submission">
                                    <p>Name: {data.name}</p>
                                    <p>Phone Number: {data.phoneNumber}</p>
                                    <p>College Email: {data.collegeEmail}</p>
                                    <p>Year: {data.year}</p>
                                    <p>Department: {data.Department}</p>
                                    {/* <p>EDC Email: {data.edcEmail}</p> */}

                                    {/* <p>Team: {data.team}</p> */}
                                    {/* <p>Message: {data.message}</p> */}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
