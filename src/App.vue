<script setup>
import { ref } from "vue"
import { useStorage } from "@vueuse/core"
import EmpList from "./components/EmpList.vue"
import EmpForm from "./components/EmpForm.vue"

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

function changeEmp(emp) {
	const idx = employees.value.findIndex(
		(emp) =>
			emp.pass_no === currentEmp.value.pass_no &&
			emp.pass_ser === currentEmp.value.pass_ser,
	)
	employees.value[idx] = { ...employees.value[idx], ...emp }
}

function addEmp(emp) {
	employees.value.push(emp)

	isNew.value = false
}

function deleteEmp() {
	const idx = employees.value.findIndex(
		(emp) =>
			emp.pass_no === currentEmp.value.pass_no &&
			emp.pass_ser === currentEmp.value.pass_ser,
	)
	employees.value.splice(idx, 1)

	currentEmp.value = null
}
</script>

<template>
	<v-app>
		<v-main>
			<v-container>
				<v-row>
					<v-col cols="3">
						<v-btn @click="setNewEmp">
							Добавить нового сотрудника
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="3">
						<EmpList
							:employees="employees"
							@empSelected="setCurrentEmp"
						/>
					</v-col>
					<v-col cols="3">
						<EmpForm
							:currentEmp="currentEmp"
							:isNew="isNew"
							@empChanged="changeEmp"
							@empAdded="addEmp"
							@empDeleted="deleteEmp"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
