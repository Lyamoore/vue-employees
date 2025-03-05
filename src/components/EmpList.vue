<script setup>
import { formatFio } from "@/utils/format.js"

defineProps({
	employees: {
		type: Array,
		required: true,
	},
})
const emit = defineEmits(["empSelected"])

function handle(pass_no, pass_ser) {
	emit("empSelected", pass_no, pass_ser)
}
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

		<v-alert v-else type="warning">
			Здесь пока нет сотрудников. Нажмите "Добавить нового сотрудника", чтобы начать.
		</v-alert>
	</v-card>
</template>
