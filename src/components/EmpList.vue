<template>
  <v-card class="mx-auto" max-width="300">
    <!-- <v-list :items="employees" item-title="fio" :item-value="pass_no"></v-list> -->
    <v-list
      v-for="emp in employees"
      :key="emp.pass_no"
      @click="handle(emp.pass_no)"
    >
      {{ emp.fio }}
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
