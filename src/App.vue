<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row
          ><app-button @action="setNewEmp"
            >Добавить нового сотрудника</app-button
          ></v-row
        >
        <v-row>
          <v-col cols="3"
            ><emp-list @choose-emp="setCurrentEmp"></emp-list
          ></v-col>
          <v-col cols="3"
            ><emp-form
              :current-emp="currentEmp"
              :is-new="isNew"
              @change="changeEmp"
              @add="addEmp"
              @delete="deleteEmp"
            ></emp-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppButton from "./components/AppButton.vue"
import EmpList from "./components/EmpList.vue"
import EmpForm from "./components/EmpForm.vue"
import { useStorage } from "@vueuse/core"

export default {
  name: "App",

  components: {
    AppButton,
    EmpList,
    EmpForm,
  },

  data() {
    return {
      currentEmp: null,
      isNew: false,
    }
  },

  setup() {
    const employees = useStorage("empStore", [
      {
        fio: "Лапшова Мария Александровна",
        pass_ser: 1234,
        pass_no: 123456,
        pass_dt: "2020-12-25",
      },
      {
        fio: "Водянова Кера Владимировна",
        pass_ser: 2234,
        pass_no: 567834,
        pass_dt: "2003-10-22",
      },
      {
        fio: "Грекова Татьяна Михайловна",
        pass_ser: 3234,
        pass_no: 928331,
        pass_dt: "2012-11-12",
      },
    ])

    return {
      employees,
    }
  },

  methods: {
    setCurrentEmp(pass_no) {
      this.currentEmp = this.employees.find((emp) => emp.pass_no === pass_no)
      this.isNew = false
    },
    setNewEmp() {
      this.currentEmp = {
        fio: "",
        pass_ser: "",
        pass_no: "",
        pass_dt: "",
      }
      this.isNew = true
    },
    changeEmp(emp) {
      const idx = this.employees.findIndex(
        (emp) => emp.pass_no === this.currentEmp.pass_no
      )
      this.employees[idx] = { ...this.employees[idx], ...emp }

      // this.currentEmp = null
    },
    addEmp(emp) {
      this.employees.push(emp)

      // this.currentEmp = null
      this.isNew = false
    },
    deleteEmp() {
      const idx = this.employees.findIndex(
        (emp) => emp.pass_no === this.currentEmp.pass_no
      )
      this.employees.splice(idx, 1)

      this.currentEmp = null
    },
  },

  computed: {},

  provide() {
    return {
      employees: this.employees,
    }
  },
}
</script>
