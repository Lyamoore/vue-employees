<template>
  <v-card class="mx-auto" max-width="300">
    <v-list>
      <v-list-item
        v-for="emp in employees"
        :key="emp.pass_no"
        @click="handle(emp.pass_no)"
      >
        <v-list-item-title>{{ formatFio(emp.fio) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  inject: ["employees"],

  data() {
    return {}
  },

  methods: {
    handle(pass_no) {
      this.$emit("choose-emp", pass_no)
    },
    formatFio(fio) {
      const parts = fio.split(" ")
      const lastName = parts[0] || ""
      const firstName = parts[1] || ""
      const middleName = parts[2] || ""

      let formattedFio = lastName

      if (firstName) {
        formattedFio += ` ${firstName.charAt(0)}.`
      }

      if (middleName) {
        formattedFio += ` ${middleName.charAt(0)}.`
      }

      return formattedFio.trim()
    },
  },

  emits: {
    "choose-emp"(pass_no) {
      if (pass_no) {
        return true
      }
      console.warn("Не передан pass_no")
      return false
    },
  },
}
</script>
