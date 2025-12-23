// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import { Outlet } from 'react-router';
// import TopNavbar from '../components/TopNavbar';

// const DashboardLayout = () => {
//     return (
//         <div className='flex min-h-screen'>
//             <section className=' md:sticky md:top-0 md:h-fit w-full'>
//                 <Sidebar
                    
//                 />
//             </section>

//             <div className="flex flex-col flex-grow">

//                 <section className='sticky w-full top-0 h-fit'>
//                     <TopNavbar
                        
//                     />
//                 </section>


//                 <main className="flex-grow p-4 lg:p-8">
//                     <Outlet />
//                 </main>

//             </div>
//         </div>

        
//     );
// }

// export default DashboardLayout;



import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';
import TopNavbar from '../components/TopNavbar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logged out");
    };

    return (
        <div className='flex min-h-screen bg-gray-50 overflow-x-hidden'>
            
            <aside className='z-50'>
                <Sidebar 
                    onLogout={handleLogout} 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen} 
                />
            </aside>

            {/* 2. Main Content Area */}
            <div className="flex flex-col flex-grow min-w-0">

                <header className='sticky w-full top-0 z-40 '>
                    <TopNavbar 
                        onMenuClick={() => setIsSidebarOpen(true)} 
                    />
                </header>

                {/* Page Content (Outlet) */}
                <main className="flex-grow p-4 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;
