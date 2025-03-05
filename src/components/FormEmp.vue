<script>
export default {
	name: "FormEmp",
}
</script>

<script setup>
import { ref } from "vue"
import { VDateInput } from "vuetify/labs/VDateInput"
import { ruleFio, rulePassNo, rulePassSer, ruleRequired } from "@/utils/rules.js"

const emit = defineEmits(["change"])

// data
const fio = defineModel("fio")
const pass_ser = defineModel("pass_ser")
const pass_no = defineModel("pass_no")
const pass_dt = defineModel("pass_dt")

//
const rulesFio = [ruleRequired, ruleFio]
const rulesPassSer = [ruleRequired, rulePassSer]
const rulesPassNo = [ruleRequired, rulePassNo]
const rulesPassDt = [ruleRequired]

const refForm = ref(null)

function handlePassInput(event, type) {
	const value = event.target.value.replace(/\D/g, "")
	if (type === "ser") {
		pass_ser.value = value.slice(0, 4)
	}
	else if (type === "no") {
		pass_no.value = value.slice(0, 6)
	}
	change()
}
const change = () => emit("change")
</script>

<template>
	<v-form
		ref="refForm"
		validateOn="submit lazy"
	>
		<v-text-field
			v-model="fio"
			label="ФИО"
			:rules="rulesFio"
			outlined
			dense
			@input="change"
		/>
		<v-text-field
			v-model.number="pass_ser"
			label="Номер паспорта"
			:rules="rulesPassSer"
			outlined
			dense
			@input="(event) => handlePassInput(event, 'ser')"
		/>
		<v-text-field
			v-model.number="pass_no"
			label="Серия паспорта"
			:rules="rulesPassNo"
			outlined
			dense
			@input="(event) => handlePassInput(event, 'no')"
		/>
		<VDateInput
			v-model="pass_dt"
			label="Дата выдачи"
			:rules="rulesPassDt"
			prependIcon=""
			prependInnerIcon="$calendar"
			@update:modelValue="change"
		/>

		<slot />
	</v-form>
</template>

<style scoped>
</style>
