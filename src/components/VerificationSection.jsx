// // import React from 'react';
// // import { CheckCircle, XCircle, FileText, Landmark, Building2, Download, User, Mail, Phone } from 'lucide-react';

// // const VerificationSection = () => {

// //   const userData = {
// //     profile: {
// //       name: "Christopher Brown",
// //       email: "user0@gmail.com",
// //       phone: "+7 (903) 941-02-27",
// //       image: "https://via.placeholder.com/150" 
// //     },
// //     business: {
// //       companyName: "Hwheh",
// //       registrationNumber: "Hdhs",
// //       taxNumber: "Hshwh",
// //       vatId: "Hshsh"
// //     },
// //     documents: [
// //       { name: "Professional Qualifications", fileName: "IMG-20251226-WA0058~2.jpg" },
// //       { name: "Professional Liability Insurance", fileName: "IMG-20251226-WA0058~2.jpg" }
// //     ],
// //     banking: {
// //       holderName: "Tamim Ahmed",
// //       iban: "AE1234567890123456789",
// //       bankName: "Islamic Bank"
// //     }
// //   };

// //   const handleAction = (status) => {
// //     alert(`User "${userData.profile.name}" has been ${status}`);
// //   };

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen font-nunito">
// //       <div className="max-w-5xl mx-auto">
        
// //         {/* --- ১. User Information Header --- */}
// //         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-6">
// //           <div className="relative">
// //             <img 
// //               src={userData.profile.image} 
// //               alt="Applicant" 
// //               className="w-24 h-24 rounded-full border-4 border-purple-50 object-cover shadow-sm"
// //             />
// //             <div className="absolute bottom-1 right-1 bg-orange-500 w-5 h-5 rounded-full border-2 border-white shadow-sm"></div>
// //           </div>
          
// //           <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
// //             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
// //               <div className="p-2 bg-white rounded-xl shadow-sm text-purple-600"><User size={20}/></div>
// //               <div>
// //                 <p className="text-[10px] font-bold text-gray-400 uppercase">Applicant Name</p>
// //                 <p className="text-sm font-bold text-gray-800">{userData.profile.name}</p>
// //               </div>
// //             </div>
            
// //             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
// //               <div className="p-2 bg-white rounded-xl shadow-sm text-blue-500"><Mail size={20}/></div>
// //               <div>
// //                 <p className="text-[10px] font-bold text-gray-400 uppercase">Email Address</p>
// //                 <p className="text-sm font-bold text-gray-800">{userData.profile.email}</p>
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
// //               <div className="p-2 bg-white rounded-xl shadow-sm text-green-500"><Phone size={20}/></div>
// //               <div>
// //                 <p className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</p>
// //                 <p className="text-sm font-bold text-gray-800">{userData.profile.phone}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* --- ২. Actions & Title --- */}
// //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// //           <h2 className="text-xl font-bold text-[#6200EE] uppercase tracking-wider">Verification Details</h2>
          
// //           <div className="flex gap-3">
// //             <button 
// //               onClick={() => handleAction('Declined')}
// //               className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 rounded-2xl font-bold border-2 border-red-50 shadow-sm hover:bg-red-50 transition-all"
// //             >
// //               <XCircle size={18} /> Decline
// //             </button>
// //             <button 
// //               onClick={() => handleAction('Approved')}
// //               className="flex items-center gap-2 px-6 py-3 bg-[#6200EE] text-white rounded-2xl font-bold shadow-[0px_4px_0px_0px_rgba(98,0,238,1)] active:translate-y-1 transition-all"
// //             >
// //               <CheckCircle size={18} /> Approve
// //             </button>
// //           </div>
// //         </div>

// //         {/* --- ৩. Information Grid --- */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
// //           {/* Business Info */}
// //           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
// //             <h3 className="flex items-center gap-2 text-md font-bold mb-6 text-gray-700">
// //               <Building2 size={20} className="text-purple-600"/> Business Registration
// //             </h3>
// //             <div className="space-y-5">
// //               <InfoRow label="Company Name" value={userData.business.companyName} />
// //               <InfoRow label="Registration No." value={userData.business.registrationNumber} />
// //               <InfoRow label="Tax Identification" value={userData.business.taxNumber} />
// //               <InfoRow label="VAT ID" value={userData.business.vatId} />
// //             </div>
// //           </div>

