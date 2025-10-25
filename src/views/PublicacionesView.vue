<script setup lang="ts">
import { axiosCustom } from '@/config/axiosCustom'
import { onMounted, ref } from 'vue'

type TypePublicacion = {
  id: number
  titulo: string
  contenido: string
  autor: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

const isLoading = ref(false)
const publicaciones = ref<TypePublicacion[]>([])

async function getPublicaciones() {
  isLoading.value = true
  publicaciones.value = (await axiosCustom.get('publicaciones').catch(() => ({ data: [] }))).data
  isLoading.value = false
}

const socialLinks = [
  { icon: 'mdi mdi-facebook', url: 'https://facebook.com' },
  { icon: 'mdi mdi-twitter', url: 'https://twitter.com' },
  { icon: 'mdi mdi-instagram', url: 'https://instagram.com' },
]
onMounted(() => {
  getPublicaciones().then()
})
</script>

<template>
  <div class="h-screen p-2">
    <div class="flex justify-between">
      <Button class="invisible">Administrar</Button>
      <h2 class="text-center text-5xl">Publicaciones 1.1</h2>
      <Button @click="$router.push('login')">Administrar</Button>
    </div>

    <main class="content-publicaciones m-7">
      <Card v-for="publicacion in publicaciones" :key="publicacion.id" class="shadow-lg rounded-xl">
        <template #title>
          {{ publicacion.titulo }}
        </template>
        <template #content>
          <p class="text-gray-600">
            {{ publicacion.contenido }}
          </p>
        </template>
        <template #footer>
          <small class="text-slate-400">Autor: {{ publicacion.autor }}</small>
        </template>
      </Card>
    </main>

    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p class="text-sm">
          &copy; {{ new Date().getFullYear() }} Mi Sitio. Todos los derechos reservados.
        </p>

        <div class="flex space-x-4">
          <a
            v-for="social in socialLinks"
            :key="social.icon"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg hover:text-blue-400"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.content-publicaciones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.5rem;
}
</style>
