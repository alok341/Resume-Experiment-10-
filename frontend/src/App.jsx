// Filename - App.js
// Resume Form using React State with Backend Integration

import "./App.css";
import { React, useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [qualification, setQualification] = useState("");
    const [skills, setSkills] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = {
            name: name,
            contact: contact,
            email: email,
            dob: dob,
            qualification: qualification,
            skills: skills,
            about: about
        };

        try {
            console.log("Sending data to backend:", formData);
            
            // Make sure this URL is correct
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/resume`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Success response:", result);

            if (result.success) {
                setMessage("✅ Resume Submitted Successfully!");
                setMessageType("success");
                handleReset();
            } else {
                setMessage(`❌ ${result.message || "Submission failed"}`);
                setMessageType("error");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage(`❌ Error: ${error.message}`);
            setMessageType("error");
            
            if (error.message === "Failed to fetch") {
                setMessage("❌ Cannot connect to server. Make sure backend is running on port 5000");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setName("");
        setContact("");
        setEmail("");
        setDob("");
        setQualification("");
        setSkills("");
        setAbout("");
        setMessage("");
    };

    return (
        <div className="App">
            <h1>Resume Form</h1>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="contact">Contact Number*</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="dob">Date of Birth*</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <label htmlFor="qualification">Academic Qualification*</label>
                    <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="Enter your academic qualification"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="skills">Technical Skills*</label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Enter your technical skills"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="about">Career Objective / About*</label>
                    <textarea
                        id="about"
                        name="about"
                        rows="6"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Write something about yourself..."
                        required
                        disabled={loading}
                    ></textarea>

                    <div className="buttons">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                        >
                            Reset
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
}

export default App;