// //           {/* Banking Info */}
// //           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
// //             <h3 className="flex items-center gap-2 text-md font-bold mb-6 text-gray-700">
// //               <Landmark size={20} className="text-green-600"/> Bank Account
// //             </h3>
// //             <div className="space-y-5">
// //               <InfoRow label="Holder Name" value={userData.banking.holderName} />
// //               <InfoRow label="IBAN Number" value={userData.banking.iban} />
// //               <InfoRow label="Bank Name" value={userData.banking.bankName} />
// //               <div className="p-3 bg-green-50 rounded-2xl text-[10px] text-green-700 font-bold text-center border border-green-100">
// //                 VERIFIED BANKING CHANNEL
// //               </div>
// //             </div>
// //           </div>

// //           {/* Documents Section */}
// //           <div className="md:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
// //             <h3 className="flex items-center gap-2 text-md font-bold mb-6 text-gray-700">
// //               <FileText size={20} className="text-orange-500"/> Verification Documents
// //             </h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {userData.documents.map((doc, i) => (
// //                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group">
// //                   <div className="flex items-center gap-3">
// //                     <div className="p-2 bg-white rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
// //                         <FileText size={18}/>
// //                     </div>
// //                     <div>
// //                       <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{doc.name}</p>
// //                       <p className="text-xs font-bold text-gray-700">{doc.fileName}</p>
// //                     </div>
// //                   </div>
// //                   <button className="p-2 hover:bg-white rounded-lg text-purple-600 transition-all">
// //                     <Download size={18}/>
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ডাটা দেখানোর জন্য হেল্পার রো
// // const InfoRow = ({ label, value }) => (
// //   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
// //     <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</span>
// //     <span className="text-sm font-bold text-gray-800">{value || "---"}</span>
// //   </div>
// // );

// // export default VerificationSection;



// import React, { useState } from 'react';
// import { CheckCircle, XCircle, FileText, Landmark, Building2, Download, User, Mail, Phone, X, Eye, Clock } from 'lucide-react';

// const VerificationManager = () => {
//   const [selectedUser, setSelectedUser] = useState(null);

 
//   const pendingRequests = [
//     {
//       id: 1,
//       profile: { 
//         name: "Christopher Brown", 
//         email: "user0@gmail.com", 
//         phone: "+7 (903) 941-02-27", 
//         image: "https://i.pravatar.cc/150?u=1" 
//       },
//       business: { 
//         companyName: "Hwheh", 
//         registrationNumber: "Hdhs", 
//         taxNumber: "Hshwh", 
//         vatId: "Hshsh" 
//       },
//       documents: [
//         { id: 'q1', name: "Professional Qualifications", fileName: "IMG-20251226-WA0058~2.jpg" },
//         { id: 'i1', name: "Professional Liability Insurance", fileName: "IMG-20251226-WA0058~2.jpg" }
//       ],
//       banking: { 
//         holderName: "Tamim Ahmed", 
//         iban: "AE1234567890", 
//         bankName: "Islamic Bank" 
//       }
//     }
   
//   ];

//   const handleAction = (status, userName) => {
//     alert(`User "${userName}" has been ${status}`);
//     setSelectedUser(null);
//   };

//   return (
//     <div className=" font-nunito mr-10">
//       <div className=" mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Requests</h2>
//         <p className="text-gray-500 mb-8">Review and manage business verification applications.</p>

//         {/* --- User Request Cards List --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pendingRequests.map((user) => (
//             <div 
//               key={user.id} 
//               onClick={() => setSelectedUser(user)}
//               className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
//             >
//               <div className="flex items-center gap-4">
//                 <img src={user.profile.image} alt="" className="w-14 h-14 rounded-2xl object-cover" />
//                 <div className="flex-1 overflow-hidden">
//                   <h3 className="font-bold text-gray-800 truncate">{user.profile.name}</h3>
//                   <p className="text-xs text-gray-400 truncate">{user.profile.email}</p>
//                 </div>
//                 <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
//                   <Clock size={18} />
//                 </div>
//               </div>
              
//               <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
//                 <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">
//                   Pending Review
//                 </span>
//                 <button className="flex items-center gap-1 text-xs font-bold text-gray-500 group-hover:text-[#6200EE]">
//                   Review Details <Eye size={14} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- Verification Modal --- */}
//         {selectedUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//             <div className="bg-gray-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative">
              
