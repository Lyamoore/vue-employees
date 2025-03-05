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
import DialogTrashEmp from "@/components/DialogTrashEmp.vue"

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
			<!-- todo extract to FormEmpHead -->
			<v-btn
				v-if="!isNew"
				icon
				size="small"
				style="position: absolute; top: 8px; right: 40px; z-index: 1;"
				variant="text"
				@click="duplicateForm"
			>
				<v-icon>mdi-content-copy</v-icon>
			</v-btn>

			<v-btn
				id="save-btn-activator"
				icon
				size="small"
				style="position: absolute; top: 8px; right: 8px; z-index: 1;"
				variant="text"
				@click="closeForm"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<!-- todo ^^^ -->

			<!-- todo extract to DialogConfirmDataLost -->
			<v-dialog
				v-model="dialogClose"
				maxWidth="400"
			>
				<v-card>
					<template #prepend>
						<v-icon
							color="warning"
							icon="mdi-alert"
						/>
					</template>

					<template #title>
						<span class="text-warning">Несохраненные изменения</span>
					</template>

					<v-card-text>
						У вас есть несохраненные изменения. Вы уверены, что хотите продолжить?
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn @click="dialogClose = false">
							Отмена
						</v-btn>
						<v-btn
							color="primary"
							@click="confirmAction"
						>
							Продолжить
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

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
					<!-- todo extract to FormEmpActions -->
					<v-row class="mt-4">
						<v-col v-if="isNew" cols="12">
							<v-btn
								:disabled="!isChange"
								type="submit"
								color="primary"
								block
							>
								<v-icon left>
									mdi-plus
								</v-icon>
								Добавить
							</v-btn>
						</v-col>

						<template v-else>
							<v-col cols="6">
								<DialogTrashEmp
									:emp="currentEmp"
									@submit="deleteEmp"
								>
									<template #activator="{ props }">
										<v-btn
											block
											outlined
											color="error"
											v-bind="props"
										>
											<v-icon left>
												mdi-delete
											</v-icon>
											Удалить
										</v-btn>
									</template>
								</DialogTrashEmp>
							</v-col>

							<v-col cols="6" class="text-right">
								<v-btn
									:disabled="!isChange"
									type="submit"
									color="primary"
									outlined
									block
								>
									<v-icon left>
										mdi-pencil
									</v-icon>
									Изменить
								</v-btn>
							</v-col>
						</template>
					</v-row>
				</FormEmp>
			</v-card-text>
		</v-card>
	</v-fade-transition>
</template>
