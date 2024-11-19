<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import loginIllustration from '../assets/login-illustration.svg'
import 'bootstrap-icons/font/bootstrap-icons.css'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  loading.value = true
  try {
    const success = await store.dispatch('login', {
      email: email.value,
      password: password.value
    })

    if (success) {
      router.push('/dashboard')
    } else {
      error.value = 'Email ou mot de passe incorrect'
    }
  } catch (err) {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="illustration-container">
        <img :src="loginIllustration" alt="Login illustration" class="illustration">
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <h1>Connexion</h1>
        
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <i class="bi bi-envelope input-icon"></i>
            <input 
              type="email" 
              id="email"
              v-model="email"
              required
              placeholder="Votre email"
              :disabled="loading"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="input-group">
            <i class="bi bi-lock input-icon"></i>
            <input 
              type="password" 
              id="password"
              v-model="password"
              required
              placeholder="Votre mot de passe"
              :disabled="loading"
            >
          </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" :disabled="loading">
          <i class="bi bi-box-arrow-in-right me-2"></i>
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
  padding: 1rem;
}

.login-content {
  display: flex;
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  overflow: hidden;
}

.illustration-container {
  flex: 1;
  background-color: var(--primary-light);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration {
  max-width: 100%;
  height: auto;
}

.login-form {
  flex: 1;
  padding: 3rem 2rem;
  min-width: 320px;
}

h1 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.2rem;
  pointer-events: none;
  margin-top: -4px;
}

input {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: border-color 0.3s;
  background-color: var(--surface);
  color: var(--text-primary);
}

input:focus {
  border-color: var(--primary);
  outline: none;
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: var(--error);
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .illustration-container {
    display: none;
  }
  
  .login-content {
    max-width: 400px;
  }
}
</style>