<script setup>
import { ref } from "vue"
import { useStorage } from "@vueuse/core"
import EmpList from "./components/EmpList.vue"
import EmpForm from "./components/EmpForm.vue"

const employees = useStorage("empStore", [])
const currentEmp = ref(null)
const isNew = ref(false)

function setCurrentEmp(pass_no, pass_ser) {
	currentEmp.value = employees.value.find(
		(emp) => emp.pass_no === pass_no && emp.pass_ser === pass_ser,
	)
	isNew.value = false
}

function setNewEmp() {
	currentEmp.value = {
		fio: "",
		pass_ser: "",
		pass_no: "",
		pass_dt: "",
	}
	isNew.value = true
}

function findEmployeeIndex(pass_no, pass_ser) {
	return employees.value.findIndex(
		(emp) => emp.pass_no === pass_no && emp.pass_ser === pass_ser,
	)
}

function changeEmp(emp) {
	const idx = findEmployeeIndex(currentEmp.value.pass_no, currentEmp.value.pass_ser)
	if (idx !== -1) {
		employees.value[idx] = { ...employees.value[idx], ...emp }
	}
}

function addEmp(emp) {
	employees.value.push(emp)

	isNew.value = false
	currentEmp.value = null
}

function deleteEmp() {
	const idx = findEmployeeIndex(currentEmp.value.pass_no, currentEmp.value.pass_ser)
	if (idx !== -1) {
		employees.value.splice(idx, 1)
		currentEmp.value = null
	}
}

function closeForm() {
	currentEmp.value = null
	isNew.value = false
}
</script>

<template>
	<v-app>
		<v-main>
			<v-container fluid>
				<v-row>
					<v-col
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-btn
							color="primary"
							block
							@click="setNewEmp"
						>
							Добавить нового сотрудника
						</v-btn>
					</v-col>
				</v-row>

				<v-row>
					<v-col
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<EmpList
							:employees="employees"
							@empSelected="setCurrentEmp"
						/>
					</v-col>

					<v-col
						cols="12"
						sm="6"
						md="5"
						lg="4"
					>
						<EmpForm
							:currentEmp="currentEmp"
							:isNew="isNew"
							@empChanged="changeEmp"
							@empAdded="addEmp"
							@empDeleted="deleteEmp"
							@closeForm="closeForm"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
