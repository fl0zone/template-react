// RegistrationComponent.js

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationComponent.css';

function RegistrationComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [college, setCollege] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for show/hide password
    const [error, setError] = useState("");

    const handleRegister = async () => {
        const authInstance = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;

            const db = getFirestore();
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                college: college
            });

            alert('Successfully registered and data saved to Firestore!');
            
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container mt-5">
            <div className="card mx-auto" style={{ minWidth: "400px", minHeight: "400px" }}>
                <div className="card-body">
                    <h2 className="mb-4 text-center">Register</h2>
                    <input 
                        type="text"
                        className="form-control mb-3"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="text"
                        className="form-control mb-3"
                        placeholder="College"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                    />
                    <input 
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group mb-3">
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary btn-block" onClick={handleRegister}>Register</button>
                    </div>
                    <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default RegistrationComponent;
