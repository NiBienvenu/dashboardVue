
<template>
  <div class="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo"></div>
        <span class="company-name" v-show="!isSidebarCollapsed">SmartHr</span>
        <button class="toggle-sidebar" @click="toggleSidebar">
          <MenuIcon class="menu-icon" />
        </button>
      </div>

      <div class="nav-container">
        <div class="nav-header" v-show="!isSidebarCollapsed">Main</div>
        <nav class="nav-menu">
          <div v-for="(item, index) in menuItems" 
               :key="index" 
               :class="['menu-item', { 'menu-heading': item.heading }]">
            <template v-if="!item.heading">
              <a href="#" 
                 class="menu-link"
                 @click="item.hasSubmenu && toggleSubmenu(item)"
                 :class="{ 'active': item.isActive }">
                <component :is="item.icon" />
                <span v-show="!isSidebarCollapsed">{{ item.label }}</span>
                <ChevronDownIcon 
                  v-if="item.hasSubmenu" 
                  class="submenu-icon"
                  :class="{ 'rotated': item.isOpen }"
                  v-show="!isSidebarCollapsed"
                />
              </a>
              <!-- Submenu -->
              <div v-if="item.hasSubmenu && item.submenu" 
                   class="submenu"
                   :class="{ 'submenu-open': item.isOpen }"
                   v-show="!isSidebarCollapsed">
                <a v-for="(subItem, subIndex) in item.submenu"
                   :key="subIndex"
                   href="#"
                   class="submenu-link">
                  {{ subItem.label }}
                </a>
              </div>
            </template>
            <template v-else>
              <div class="section-title" v-show="!isSidebarCollapsed">{{ item.label }}</div>
            </template>
          </div>
        </nav>
      </div>
    </div>

    <!-- Rest of the content remains the same -->
    <div class="main-content">
      <!-- ... previous content ... -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  MenuIcon,
  UserIcon,
  Building2Icon,
  TicketIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import BudgetChart from './components/BudgetChart.vue'
import EstimatesChart from './components/EstimatesChart.vue'

const isSidebarCollapsed = ref(false)

const menuItems = ref([
  { icon: MenuIcon, label: 'Dashboard' },
  { icon: MenuIcon, label: 'Apps', hasSubmenu: true, isOpen: false, submenu: [
    { label: 'Chat' },
    { label: 'Calendar' }
  ]},
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
  { icon: Building2Icon, label: 'Clients' },
  { icon: TicketIcon, label: 'Tickets' },
  { icon: MenuIcon, label: 'Payroll', hasSubmenu: true, isOpen: false, submenu: [
    { label: 'Employee Salary' },
    { label: 'Payslip' },
    { label: 'Payroll Items' }
  ]},
])

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleSubmenu = (item) => {
  item.isOpen = !item.isOpen
}

// ... rest of the previous script code ...
</script>

<style>
/* Previous styles remain, adding/modifying these styles */

.dashboard {
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 70px;
  --transition-duration: 0.3s;
}

.sidebar {
  width: var(--sidebar-width);
  transition: width var(--transition-duration) ease;
}

.sidebar-collapsed .sidebar {
  width: var(--sidebar-collapsed-width);
}

.logo-container {
  position: relative;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
}

.toggle-sidebar {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.menu-link {
  position: relative;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: all var(--transition-duration) ease;
}

.menu-link:hover {
  background-color: #f5f5f5;
}

.menu-link.active {
  background-color: #f0f0f0;
}

.submenu-icon {
  width: 16px;
  height: 16px;
  margin-left: auto;
  transition: transform var(--transition-duration) ease;
}

.submenu-icon.rotated {
  transform: rotate(180deg);
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-duration) ease;
  background-color: #f9f9f9;
}

.submenu.submenu-open {
  max-height: 500px; /* Adjust based on your needs */
}

.submenu-link {
  display: block;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  color: #666;
  text-decoration: none;
  transition: background-color 0.2s;
}

.submenu-link:hover {
  background-color: #f0f0f0;
}

.sidebar-collapsed .menu-link span,
.sidebar-collapsed .submenu,
.sidebar-collapsed .nav-header,
.sidebar-collapsed .section-title {
  display: none;
}

.sidebar-collapsed .menu-link {
  justify-content: center;
  padding: 0.75rem;
}

.sidebar-collapsed .menu-link svg {
  margin: 0;
}

.section-title {
  padding: 1rem;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Add tooltip for collapsed sidebar */
.sidebar-collapsed .menu-link {
  position: relative;
}

.sidebar-collapsed .menu-link:hover::after {
  content: attr(aria-label);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  margin-left: 0.5rem;
}

/* Adjust main content margin when sidebar is collapsed */
.sidebar-collapsed .main-content {
  margin-left: var(--sidebar-collapsed-width);
}

</style>