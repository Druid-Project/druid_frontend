// import React, { useState } from "react";
// import axios from "axios";

// const MauticForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: "",
//     country: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     data.append("firstname", formData.firstName);
//     data.append("lastname", formData.lastName);
//     data.append("email", formData.email);
//     data.append("message", formData.message); // Add the message field
//     data.append("country", formData.country); // Add the country field

//     const formId = 2; // Replace with your actual Mautic form ID
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post(
//         `${import.meta.env.VITE_MAUTIC_HOST_URL}/form/submit?formId=${formId}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // Include token in header
//           },
//         }
//       )
//       .then((response) => {
//         setLoading(false);
//         setSuccessMessage("Form submitted successfully!");
//         console.log(response);
//       })
//       .catch((error) => {
//         setLoading(false);
//         setSuccessMessage("Error submitting form.");
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       {successMessage && <p>{successMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Message</label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Country</label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//           >
//             <option value="">Select your country</option>
//             <option value="US">United States</option>
//             <option value="CA">Canada</option>
//             <option value="GB">United Kingdom</option>
//             {/* Add more country options here */}
//           </select>
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MauticForm;
