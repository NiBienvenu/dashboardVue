<template>
    <div class="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
     <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo-container">
        <div class="brand">
          <img src="/logo.png" alt="SmartHr Logo" class="brand-logo" />
          <h1 class="brand-name">SmartHr</h1>
        </div>
          <!-- <div class="logo"></div>
          <span v-show="!isSidebarCollapsed" class="company-name">SmartHr</span>
          <button class="toggle-btn" @click="toggleSidebar">
            <MenuIcon class="icon" />
          </button> -->
        </div>
  
        <div class="nav-container">
          <div v-show="!isSidebarCollapsed" class="nav-header">Main</div>
          <nav class="nav-menu">
            <div 
              v-for="(item, index) in menuItems" 
              :key="index" 
              :class="['menu-item', { 'is-heading': item.heading }]"
            >
              <div v-if="!item.heading">
                <a 
                  href="#" 
                  class="nav-link"
                  :class="{ 'is-active': item.isActive }"
                  @click="item.hasSubmenu && toggleSubmenu(item)"
                  :aria-label="item.label"
                >
                  <component :is="item.icon" class="menu-icon" />
                  <span v-show="!isSidebarCollapsed" class="link-text">{{ item.label }}</span>
                  <ChevronDownIcon 
                    v-if="item.hasSubmenu && !isSidebarCollapsed"
                    class="submenu-arrow"
                    :class="{ 'is-rotated': item.isOpen }"
                  />
                </a>
                <div 
                  v-if="item.hasSubmenu"
                  class="submenu"
                  :class="{ 'is-open': item.isOpen }"
                  v-show="!isSidebarCollapsed"
                >
                  <a 
                    v-for="(subItem, subIndex) in item.submenu"
                    :key="subIndex"
                    href="#"
                    class="submenu-link"
                  >
                    {{ subItem.label }}
                  </a>
                </div>
              </div>
              <div v-else class="section-title" v-show="!isSidebarCollapsed">
                {{ item.label }}
              </div>
            </div>
          </nav>
        </div>
      </aside>
  
      <!-- Header -->
      <Header @toggle-sidebar="toggleSidebar" />

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-wrapper">
          <header class="page-header">
            <h1>Welcome</h1>
            <p>Dashboard</p>
          </header>
  
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div 
              v-for="(stat, index) in stats" 
              :key="index" 
              class="stat-card"
            >
              <div class="stat-content">
                <span class="stat-icon">{{ stat.icon }}</span>
                <div class="stat-info">
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Charts -->
          <div class="charts-grid">
            <div class="chart-card">
              <h2>Budget</h2>
              <budget-chart :data="budgetData"/>
            </div>
  
            <div class="chart-card">
              <h2>Estimates & Invoices Overview</h2>
              <estimates-chart :data="budgetData"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Header from './Header.vue'
  import BudgetChart from '../components/BudgetChart.vue'
  import EstimatesChart from '../components/EstimatesChart.vue'
  import DashboardIcon from '../icons/DashboardIcon.vue'
  import AppIcon from '../icons/AppIcon.vue'
  import UserIcon from '../icons/UserIcon.vue'
  import UsersIcon from '../icons/UsersIcon.vue'
  import TichetIcon from '../icons/TichetIcon.vue'
  import PayrollIcon from '../icons/PayrollIcon.vue'
  import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
  import MenuIcon from '../icons/MenuIcon.vue'
  
  const isSidebarCollapsed = ref(false)
  
  const menuItems = ref([
    { icon: DashboardIcon, label: 'Dashboard' },
    { 
      icon: AppIcon, 
      label: 'Apps', 
      hasSubmenu: true, 
      isOpen: false, 
      submenu: [
        { label: 'Chat' },
        { label: 'Calendar' }
      ]
    },
    { label: 'Employees', heading: true },
    { 
      icon: UserIcon, 
      label: 'Employees', 
      hasSubmenu: true, 
      isOpen: false,
      submenu: [
        { label: 'All Employees' },
        { label: 'Holidays' },
        { label: 'Leaves (Admin)' },
        { label: 'Leaves (Employee)' },
        { label: 'Leave Settings' },
        { label: 'Attendance (Admin)' },
        { label: 'Attendance (Employee)' },
        { label: 'Departments' },
        { label: 'Designations' }
      ]
    },
    { icon: UsersIcon, label: 'Clients' },
    { icon: TichetIcon, label: 'Tickets' },
    { 
      icon: PayrollIcon, 
      label: 'Payroll', 
      hasSubmenu: true, 
      isOpen: false, 
      submenu: [
        { label: 'Employee Salary' },
        { label: 'Payslip' },
        { label: 'Payroll Items' }
      ]
    },
  ])
  
  const stats = ref([
    { icon: "🔄", label: "Projects", value: "0" },
    { icon: "💰", label: "Clients", value: "1" },
    { icon: "📝", label: "Tickets", value: "4" },
    { icon: "👥", label: "Employees", value: "2" },
  ])
  
  const budgetData = ref([
    { month: 'Feb', value: 52 },
    { month: 'Apr', value: 0 },
    { month: 'Jun', value: 56 },
    { month: 'Aug', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Dec', value: 0 },
  ])
  
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  
  const toggleSubmenu = (item) => {
    item.isOpen = !item.isOpen
  }
  </script>
  
  <style>
  :root {
    --sidebar-width: 200px;
    --sidebar-collapsed-width: 70px;
    --transition-duration: 0.3s;
    --primary-color: #ff9800;
    --text-primary: #333;
    --text-secondary: #666;
    --bg-primary: #fff;
    --bg-secondary: #f5f5f5;
    --border-color: #e0e0e0;
    --shadow: 0 1px 3px rgba(0,0,0,0.1);
    --border-radius: 8px;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
  }
  
  /* Reset & Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Layout */
  .dashboard {
    display: flex;
    min-height: 100vh;
    background-color: var(--bg-secondary);
    position: relative;
  }
  
  /* Sidebar */
  .sidebar {
    position: fixed;
    height: 100vh;
    width: var(--sidebar-width);
    background-color: var(--bg-primary);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: width var(--transition-duration) ease;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .sidebar-collapsed .sidebar {
    width: var(--sidebar-collapsed-width);
  }
  
  /* Logo Container */
  .logo-container {
    padding: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    position: relative;
    min-height: 64px;
  }
  
  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    margin-left: var(--spacing-md);
  }
  
  .brand-logo {
    width: 32px;
    height: 32px;
    border-radius: var(--border-radius);
  }
  
  .brand-name {
    margin-left: var(--spacing-md);
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  /* Navigation */
  .nav-container {
    padding: var(--spacing-md);
    flex: 1;
  }
  
  .nav-header {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    white-space: nowrap;
  }
  
  .nav-menu {
    display: flex;
    flex-direction: column;
  }
  
  .menu-item {
    margin-bottom: var(--spacing-sm);
  }
  
  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--text-primary);
    text-decoration: none;
    border-radius: 4px;
    transition: background-color var(--transition-duration);
    white-space: nowrap;
  }
  
  .nav-link:hover {
    background-color: var(--bg-secondary);
  }
  
  .nav-link.is-active {
    background-color: var(--bg-secondary);
  }
  
  .menu-icon {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }
  
  .link-text {
    margin-left: var(--spacing-sm);
  }
  
  /* Submenu */
  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-duration) ease;
    background-color: var(--bg-secondary);
  }
  
  .submenu.is-open {
    max-height: 500px;
  }
  
  .submenu-link {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) calc(var(--spacing-xl) + var(--spacing-sm));
    color: var(--text-secondary);
    text-decoration: none;
    transition: background-color var(--transition-duration);
    white-space: nowrap;
  }
  
  .submenu-link:hover {
    background-color: var(--bg-primary);
  }
  
  .submenu-arrow {
    margin-left: auto;
    transition: transform var(--transition-duration);
    width: 16px;
    height: 16px;
  }
  
  .submenu-arrow.is-rotated {
    transform: rotate(180deg);
  }
  
  /* Toggle Button */
  .toggle-btn {
    position: absolute;
    right: var(--spacing-md);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toggle-btn .icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    padding-top: 64px;
    margin-left: var(--sidebar-width);
    transition: margin-left var(--transition-duration) ease;
    min-height: 100vh;
    width: calc(100% - var(--sidebar-width));
  }
  
  .sidebar-collapsed .main-content {
    margin-left: var(--sidebar-collapsed-width);
    width: calc(100% - var(--sidebar-collapsed-width));
  }
  
  .content-wrapper {
    padding: var(--spacing-md);
    width: 100%;
  }
  
  /* Page Header */
  .page-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .page-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  .page-header p {
    color: var(--text-secondary);
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  .stat-card {
    background-color: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow);
  }
  
  .stat-content {
    display: flex;
    align-items: center;
  }
  
  .stat-icon {
    font-size: 1.5rem;
    margin-right: var(--spacing-md);
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  .stat-label {
    color: var(--text-secondary);
  }
  
  /* Charts Grid */
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--spacing-lg);
  }
  
  .chart-card {
    background-color: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow);
  }
  
  .chart-card h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }
  
  /* Tooltip for collapsed sidebar */
  .sidebar-collapsed .nav-link:hover::after {
    content: attr(aria-label);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--text-primary);
    color: var(--bg-primary);
    padding: var(--spacing-sm);
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
    margin-left: var(--spacing-sm);
  }
  
  /* Responsive Design */

  
  </style>