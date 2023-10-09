import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged ,signOut  } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore functions

function ProtectedPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Store fetched data
  const [userEmail, setUserEmail] = useState(""); // Add userEmail state to store user's email
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the login page if the user is not logged in
        navigate("/login");
      }
      else {
        setUser(user); // Set user state if authenticated
        setUserEmail(user.email || ""); // Ensure user.email is defined
      }
    });

    // Fetch data from Firestore
    const fetchData = async () => {
      const db = getFirestore();
      const dataCollection = collection(db, "virtuosi"); // Replace with your Firestore collection name

      try {
        const querySnapshot = await getDocs(dataCollection);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data from Firestore", error);
      }
    };

    fetchData(); // Call the fetch function

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
        alert("Sorry,Logout Failed !");
    }
  };

  // Render your protected page content here, using the 'data' state
  return (
    <div>
      <h2>Virtuosi Music Band Systems</h2>
      {user && (
        <div>
          <p>Welcome, {userEmail}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
        {data.map((item, index) => (
  <div key={index}>
    <p>Sl No: {item.slno}</p>
    <p>Name: {item.name}</p>
    <p>Credit: {item.credit}</p>
    <p>Debit: {item.debit}</p>
    <p>Balance: {item.balance}</p>
  </div>
))}

    </div>
  );
}

export default ProtectedPage;
