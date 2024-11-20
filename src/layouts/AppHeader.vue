
<template>
    <header class="app-header">
      <!-- Left Section -->
      <div class="header-left">
        <button class="nav-toggle" @click="toggleSidebar">          
          <i class="pi pi-align-right icon" style="font-size: 1.25rem"></i>
        </button>
       
      </div>
  
      <!-- Center Section -->
      <!-- <div class="header-center">
        <div class="search-bar">
          <i class="pi pi-search search-icon"></i>
          <input 
            type="search" 
            placeholder="Search..." 
            v-model="searchQuery"
            @focus="isSearchFocused = true"
            @blur="handleSearchBlur"
          />
          <div v-if="isSearchFocused" class="search-dropdown">
            <div class="search-section">
              <h3>Recent Searches</h3>
              <div v-for="(item, index) in recentSearches" :key="index" class="search-item">
                <i class="pi pi-history" style="color: var(--text-primary)"></i>
                <span style="color: var(--text-primary); margin-right: 10px;">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
  
      <!-- Right Section -->
      <div class="header-right">
        <div class="header-actions">
          <!-- Notifications -->
          <div class="action-item" ref="notificationsRef">
            <button 
              class="action-button"
              @click="toggleNotifications"
              :class="{ 'has-badge': unreadNotifications > 0 }"
            >
              <i class="pi pi-bell icon" style="font-size: 1.5rem"></i>
              <span v-if="unreadNotifications" class="badge">{{ unreadNotifications }}</span>
            </button>
            <div v-show="isNotificationsOpen" class="dropdown notifications-dropdown">
              <div class="dropdown-header">
                <h3>Notifications</h3>
                <button class="mark-all-read" @click="markAllRead">Mark all as read</button>
              </div>
              <div class="notifications-list">
                <div v-for="notification in notifications" 
                     :key="notification.id" 
                     class="notification-item"
                     :class="{ 'unread': !notification.read }"
                >
                  <div class="notification-icon" :class="notification.type">
                    <i :class="getNotificationIcon(notification.type)"></i>

                    
                  </div>
                  <div class="notification-content">
                    <p class="notification-text">{{ notification.message }}</p>
                    <span class="notification-time">{{ notification.time }}</span>
                  </div>
                </div>
              </div>
              <div class="dropdown-footer">
                <a href="#" class="view-all">View all notifications</a>
              </div>
            </div>
          </div>
  
          <!-- User Profile -->
          <div class="action-item" ref="profileRef">
            <button class="profile-button" @click="toggleProfile">
              <img src="/avatar.png" alt="User avatar" class="avatar" />
              <span class="user-name">Mushe Abdul-Hakim</span>
              <i class="pi pi-chevron-down icon"  style="font-size: 1rem ; color:#fff" :class="{ 'rotated': isProfileOpen }"></i>
              
            </button>
            <div v-show="isProfileOpen" class="dropdown profile-dropdown">
              <div class="profile-header">
                <img src="/avatar.png" alt="User avatar" class="profile-avatar" />
                <div class="profile-info">
                  <h4>Mushe Abdul-Hakim</h4>
                  <p>Administrator</p>
                </div>
              </div>
              <div class="dropdown-menu">
                <a href="#" class="menu-item">                 
                  <i class="pi pi-user icon"></i>
                  <span>My Profile</span>
                </a>
                <a href="#" class="menu-item">
                  <i class="pi pi-cog icon"></i>
                  <span>Settings</span>
                </a>
                <div class="divider"></div>
                <a  class="menu-item" @click="handleLogout">
                  <i class="pi pi-sign-out icon"></i>
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'  
    

  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  const emit = defineEmits(['toggle-sidebar'])

  const store = useStore()
  const router = useRouter()
  
  // State
  const searchQuery = ref('')
  const isSearchFocused = ref(false)
  const isNotificationsOpen = ref(false)
  const isProfileOpen = ref(false)
  const unreadNotifications = ref(3)
  const notificationsRef = ref(null)
  const profileRef = ref(null)
  
  // Mock data
  const recentSearches = ref([
    'Employee attendance',
    'Payroll reports',
    'Leave requests'
  ])
  
  const notifications = ref([
    {
      id: 1,
      type: 'success',
      message: 'Your leave request has been approved',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Meeting scheduled for tomorrow at 10 AM',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      message: 'Please complete your timesheet',
      time: '2 hours ago',
      read: false
    }
  ])
  
  // Methods
  const toggleSidebar = () => {
    emit('toggle-sidebar')
  }
  
  const handleSearchBlur = () => {
    setTimeout(() => {
      isSearchFocused.value = false
    }, 200)
  }
  
  const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
    if (isProfileOpen.value) isProfileOpen.value = false
  }
  
  const toggleProfile = () => {
    isProfileOpen.value = !isProfileOpen.value
    if (isNotificationsOpen.value) isNotificationsOpen.value = false
  }
  
  const markAllRead = () => {
    notifications.value = notifications.value.map(notification => ({
      ...notification,
      read: true
    }))
    unreadNotifications.value = 0
  }
  

  const getNotificationIcon = (type) => {
    const icons = {
      success: 'pi pi-check-circle',
      warning: 'pi pi-exclamation-circle',
      info: 'pi pi-info-circle'
    }
    return icons[type] || 'pi pi-info-circle'; 
  }

  
  // Click outside handler
  const handleClickOutside = (event) => {
    if (notificationsRef.value && !notificationsRef.value.contains(event.target)) {
      isNotificationsOpen.value = false
    }
    if (profileRef.value && !profileRef.value.contains(event.target)) {
      isProfileOpen.value = false
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  const handleLogout = () => {
    store.dispatch('logout')
    router.push('/login')
   
}
  </script>
  
  <style scoped>
  .app-header {
    height: 64px;
    background-color: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-lg);
    position: fixed;
    top: 0;
    right: 0;
    left: var(--sidebar-width);
    z-index: 100;
    transition: left var(--transition-duration) ease;
  }
  
  .sidebar-collapsed .app-header {
    left: var(--sidebar-collapsed-width);
  }
  
  /* Header Sections */
  .header-left,
  .header-right {
    display: flex;
    align-items: center;
  }
  
  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0 var(--spacing-xl);
  }
  
  
  
  /* Navigation Toggle */
  .nav-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--spacing-md);
  }
  
  .nav-toggle .icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
  }
  
  /* Search Bar */
  .search-bar {
    position: relative;
    width: 100%;
    max-width: 480px;
  }
  
  .search-bar input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-lg);
    padding-left: calc(var(--spacing-lg) + 24px);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background-color: var(--bg-secondary);
    font-size: 0.875rem;
  }
  
  .search-icon {
    position: absolute;
    left: var(--spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
  }
  
  /* Search Dropdown */
  .search-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin-top: var(--spacing-sm);
    box-shadow: var(--shadow);
    z-index: 1000;
  }
  
  .search-section {
    padding: var(--spacing-md);
  }
  
  .search-section h3 {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
  }
  
  .search-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm);
    cursor: pointer;
  }
  
  .search-item:hover {
    background-color: var(--bg-secondary);
  }
  
  .item-icon {
    width: 16px;
    height: 16px;
    margin-right: var(--spacing-sm);
    color: var(--text-secondary);
  }
  
  /* Header Actions */
  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .action-item {
    position: relative;
  }
  
  .action-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .action-button .icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
  }
  
  /* Badge */
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--primary-color);
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Dropdowns */
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: var(--spacing-sm);
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    min-width: 280px;
    z-index: 1000;
  }
  
  .dropdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
  }
  
  .dropdown-header h3 {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 600;
  }
  
  .mark-all-read {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  /* Notifications */
  .notifications-list {
    max-height: 360px;
    overflow-y: auto;
  }
  
  .notification-item {
    display: flex;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    gap: var(--spacing-md);
  }
  
  .notification-item:hover {
    background-color: var(--bg-secondary);
  }
  
  .notification-item.unread {
    background-color: rgba(var(--primary-color-rgb), 0.05);
  }
  
  .notification-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  .notification-icon.success {
    background-color: rgba(0, 200, 0, 0.1);
    color: rgb(0, 200, 0);
  }
  
  .notification-icon.warning {
    background-color: rgba(255, 152, 0, 0.1);
    color: rgb(255, 152, 0);
  }
  
  .notification-icon.info {
    background-color: rgba(0, 122, 255, 0.1);
    color: rgb(0, 122, 255);
  }
  
  .notification-content {
    flex: 1;
  }
  
  .notification-text {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
  }
  
  .notification-time {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  
  /* Profile Button */
  .profile-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
  }



.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.profile-button .icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  transition: transform var(--transition-duration);
}

.profile-button .icon.rotated {
  transform: rotate(180deg);
}

/* Profile Dropdown */
.profile-dropdown {
  min-width: 240px;
}

.profile-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info h4 {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.profile-info p {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.dropdown-menu {
  padding: var(--spacing-sm);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: background-color var(--transition-duration);
}

.menu-item:hover {
  background-color: var(--bg-secondary);
  cursor: pointer;
}

.menu-item .icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: var(--spacing-sm) 0;
}

.dropdown-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.view-all {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .header-center {
    padding: 0 var(--spacing-md);
  }

  .user-name {
    display: none;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 var(--spacing-md);
  }

  .brand-name {
    display: none;
  }

  .header-center {
    padding: 0 var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .search-bar {
    display: none;
  }
}
</style>