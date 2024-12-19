<template>
  <v-card class="mx-auto" max-width="300">
    <v-list v-if="employees.length > 0">
      <v-list-item
        v-for="emp in employees"
        :key="`${emp.pass_ser}:${emp.pass_no}`"
        @click="handle(emp.pass_no, emp.pass_ser)"
      >
        <v-list-item-title>{{ formatFio(emp.fio) }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <p v-else>Здесь пока нет сотрудников</p>
  </v-card>
</template>

<script>
export default {
  inject: ["employees"],

  emits: {
    "emp-selected"(pass_no, pass_ser) {
      if (pass_no && pass_ser) {
        return true
      }
      console.warn("Не передан pass_no или  pass_ser")
      return false
    },
  },

  methods: {
    handle(pass_no, pass_ser) {
      this.$emit("emp-selected", pass_no, pass_ser)
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
