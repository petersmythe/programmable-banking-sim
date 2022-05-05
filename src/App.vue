<template>
  <nav class="pt-4">
    <div class="flex justify-between px-4">
    <div class="flex">
      <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:text-3xl sm:truncate">Investec Open API</h2>
    </div>
    <div class="flex">
      <router-link to="/"><button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">Home</button></router-link>
      <router-link to="/about"><button type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">About</button></router-link>
    </div>
  </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
