<template>
    <aside class="sidebar">
      <div class="logo-container">
        <div class="brand">
          <img src="/logo.png" alt="SmartHr Logo" class="brand-logo" />
          <h1 class="brand-name">SmartHr</h1>
        </div>
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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ChevronDownIcon from '../icons/ChevronDownIcon.vue'
  import DashboardIcon from '../icons/DashboardIcon.vue'
  import AppIcon from '../icons/AppIcon.vue'
  import UserIcon from '../icons/UserIcon.vue'
  import UsersIcon from '../icons/UsersIcon.vue'
  import TichetIcon from '../icons/TichetIcon.vue'
  import PayrollIcon from '../icons/PayrollIcon.vue'
  
  const props = defineProps({
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  })
  
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
  
  const toggleSubmenu = (item) => {
    item.isOpen = !item.isOpen
  }
  </script>