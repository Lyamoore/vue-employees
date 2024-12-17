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

  emits: {
    "emp-selected"(pass_no) {
      if (pass_no) {
        return true
      }
      console.warn("Не передан pass_no")
      return false
    },
  },

  data() {
    return {}
  },

  methods: {
    handle(pass_no) {
      this.$emit("emp-selected", pass_no)
    },
    formatFio(fio) {
      const [lastName, firstName, middleName] = fio.split(" ")

      return `${lastName} ${firstName?.charAt(0)}. ${middleName?.charAt(
        0
      )}.`.trim()
    },
  },
}
</script>
