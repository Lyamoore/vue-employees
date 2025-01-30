<script setup>
import { computed } from "vue"

const { employees } = defineProps({
	employees: {
		type: Array,
		required: true,
	},
})

const emit = defineEmits(["emp-selected"])

function handle(pass_no, pass_ser) {
	emit("emp-selected", pass_no, pass_ser)
}

const formatFio = computed(() => (fio) => {
	const [lastName, firstName, middleName] = fio.split(" ")

	const formattedFirstName = firstName ? `${firstName.charAt(0)}.` : ""
	const formattedMiddleName = middleName ? `${middleName.charAt(0)}.` : ""

	return `${lastName} ${formattedFirstName} ${formattedMiddleName}`.trim()
})
</script>

<template>
	<v-card>
		<v-list v-if="employees.length > 0">
			<v-list-item
				v-for="emp in employees"
				:key="`${emp.pass_ser}:${emp.pass_no}`"
				@click="handle(emp.pass_no, emp.pass_ser)"
			>
				<v-list-item-title>{{ formatFio(emp.fio) }}</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-alert v-else type="info">
			Здесь пока нет сотрудников. Нажмите "Добавить нового сотрудника", чтобы начать.
		</v-alert>
	</v-card>
</template>
