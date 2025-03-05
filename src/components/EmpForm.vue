<script setup>
import { capitalize } from "lodash"
import dayjs from "dayjs"
import { ref, watch } from "vue"
import { VDateInput } from "vuetify/labs/VDateInput"

import { ruleFio, rulePassNo, rulePassSer, ruleRequired } from "@/utils/rules.js"

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

const emit = defineEmits(["empAdded", "empChanged", "empDeleted", "duplicateForm", "closeForm"])

const formRef = ref(null)
const isChange = ref(false)
const isValid = ref(false)
const isShow = ref(false)
const dialogDelete = ref(false)
const dialogClose = ref(false)
const actionDialog = ref("")

const fio = ref("")
const pass_ser = ref("")
const pass_no = ref("")
const pass_dt = ref(null)

const rulesFio = [ruleRequired, ruleFio]
const rulesPassSer = [ruleRequired, rulePassSer]
const rulesPassNo = [ruleRequired, rulePassNo]
const rulesPassDt = [ruleRequired]

//
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
				<v-form
					ref="formRef"
					v-model="isValid"
					validateOn="submit lazy"
					@submit.prevent="submit(isNew ? 'empAdded' : 'empChanged')"
				>
					<v-text-field
						v-model.trim="fio"
						label="ФИО"
						:rules="rulesFio"
						outlined
						dense
						@input="change"
					/>
					<v-text-field
						v-model.trim="pass_ser"
						label="Номер паспорта"
						:rules="rulesPassSer"
						maxlength="4"
						outlined
						dense
						@input="(event) => handlePassInput(event, 'ser')"
					/>
					<v-text-field
						v-model.trim="pass_no"
						label="Серия паспорта"
						:rules="rulesPassNo"
						maxlength="6"
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
								<v-btn
									id="delete-btn-activator"
									color="error"
									outlined
									block
								>
									<v-icon left>
										mdi-delete
									</v-icon>
									Удалить
								</v-btn>
							</v-col>

							<v-dialog
								v-model="dialogDelete"
								maxWidth="400"

								activator="#delete-btn-activator"
							>
								<template #default="{ isActive }"> <!-- eslint-disable-line -->
									<v-card>
										<template #prepend>
											<v-icon
												color="error"
												icon="mdi-alert-circle"
											/>
										</template>

										<template #title>
											<span class="text-error">Подтверждение удаления</span>
										</template>

										<v-card-text>
											{{ `Вы действительно хотите удалить сотрудника ${currentEmp.fio}?` }}
										</v-card-text>

										<template #actions>
											<v-spacer />

											<v-btn @click="dialogDelete = false">
												Нет
											</v-btn>

											<v-btn color="error" @click="deleteEmp">
												Да
											</v-btn>
										</template>
									</v-card>
								</template>
							</v-dialog>

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
				</v-form>
			</v-card-text>
		</v-card>
	</v-fade-transition>
</template>
