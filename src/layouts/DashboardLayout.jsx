import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
    return (
        <div className='flex min-h-screen'>
            <section className=' md:sticky md:top-0 md:h-fit'>
                <Sidebar
                    
                />
            </section>
        </div>
    );
}

export default DashboardLayout;