//               {/* Close Button */}
//               <button 
//                 onClick={() => setSelectedUser(null)}
//                 className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-all"
//               >
//                 <X size={24} />
//               </button>

//               <div className="p-8">
//                 {/* User Information Header */}
//                 <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-6 mt-4">
//                   <img src={selectedUser.profile.image} alt="User" className="w-20 h-20 rounded-full border-4 border-purple-50 shadow-sm" />
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
//                     <InfoBox icon={<User size={18}/>} color="text-purple-600" label="Name" value={selectedUser.profile.name} />
//                     <InfoBox icon={<Mail size={18}/>} color="text-blue-500" label="Email" value={selectedUser.profile.email} />
//                     <InfoBox icon={<Phone size={18}/>} color="text-green-500" label="Phone" value={selectedUser.profile.phone} />
//                   </div>
//                 </div>

//                 {/* Actions Section */}
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-[#6200EE] uppercase tracking-wide">Reviewing Documents</h2>
//                   <div className="flex gap-3">
//                     <button 
//                       onClick={() => handleAction('Declined', selectedUser.profile.name)}
//                       className="px-6 py-3 bg-white text-red-500 rounded-2xl font-bold border border-red-50 shadow-sm hover:bg-red-50 transition-all"
//                     >
//                       Decline
//                     </button>
//                     <button 
//                       onClick={() => handleAction('Approved', selectedUser.profile.name)}
//                       className="px-6 py-3 bg-[#6200EE] text-white rounded-2xl font-bold shadow-lg hover:bg-purple-700 active:translate-y-1 transition-all"
//                     >
//                       Approve User
//                     </button>
//                   </div>
//                 </div>

//                 {/* Information Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Business Info */}
//                   <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
//                     <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700">
//                       <Building2 size={20} className="text-purple-600"/> Business Info
//                     </h3>
//                     <div className="space-y-4">
//                       <InfoRow label="Company Name" value={selectedUser.business.companyName} />
//                       <InfoRow label="Reg. Number" value={selectedUser.business.registrationNumber} />
//                       <InfoRow label="Tax ID" value={selectedUser.business.taxNumber} />
//                     </div>
//                   </div>

//                   {/* Banking Info */}
//                   <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
//                     <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700">
//                       <Landmark size={20} className="text-green-600"/> Bank Details
//                     </h3>
//                     <div className="space-y-4">
//                       <InfoRow label="Holder Name" value={selectedUser.banking.holderName} />
//                       <InfoRow label="IBAN" value={selectedUser.banking.iban} />
//                       <InfoRow label="Bank" value={selectedUser.banking.bankName} />
//                     </div>
//                   </div>

//                   {/* Documents Section - Error Fixed Here */}
//                   <div className="md:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
//                     <h3 className="flex items-center gap-2 font-bold mb-6 text-gray-700">
//                       <FileText size={20} className="text-orange-500"/> Submitted Documents
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedUser.documents.map((doc) => (
//                         <div 
//                           key={doc.id} 
//                           className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group"
//                         >
//                           <div className="flex items-center gap-3">
//                             <div className="p-2 bg-white rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
//                               <FileText size={20}/>
//                             </div>
//                             <div>
//                               <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{doc.name}</p>
//                               <p className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{doc.fileName}</p>
//                             </div>
//                           </div>
//                           <button className="p-2 bg-white rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm">
//                             <Download size={18}/>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // --- Helper Components ---
// const InfoBox = ({ icon, color, label, value }) => (
//   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
//     <div className={`p-2 bg-white rounded-xl shadow-sm ${color}`}>{icon}</div>
//     <div className="overflow-hidden">
//       <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">{label}</p>
//       <p className="text-xs font-bold text-gray-800 truncate">{value}</p>
//     </div>
//   </div>
// );

// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between items-center border-b border-gray-50 pb-2">
//     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
//     <span className="text-sm font-bold text-gray-800">{value}</span>
//   </div>
// );

// export default VerificationManager;



import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Landmark, Building2, Download, User, Mail, Phone, X, Eye, Clock, Trash2 } from 'lucide-react';

const VerificationManager = () => {
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      profile: { 
        name: "Christopher Brown", 
        email: "user0@gmail.com", 
        phone: "+7 (903) 941-02-27", 
        image: "https://i.pravatar.cc/150?u=1" 
      },
      business: { 
        companyName: "Hwheh", 
        registrationNumber: "Hdhs", 
        taxNumber: "Hshwh", 
        vatId: "Hshsh" 
      },
      documents: [
        { id: 'q1', name: "Professional Qualifications", fileName: "IMG-20251226-WA0058~2.jpg" },
        { id: 'i1', name: "Professional Liability Insurance", fileName: "IMG-20251226-WA0058~2.jpg" }
      ],
      banking: { 
        holderName: "Tamim Ahmed", 
        iban: "AE1234567890", 
        bankName: "Islamic Bank" 
      }
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (e, id) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this request?")) {
      setPendingRequests(pendingRequests.filter(item => item.id !== id));
    }
  };

  const handleAction = (status, userName) => {
    alert(`User "${userName}" has been ${status}`);
    setSelectedUser(null);
  };

  return (
    <div className="font-nunito mr-10 bg-gray-50 min-h-screen">
      <div className=" mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Requests</h2>
        <p className="text-gray-500 mb-8">Review and manage business verification applications.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRequests.map((user) => (
            <div 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <img src={user.profile.image} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-gray-800 truncate">{user.profile.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{user.profile.email}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
                    <Clock size={18} />
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, user.id)}
                    className="bg-red-50 p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">
                  Pending Review
                </span>
                <button className="flex items-center gap-1 text-xs font-bold text-gray-500 group-hover:text-[#6200EE]">
                  Review Details <Eye size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Verification Modal --- */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-gray-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative p-8">
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>

              {/* User Profile Header */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-6 mt-4">
                <img src={selectedUser.profile.image} alt="User" className="w-20 h-20 rounded-full border-4 border-purple-50 shadow-sm" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <InfoBox icon={<User size={18}/>} color="text-purple-600" label="Name" value={selectedUser.profile.name} />
                  <InfoBox icon={<Mail size={18}/>} color="text-blue-500" label="Email" value={selectedUser.profile.email} />
                  <InfoBox icon={<Phone size={18}/>} color="text-green-500" label="Phone" value={selectedUser.profile.phone} />
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#6200EE] uppercase tracking-wide">Reviewing Documents</h2>
                <div className="flex gap-3">
                  <button onClick={() => handleAction('Declined', selectedUser.profile.name)} className="px-6 py-3 bg-white text-red-500 rounded-2xl font-bold border border-red-50 shadow-sm hover:bg-red-50 transition-all">Decline</button>
                  <button onClick={() => handleAction('Approved', selectedUser.profile.name)} className="px-6 py-3 bg-[#6200EE] text-white rounded-2xl font-bold shadow-lg hover:bg-purple-700 active:translate-y-1 transition-all">Approve User</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700"><Building2 size={20} className="text-purple-600"/> Business Info</h3>
                  <div className="space-y-4">
                    <InfoRow label="Company Name" value={selectedUser.business.companyName} />
                    <InfoRow label="Reg. Number" value={selectedUser.business.registrationNumber} />
                    <InfoRow label="Tax ID" value={selectedUser.business.taxNumber} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold mb-5 text-gray-700"><Landmark size={20} className="text-green-600"/> Bank Details</h3>
                  <div className="space-y-4">
                    <InfoRow label="Holder Name" value={selectedUser.banking.holderName} />
                    <InfoRow label="IBAN" value={selectedUser.banking.iban} />
                    <InfoRow label="Bank" value={selectedUser.banking.bankName} />
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold mb-6 text-gray-700"><FileText size={20} className="text-orange-500"/> Submitted Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-200 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm"><FileText size={20}/></div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{doc.name}</p>
                            <p className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{doc.fileName}</p>
                          </div>
                        </div>
                        <button className="p-2 bg-white rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm"><Download size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Components ---
const InfoBox = ({ icon, color, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
    <div className={`p-2 bg-white rounded-xl shadow-sm ${color}`}>{icon}</div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">{label}</p>
      <p className="text-xs font-bold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
    <span className="text-sm font-bold text-gray-800">{value}</span>
  </div>
);

export default VerificationManager;