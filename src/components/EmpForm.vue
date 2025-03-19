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

//
const fio = ref("")
const pass_ser = ref("")
const pass_no = ref("")
const pass_dt = ref(null)

//todo
const values = reactive({
	fio: "",
	pass_ser: "",
	pass_no: "",
	pass_dt: null,
})

//
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
				fio: formatFio(fio.value),
				pass_ser: pass_ser.value,
				pass_no: pass_no.value,
				pass_dt: dayjs(pass_dt.value).format("YYYY-MM-DD"),
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

			fio.value = emp.fio
			pass_ser.value = emp.pass_ser
			pass_no.value = emp.pass_no
			pass_dt.value = emp.pass_dt ? new Date(emp.pass_dt) : null
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
					v-model:fio="fio"
					v-model:pass_ser="pass_ser"
					v-model:pass_no="pass_no"
					v-model:pass_dt="pass_dt"
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
