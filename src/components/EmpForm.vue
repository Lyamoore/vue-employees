<script setup>
import { ref, watch } from "vue"
import { capitalize } from "lodash"
import dayjs from "dayjs"

const props = defineProps({
	currentEmp: {
		type: Object,
		required: true,
	},
	isNew: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(["emp-added", "emp-changed", "emp-deleted"])

const formRef = ref(null)
const isChange = ref(false)
const isValid = ref(false)
const isShow = ref(false)

const fio = ref("")
const pass_ser = ref("")
const pass_no = ref("")
const pass_dt = ref("")

const fioRules = [(value) => !!value || "Требуется ФИО."]
const pasSerRules = [
	(value) => !!value || "Требуется серия паспорта.",
	(value) =>
		/^\d{4}$/.test(value) || "Серия паспорта должна состоять из 4 цифр.",
]
const pasNoRules = [
	(value) => !!value || "Требуется номер паспорта.",
	(value) =>
		/^\d{6}$/.test(value) || "Номер паспорта должен состоять из 6 цифр.",
]
const pasDtRules = [
	(value) => !!value || "Требуется дата выдачи паспорта.",
	(value) =>
		/^\d{4}-\d{2}-\d{2}$/.test(value) ||
		"Неправильная дата выдачи паспорта.",
]

function change() {
	isChange.value = true
}

function formatFio(fio) {
	return fio
		.split(" ")
		.map((word) => capitalize(word))
		.join(" ")
}

function deleteEmp() {
	emit("emp-deleted")
	isChange.value = false
}

async function submit(type) {
	try {
		const formIsValid = await formRef.value.validate()

		if (formIsValid.valid) {
			const editCurrentEmp = {
				fio: formatFio(fio.value),
				pass_ser: pass_ser.value,
				pass_no: pass_no.value,
				pass_dt: dayjs(pass_dt.value).format("YYYY-MM-DD"),
			}

			emit(type, editCurrentEmp)
			isChange.value = false
		}
	}
	catch (error) {
		console.error("Ошибка валидации:", error)
	}
}

watch(
	() => props.currentEmp,
	(emp) => {
		if (emp) {
			isShow.value = true

			fio.value = emp.fio
			pass_ser.value = emp.pass_ser
			pass_no.value = emp.pass_no
			pass_dt.value = emp.pass_dt
		}
		else {
			isShow.value = false
		}
	},
	{ immediate: false },
)
</script>

<template>
	<v-sheet
		v-if="isShow"
		class="mx-auto"
		maxWidth="300"
	>
		<v-form
			ref="formRef"
			v-model="isValid"
			validateOn="submit lazy"
			@submit.prevent="submit(isNew ? 'emp-added' : 'emp-changed')"
		>
			<v-text-field
				v-model.trim="fio"
				label="ФИО"
				:rules="fioRules"
				@change="change"
			/>
			<v-text-field
				v-model.trim="pass_ser"
				label="Номер паспорта"
				:rules="pasSerRules"
				@change="change"
			/>
			<v-text-field
				v-model.trim="pass_no"
				label="Серия паспорта"
				:rules="pasNoRules"
				@change="change"
			/>
			<v-text-field
				v-model.trim="pass_dt"
				label="Дата выдачи: YYYY-MM-DD"
				:rules="pasDtRules"
				@change="change"
			/>

			<div v-if="!isNew">
				<v-btn @click="deleteEmp">
					Удалить
				</v-btn>
				<v-btn v-if="isChange" type="submit">
					Изменить
				</v-btn>
			</div>
			<v-btn v-else type="submit">
				Добавить
			</v-btn>
		</v-form>
	</v-sheet>
</template>
