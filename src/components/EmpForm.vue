<script>
export default {
	name: "EmpForm",
}
</script>

<script setup>
import { capitalize } from "lodash"
import dayjs from "dayjs"
import { reactive, ref, watch } from "vue"
import FormEmp from "@/components/FormEmp.vue"
import FormEmpHead from "./FormEmpHead.vue"
import DialogConfirmDataLost from "./DialogConfirmDataLost.vue"
import FormEmpActions from "./FormEmpActions.vue"

const props = defineProps({
	currentEmp: {
		type: Object,
		default: null,
	},
	isNew: {
		type: Boolean,
		required: true,
	},
})
const emit = defineEmits([
	"empAdded",
	"empChanged",
	"empDeleted",
	"duplicateForm",
	"closeForm",
])

const isChange = ref(false)
const isShow = ref(false)
const dialogDelete = ref(false)
const dialogClose = ref(false)
const actionDialog = ref("")

const formData = reactive({
	fio: "",
	pass_ser: "",
	pass_no: "",
	pass_dt: null,
})

function formatFio(fio) {
	return fio
		.split(" ")
		.map((word) => capitalize(word))
		.join(" ")
}

function deleteEmp() {
	emit("empDeleted")
	isChange.value = false
	dialogDelete.value = false
}

function confirmAction() {
	emit(actionDialog.value)
	actionDialog.value = ""
	dialogClose.value = false
	isChange.value = false
}

function duplicateForm() {
	if (isChange.value) {
		dialogClose.value = true
		actionDialog.value = "duplicateForm"
	}
	else {
		emit("duplicateForm")
	}
}

function closeForm() {
	if (isChange.value) {
		dialogClose.value = true
		actionDialog.value = "closeForm"
	}
	else {
		emit("closeForm")
	}
}

async function submit(ev) {
	try {
		const { valid } = await ev
		if (valid) {
			emit(props.isNew ? "empAdded" : "empChanged", {
				fio: formatFio(formData.fio),
				pass_ser: formData.pass_ser,
				pass_no: formData.pass_no,
				pass_dt: dayjs(formData.pass_dt).format("YYYY-MM-DD"),
			})
			isChange.value = false
		}
	}
	catch (err) {
		console.error("Ошибка валидации:", err)
	}
}

watch(
	() => props.currentEmp,
	(emp) => {
		if (emp) {
			isShow.value = true

			formData.fio = emp.fio
			formData.pass_ser = emp.pass_ser
			formData.pass_no = emp.pass_no
			formData.pass_dt = emp.pass_dt ? new Date(emp.pass_dt) : null
		}
		else {
			isShow.value = false
		}
	},
	{ immediate: false },
)
</script>

<template>
	<v-fade-transition>
		<v-card
			v-if="isShow"
			class="mx-auto"
			maxWidth="400"
			style="position: relative;"
		>
			<FormEmpHead
				:isNew="isNew"
				@duplicateForm="duplicateForm"
				@closeForm="closeForm"
			/>
			<DialogConfirmDataLost
				v-model="dialogClose"
				@cancel="dialogClose = false"
				@confirm="confirmAction"
			/>
			<v-card-title class="text-center" style="padding-top: 50px; padding-bottom: 20px;">
				{{ isNew ? 'Новый сотрудник' : 'Редактирование сотрудника' }}
			</v-card-title>

			<v-card-text>
				<FormEmp
					v-model:fio="formData.fio"
					v-model:pass_ser="formData.pass_ser"
					v-model:pass_no="formData.pass_no"
					v-model:pass_dt="formData.pass_dt"
					@change="isChange = true"
					@submit.prevent="submit"
				>
					<FormEmpActions
						:isNew="isNew"
						:isChange="isChange"
						:currentEmp="currentEmp"
						@submit="deleteEmp"
					/>
				</FormEmp>
			</v-card-text>
		</v-card>
	</v-fade-transition>
</template>
