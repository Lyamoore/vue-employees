<script setup>
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

function formatFio(fio) {
	const [lastName, firstName, middleName] = fio.split(" ")

	return `${lastName} ${firstName?.charAt(0)}. ${middleName?.charAt(0)}.`
}
</script>

<template>
	<v-card class="mx-auto" maxWidth="300">
		<v-list v-if="employees.length > 0">
			<v-list-item
				v-for="emp in employees"
				:key="`${emp.pass_ser}:${emp.pass_no}`"
				@click="handle(emp.pass_no, emp.pass_ser)"
			>
				<v-list-item-title>{{ formatFio(emp.fio) }}</v-list-item-title>
			</v-list-item>
		</v-list>
		<p v-else>
			Здесь пока нет сотрудников
		</p>
	</v-card>
</template>
