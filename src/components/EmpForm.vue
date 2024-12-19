<template>
  <v-sheet class="mx-auto" max-width="300" v-if="isShow">
    <v-form
      validate-on="submit lazy"
      ref="form"
      @submit.prevent="submit(isNew ? 'emp-added' : 'emp-changed')"
      v-model="isValid"
    >
      <v-text-field
        v-model="fio"
        label="ФИО"
        :rules="fioRules"
        @change="change"
      ></v-text-field>
      <v-text-field
        v-model="pass_ser"
        label="Номер паспорта"
        :rules="pasSerRules"
        @change="change"
      ></v-text-field>
      <v-text-field
        v-model="pass_no"
        label="Серия паспорта"
        :rules="pasNoRules"
        @change="change"
      ></v-text-field>
      <v-text-field
        v-model="pass_dt"
        label="Дата выдачи: YYYY-MM-DD"
        :rules="pasDtRules"
        @change="change"
      ></v-text-field>

      <div v-if="!isNew">
        <app-button @action="deleteEmp">Удалить</app-button>
        <app-button v-if="isChange" type="submit">Изменить</app-button>
      </div>
      <app-button v-else type="submit">Добавить</app-button>
    </v-form>
  </v-sheet>
</template>

<script>
import dayjs from "dayjs"
import AppButton from "./AppButton.vue"
import { capitalize } from "lodash"

export default {
  components: {
    AppButton,
  },

  props: {
    currentEmp: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    isChange: false,
    isValid: false,
    isShow: false,

    fio: "",
    pass_ser: "",
    pass_no: "",
    pass_dt: "",

    fioRules: [
      (value) => {
        if (value) return true

        return "Требуется ФИО."
      },
    ],
    pasSerRules: [
      (value) => {
        if (value) return true

        return "Требуется серия паспорта."
      },
      (value) => {
        if (/^[0-9]{4}$/.test(value)) return true

        return "Серия паспорта должна состоять из 4 цифр."
      },
    ],
    pasNoRules: [
      (value) => {
        if (value) return true

        return "Требуется номер паспорта."
      },
      (value) => {
        if (/^[0-9]{6}$/.test(value)) return true

        return "Номер паспорта должен состоять из 6 цифр."
      },
    ],
    pasDtRules: [
      (value) => {
        if (value) return true

        return "Требуется дата выдачи паспорта."
      },
      (value) => {
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return true

        return "Неправильная дата выдачи паспорта."
      },
    ],
  }),

  methods: {
    change() {
      this.isChange = true
    },
    formatFio(fio) {
      return fio
        .split(" ")
        .map((word) => capitalize(word))
        .join(" ")
    },
    deleteEmp() {
      this.$emit("emp-deleted")
      this.isChange = false
    },
    async submit(type) {
      try {
        const isValid = await this.$refs.form.validate()

        if (isValid) {
          const editCurrentEmp = {
            fio: this.formatFio(this.fio),
            pass_ser: this.pass_ser,
            pass_no: this.pass_no,
            pass_dt: dayjs(this.pass_dt).format("YYYY-MM-DD"),
          }

          this.$emit(type, editCurrentEmp)
          this.isChange = false
        }
      } catch (error) {
        console.error("Ошибка валидации:", error)
      }
    },
  },

  watch: {
    currentEmp: {
      immediate: false,
      handler(emp) {
        if (emp) {
          this.isShow = true

          this.fio = emp.fio
          this.pass_ser = emp.pass_ser
          this.pass_no = emp.pass_no
          this.pass_dt = emp.pass_dt
        } else {
          this.isShow = false
        }
      },
    },
  },
}
</script>
