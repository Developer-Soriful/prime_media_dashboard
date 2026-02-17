import React, { useEffect, useState } from "react";
import { Users, UserCheck, AlertCircle } from "lucide-react";
import adminService from '../services/adminService';

const StatCard = ({ title, value, percentage, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#6200EE] shadow-sm flex flex-col justify-between  flex-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="p-2 bg-[#6200EE] rounded-lg shadow-md">
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <span className="text-green-500 text-sm font-semibold">
          +{percentage}%
        </span>
        <span className="text-gray-400 text-sm">Since Last Month</span>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState({
    allUsers: 0,
    allUsersPercentage: 0,
    totalProviders: 0,
    totalProvidersPercentage: 0,
    totalCustomers: 0,
    totalCustomersPercentage: 0,
  });

  // DASHBOARD OVERVIEW 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminService.getDashboardOverview();
        console.log("Dashboard data:", response.data);
        if (response && response.success) {
          setDashboardData(response.data);
        } else if (response && response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);
  const stats = [
    { title: "All Users", value: dashboardData.allUsers, percentage: dashboardData.allUsersPercentage || 0, icon: Users },
    {
      title: "Total Providers",
      value: dashboardData.totalProviders,
      percentage: dashboardData.totalProvidersPercentage || 0,
      icon: UserCheck,
    },
    {
      title: "Reported Customer",
      value: dashboardData.totalCustomers,
      percentage: dashboardData.totalCustomersPercentage || 0,
      icon: AlertCircle,
    },
  ];

  return (
    <section className=" bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>

      <div className="flex flex-wrap gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;
