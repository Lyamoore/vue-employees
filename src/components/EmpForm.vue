<template>
  <v-sheet class="mx-auto" max-width="300">
    <v-form validate-on="submit lazy" ref="form">
      <v-text-field v-model="fio" label="ФИО" @change="change"></v-text-field>
      <v-text-field
        v-model="pass_ser"
        label="Номер паспорта"
        @change="change"
      ></v-text-field>
      <v-text-field
        v-model="pass_no"
        label="Серия паспорта"
        @change="change"
      ></v-text-field>
      <v-text-field
        v-model="pass_dt"
        label="YYYY-MM-DD"
        @change="change"
      ></v-text-field>

      <div v-if="!isNew">
        <app-button>Удалить</app-button>
        <app-button v-if="isChange" @action="submit('change')"
          >Изменить</app-button
        >
      </div>
      <app-button v-else @action="submit('add')">Добавить</app-button>
    </v-form>
  </v-sheet>
</template>

<script>
import AppButton from "./AppButton.vue";

export default {
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
    isValid: true,

    fio: "",
    pass_ser: "",
    pass_no: "",
    pass_dt: "",

    // fioRules: [
    //   (v) => !!v || "Поле обязательно для заполнения",
    //   (v) => /^[a-zA-Zа-яА-Яs]+$/.test(v) || "Только буквенные символы",
    //   (v) => v.length >= 3 || "Минимум 3 символа",
    // ],
    // passSerRules: [
    //   (v) => !!v || "Поле обязательно для заполнения",
    //   (v) => /^d+$/.test(v) || "Только цифры",
    //   (v) => v.length === 4 || "Ровно 4 цифры",
    // ],
    // passNoRules: [
    //   (v) => !!v || "Поле обязательно для заполнения",
    //   (v) => /^d+$/.test(v) || "Только цифры",
    //   (v) => v.length === 6 || "Ровно 6 цифр",
    // ],
    // passDtRules: [
    //   (v) => !!v || "Поле обязательно для заполнения",
    //   (v) =>
    //     dayjs(v, "YYYY-MM-DD", true).isValid() ||
    //     "Дата должна быть в формате YYYY-MM-DD",
    // ],
  }),

  methods: {
    change() {
      this.isChange = true;
    },
    submit(type) {
      console.log(type);
    },
  },

  watch: {
    currentEmp: {
      immediate: false,
      handler(emp) {
        if (emp) {
          this.isChange = false;
          this.fio = emp.fio;
          this.pass_ser = emp.pass_ser;
          this.pass_no = emp.pass_no;
          this.pass_dt = emp.pass_dt;
        } else {
          this.fio = "";
          this.pass_ser = "";
          this.pass_no = "";
          this.pass_dt = "";
        }
      },
    },
  },

  components: {
    AppButton,
  },
};
</script>
<style></style>
