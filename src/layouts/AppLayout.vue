<template>
    <div class="dashboard" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <AppSideBar :isSidebarCollapsed="isSidebarCollapsed" />
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <AppMain />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AppHeader from './AppHeader.vue'
  import AppMain from './AppMain.vue'
  import AppSideBar from './AppSideBar.vue';
  
  const isSidebarCollapsed = ref(false)
  
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  };
  

  </script>
  
  <style setup>
  
    
  </style>