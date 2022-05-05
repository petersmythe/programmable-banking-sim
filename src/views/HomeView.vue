<template>
  <div class="container mx-auto px-4">
    <form class="divide-y divide-gray-200">
    <div class="divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-2">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Custom test parameters</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Parameters to configure the test servers details.</p>
        </div>
        <div class="space-y-1">
          <SwitchGroup as="div" class="flex items-center justify-between">
            <span class="flex-grow flex flex-col">
              <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>Authentication</SwitchLabel>
              <SwitchDescription as="span" class="text-sm text-gray-500">Turn on OAUTH2 Authentication.</SwitchDescription>
            </span>
            <Switch v-model="form.auth" :class="[form.auth ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
              <span aria-hidden="true" :class="[form.auth ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
             </Switch>
          </SwitchGroup>
          <div class="grid grid-cols-4 gap-4 items-start border-t border-gray-200 p-1">
            <label for="client_id" class="block text-sm font-medium text-gray-700 mt-px pt-2"> Client ID </label>
            <div class="mt-1 col-span-3">
              <input type="text" v-model="form.client_id" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 items-start border-t border-gray-200 p-1">
            <label for="client_secret" class="block text-sm font-medium text-gray-700 mt-px pt-2"> Client Secret </label>
            <div class="mt-1 col-span-3">
              <input type="text" v-model="form.client_secret" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 items-start border-t border-gray-200 p-1">
            <label for="port" class="block text-sm font-medium text-gray-700 mt-px pt-2"> Port </label>
            <div class="mt-1 col-span-2">
              <input v-model="form.port" type="text" class="block w-24 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 items-start border-t border-gray-200 p-1">
            <label for="token_expiry" class="block text-sm font-medium text-gray-700 mt-px pt-2"> Token Expiry </label>
            <div class="mt-1 col-span-2">
              <input type="text" v-model="form.token_expiry" class="block w-24 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md mb-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="status !== ''" class="rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ status }}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600">
              <span class="sr-only">Dismiss</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-2">
      <div class="flex justify-end">
        <button type="button" v-on:click="submitForm" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reload</button>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import {ipcRenderer} from "electron"
import Store from 'electron-store'

export default {
  name: 'HomeView',
  components: {
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
  },
  data() {
    return {
      form: {
        auth: false,
        client_id: "testing",
        client_secret: "testing",
        port: "3000",
        token_expiry: 1800,
      },
      status: '',
    }
  },
  setup() {
    const enabled = ref(false)
    
    return {
      enabled,
    }
  },
  methods: {
    submitForm(){
        // this will send the data to the main process
        console.log(this.$data.form)
        ipcRenderer.send("form-submission-event", JSON.parse(JSON.stringify(this.$data.form)))
        const store = new Store()
        store.set({
          auth: this.$data.form.auth,
          port: this.$data.form.port,
          client_id: this.$data.form.client_id,
          client_secret: this.$data.form.client_secret,
          token_expiry: this.$data.form.token_expiry,
        })
    },
    fetchFromStore(){
      const store = new Store()
      this.$data.form.auth = store.get('auth')
      this.$data.form.client_id = store.get('client_id')
      this.$data.form.client_secret = store.get('client_secret')
      this.$data.form.port = store.get('port')
      this.$data.form.token_expiry = store.get('token_expiry')
    },
  },
  mounted() {
    ipcRenderer.on('status-update', (event, arg) => {
      this.$data.status = arg
    })
    this.fetchFromStore()
  },
}
</script>
